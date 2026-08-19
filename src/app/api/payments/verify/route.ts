import { NextResponse } from "next/server";
import { getFirebaseAuth } from "@/lib/auth/firebase-auth";
import { prisma } from "@/lib/db/prisma";
import { verifyAndFinalizePayment } from "@/lib/payments/verify-payment";

export async function GET(request: Request) {
  const session = await getFirebaseAuth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json(
      { error: "Missing reference" },
      { status: 400 }
    );
  }

  const payment = await prisma.payment.findUnique({
    where: { reference },
  });

  if (!payment || payment.userId !== session.user.id) {
    return NextResponse.json(
      { error: "Payment not found" },
      { status: 404 }
    );
  }

  try {
    const finalized =
      await verifyAndFinalizePayment(reference);

    return NextResponse.json({
      status: finalized.status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Verification failed",
      },
      { status: 502 }
    );
  }
}