import { NextResponse } from "next/server";
import { getFirebaseAuth } from "@/lib/auth/firebase-auth";
import { prisma } from "@/lib/db/prisma";
import {
  getApifyDatasetItems,
  getApifyRunStatus,
  ApifyRequestError,
} from "@/lib/apify/client";
import { persistSearchResults } from "@/lib/search/persist-results";
import { refundFreeSearch } from "@/lib/search/entitlement";
import { leadFilterSchema } from "@/lib/validation/schemas";
import type { Prisma } from "@prisma/client";

/**
 * Finalizes a PROCESSING search by checking on its Apify run and, once the
 * run has completed, persisting results. This lazily "completes" the job
 * from whichever request happens to poll it — no separate worker process
 * is required, which keeps the architecture simple for a serverless
 * deployment while still keeping the initial search request fast.
 */
async function finalizeIfReady(search: {
  id: string;
  userId: string;
  status: string;
  apifyRunId: string | null;
  apifyDatasetId: string | null;
  consumedFreeSearch: boolean;
}) {
  if (
    search.status !== "PROCESSING" ||
    !search.apifyRunId ||
    !search.apifyDatasetId
  ) {
    return;
  }

  try {
    const runStatus = await getApifyRunStatus(search.apifyRunId);

    if (runStatus === "SUCCEEDED") {
      const items = await getApifyDatasetItems(search.apifyDatasetId);

      await persistSearchResults(
        search.id,
        search.userId,
        items
      );

      const resultCount = await prisma.lead.count({
        where: { searchId: search.id },
      });

      await prisma.search.update({
        where: { id: search.id },
        data: {
          status: "COMPLETED",
          resultCount,
        },
      });
    } else if (
      ["FAILED", "TIMED-OUT", "ABORTED"].includes(runStatus)
    ) {
      await prisma.search.update({
        where: { id: search.id },
        data: {
          status: "FAILED",
          errorMessage: `Business data provider run ${runStatus}`,
        },
      });

      if (search.consumedFreeSearch) {
        await refundFreeSearch(search.userId);
      }
    }
    // Still RUNNING/READY — leave as PROCESSING.
    // Client will poll again.
  } catch (error) {
    await prisma.search.update({
      where: { id: search.id },
      data: {
        status: "FAILED",
        errorMessage:
          error instanceof ApifyRequestError ||
          error instanceof Error
            ? error.message
            : "Failed to retrieve business search results",
      },
    });

    if (search.consumedFreeSearch) {
      await refundFreeSearch(search.userId);
    }
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getFirebaseAuth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  const search = await prisma.search.findUnique({
    where: { id },
  });

  if (!search || search.userId !== session.user.id) {
    return NextResponse.json(
      { error: "Search not found" },
      { status: 404 }
    );
  }

  await finalizeIfReady(search);

  const fresh = await prisma.search.findUnique({
    where: { id },
  });

  if (!fresh) {
    return NextResponse.json(
      { error: "Search not found" },
      { status: 404 }
    );
  }

  const { searchParams } = new URL(request.url);

  const filters = leadFilterSchema.safeParse({
    hasPhone:
      searchParams.get("hasPhone") ?? undefined,
    hasWebsite:
      searchParams.get("hasWebsite") ?? undefined,
    minRating:
      searchParams.get("minRating") ?? undefined,
    status:
      searchParams.get("status") ?? undefined,
  });

  let leads: Awaited<
    ReturnType<typeof prisma.lead.findMany>
  > = [];

  if (fresh.status === "COMPLETED") {
    const where: Prisma.LeadWhereInput = {
      searchId: fresh.id,
    };

    if (filters.success) {
      if (filters.data.hasPhone) {
        where.business = {
          phone: { not: null },
        };
      }

      if (filters.data.hasWebsite) {
        where.business = {
          ...(where.business as object),
          website: { not: null },
        };
      }

      if (filters.data.minRating !== undefined) {
        where.business = {
          ...(where.business as object),
          rating: {
            gte: filters.data.minRating,
          },
        };
      }

      if (
        filters.data.status &&
        filters.data.status !== "ALL"
      ) {
        where.status = filters.data.status;
      }
    }

    leads = await prisma.lead.findMany({
      where,
      include: {
        business: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  return NextResponse.json({
    search: {
      id: fresh.id,
      businessType: fresh.businessType,
      location: fresh.location,
      status: fresh.status,
      resultCount: fresh.resultCount,
      errorMessage: fresh.errorMessage,
      createdAt: fresh.createdAt,
    },
    leads,
  });
}