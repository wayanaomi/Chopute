import { NextResponse } from "next/server";
import crypto from "crypto";
import { verifyAndFinalizePayment } from "@/lib/payments/verify-payment";

/**
 * Paystack webhook — the authoritative, server-to-server confirmation path
 * (in addition to the client-redirect verify route) so unlimited access is
 * granted even if the customer closes their browser before returning to
 * the app. Configure this URL as `{NEXT_PUBLIC_APP_URL}/api/payments/webhook`
 * in the Paystack dashboard.
 */
export async function POST(request: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "Payments not configured" }, { status: 503 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  const expectedSignature = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");
  if (!signature || signature !== expectedSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: { event?: string; data?: { reference?: string } };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const reference = event?.data?.reference;
  if (event.event === "charge.success" && reference) {
    try {
      await verifyAndFinalizePayment(reference);
    } catch {
      // Swallow — Paystack retries webhooks on non-2xx, but an unknown
      // reference or transient verify failure shouldn't be retried forever.
    }
  }

  return NextResponse.json({ received: true });
}
