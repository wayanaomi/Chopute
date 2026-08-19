import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { getFirebaseAuth } from "@/lib/auth/firebase-auth";
import { prisma } from "@/lib/db/prisma";
import {
  paystackProvider,
  isPaystackConfigured,
} from "@/lib/payments/paystack";
import {
  APP_URL,
  UNLIMITED_ACCESS_PRICE_NGN,
} from "@/lib/constants";

export async function POST() {
  const session = await getFirebaseAuth();

  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!isPaystackConfigured()) {
    return NextResponse.json(
      {
        error:
          "Payments are not yet configured. An administrator must set PAYSTACK_SECRET_KEY and PAYSTACK_PUBLIC_KEY.",
      },
      { status: 503 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  if (user.plan === "UNLIMITED") {
    return NextResponse.json(
      { error: "You already have unlimited access" },
      { status: 400 }
    );
  }

  const reference = `chopute_${nanoid(20)}`;
  const amountKobo =
    UNLIMITED_ACCESS_PRICE_NGN * 100;

  await prisma.payment.create({
    data: {
      userId: user.id,
      reference,
      amount: amountKobo,
      currency: "NGN",
      status: "PENDING",
    },
  });

  try {
    const result = await paystackProvider.initialize({
      email: user.email,
      amount: amountKobo,
      currency: "NGN",
      reference,
      callbackUrl: `${APP_URL}/app/payment/callback`,
      metadata: {
        userId: user.id,
      },
    });

    return NextResponse.json({
      authorizationUrl: result.authorizationUrl,
      reference: result.reference,
    });
  } catch (error) {
    await prisma.payment.update({
      where: { reference },
      data: {
        status: "FAILED",
      },
    });

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to start payment",
      },
      { status: 502 }
    );
  }
}