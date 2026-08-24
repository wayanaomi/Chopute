import { NextResponse } from "next/server";
import { getFirebaseAuth } from "@/lib/auth/firebase-auth";
import { prisma } from "@/lib/db/prisma";
import { searchSchema } from "@/lib/validation/schemas";
import {
  tryConsumeFreeSearch,
  refundFreeSearch,
} from "@/lib/search/entitlement";
import { buildActorInput } from "@/lib/apify/search-businesses";
import {
  startApifyRun,
  isApifyConfigured,
  ApifyRequestError,
} from "@/lib/apify/client";

export async function POST(request: Request) {
  const session = await getFirebaseAuth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const parsed = searchSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error:
          parsed.error.issues[0]?.message ||
          "Invalid input",
      },
      { status: 400 }
    );
  }

  const {
    businessType,
    location,
    idempotencyKey,
  } = parsed.data;

  // Duplicate-submission protection: if a search with this
  // idempotency key already exists, return it instead of creating
  // a second one or consuming another free search.
  const existing = await prisma.search.findUnique({
    where: { idempotencyKey },
  });

  if (existing) {
    return NextResponse.json({
      id: existing.id,
      status: existing.status,
    });
  }

  if (!isApifyConfigured()) {
    return NextResponse.json(
      {
        error:
          "Business search is not yet configured. An administrator must set APIFY_API_TOKEN.",
      },
      { status: 503 }
    );
  }

  const { allowed, consumed } =
    await tryConsumeFreeSearch(userId);

  if (!allowed) {
    return NextResponse.json(
      {
        error:
          "You've used your free searches. Upgrade for unlimited access.",
      },
      { status: 402 }
    );
  }

  const search = await prisma.search.create({
    data: {
      userId,
      businessType,
      location,
      idempotencyKey,
      status: "PENDING",
      consumedFreeSearch: consumed,
    },
  });

  try {
    const input = buildActorInput(
      businessType,
      location
    );

    const { runId, datasetId } =
      await startApifyRun(input);

    const updated = await prisma.search.update({
      where: { id: search.id },
      data: {
        status: "PROCESSING",
        apifyRunId: runId,
        apifyDatasetId: datasetId,
      },
    });

    return NextResponse.json(
      {
        id: updated.id,
        status: updated.status,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Search] Apify error:", error);
    
    await prisma.search.update({
      where: { id: search.id },
      data: {
        status: "FAILED",
        errorMessage:
          error instanceof ApifyRequestError ||
          error instanceof Error
            ? error.message
            : "Failed to start business search",
      },
    });

    if (consumed) {
      await refundFreeSearch(userId);
    }

    return NextResponse.json(
      {
        error:
          "Could not start the business search. Please try again.",
      },
      { status: 502 }
    );
  }
}