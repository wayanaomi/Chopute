import { prisma } from "@/lib/db/prisma";
import { paystackProvider } from "./paystack";

/**
 * Verifies a payment reference directly with Paystack (never trusts the
 * client), then persists the verified result and — only on a successful,
 * not-already-processed payment — upgrades the user to UNLIMITED. Safe to
 * call multiple times for the same reference (e.g. from both the client
 * redirect callback and a webhook) without double-granting access.
 */
export async function verifyAndFinalizePayment(reference: string) {
  const payment = await prisma.payment.findUnique({ where: { reference } });
  if (!payment) {
    throw new Error("Unknown payment reference");
  }

  // Already finalized — return as-is instead of re-verifying/re-granting.
  if (payment.status === "PAID") {
    return payment;
  }

  const verification = await paystackProvider.verify(reference);

  if (verification.status !== "success") {
    const status = verification.status === "abandoned" ? "CANCELLED" : "FAILED";
    return prisma.payment.update({
      where: { reference },
      data: { status, rawResponse: verification.raw as object },
    });
  }

  return prisma.$transaction(async (tx) => {
    const updated = await tx.payment.update({
      where: { reference },
      data: {
        status: "PAID",
        verifiedAt: new Date(),
        rawResponse: verification.raw as object,
      },
    });

    await tx.user.update({
      where: { id: payment.userId },
      data: { plan: "UNLIMITED" },
    });

    return updated;
  });
}
