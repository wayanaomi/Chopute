import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

function getBearerToken(request: Request) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  return authorization.slice("Bearer ".length).trim();
}

function firstString(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return null;
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export async function POST(request: Request) {
  const expectedSecret = process.env.SELAR_AUTOMATION_SECRET;

  // Safe diagnostics — never prints the actual secret.
  console.log("[Selar] Secret configured:", !!expectedSecret);
  console.log("[Selar] Secret length:", expectedSecret?.length ?? 0);

  if (!expectedSecret) {
    console.error("[Selar] SELAR_AUTOMATION_SECRET is not configured");

    return NextResponse.json(
      { error: "Selar integration is not configured" },
      { status: 503 }
    );
  }

  const token = getBearerToken(request);

  console.log("[Selar] Token received:", !!token);
  console.log("[Selar] Token length:", token?.length ?? 0);
  console.log(
    "[Selar] Token matches:",
    !!expectedSecret && !!token && token === expectedSecret
  );

  if (!token || token !== expectedSecret) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const payload = body as Prisma.InputJsonObject;

  /*
   * Selar/Zapier payload fields can evolve, so we accept common
   * email/reference/product representations and normalize them here.
   *
   * After the first Zapier test, we can tighten this to the exact
   * payload Selar sends.
   */

  const email = firstString(
    payload.email,
    payload.customer_email,
    payload.customerEmail,
    payload.buyer_email,
    payload.buyerEmail,

    typeof payload.customer === "object" &&
      payload.customer !== null
      ? (payload.customer as Record<string, unknown>).email
      : null,

    typeof payload.buyer === "object" &&
      payload.buyer !== null
      ? (payload.buyer as Record<string, unknown>).email
      : null
  );

  if (!email) {
    return NextResponse.json(
      { error: "Purchaser email was not provided by Selar" },
      { status: 400 }
    );
  }

  const normalizedEmail = normalizeEmail(email);

  const reference = firstString(
    payload.reference,
    payload.transaction_reference,
    payload.transactionReference,
    payload.transaction_id,
    payload.transactionId,
    payload.order_id,
    payload.orderId,
    payload.id
  );

  if (!reference) {
    return NextResponse.json(
      { error: "Selar sale reference was not provided" },
      { status: 400 }
    );
  }

  const product = firstString(
    payload.product,
    payload.product_name,
    payload.productName,
    payload.item,

    typeof payload.product === "object" &&
      payload.product !== null
      ? (payload.product as Record<string, unknown>).name
      : null
  );

  const amountValue =
    typeof payload.amount === "number"
      ? payload.amount
      : Number(payload.amount);

  const amount = Number.isFinite(amountValue)
    ? Math.round(amountValue)
    : 0;

  const currency =
    firstString(payload.currency) ?? "NGN";

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    return NextResponse.json(
      {
        error:
          "No Chopute account exists for the purchaser email",
      },
      { status: 404 }
    );
  }

  /*
   * Idempotency:
   *
   * If Selar/Zapier sends the same sale more than once,
   * the same reference will not create a duplicate payment.
   */

  const existingPayment = await prisma.payment.findUnique({
    where: { reference },
  });

  if (existingPayment) {
    if (existingPayment.status === "PAID") {
      return NextResponse.json({
        success: true,
        alreadyProcessed: true,
        plan: "UNLIMITED",
      });
    }

    await prisma.payment.update({
      where: { reference },
      data: {
        status: "PAID",
        verifiedAt: new Date(),
        rawResponse: payload,
      },
    });
  } else {
    await prisma.payment.create({
      data: {
        userId: user.id,
        provider: "selar",
        reference,
        amount,
        currency,
        status: "PAID",
        verifiedAt: new Date(),
        rawResponse: payload,
      },
    });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      plan: "UNLIMITED",
    },
  });

  console.log(
    `[Selar] Activated unlimited access for ${normalizedEmail}` +
      `${product ? ` — ${product}` : ""}`
  );

  return NextResponse.json({
    success: true,
    userId: user.id,
    plan: "UNLIMITED",
  });
}