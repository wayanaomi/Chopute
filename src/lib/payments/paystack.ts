import type { InitializePaymentResult, PaymentProvider, VerifyPaymentResult } from "./provider";

const PAYSTACK_BASE_URL = "https://api.paystack.co";

class PaystackConfigError extends Error {}

function getSecretKey(): string {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) {
    throw new PaystackConfigError(
      "PAYSTACK_SECRET_KEY is not configured. Set it in your environment (see .env.example) to enable payments."
    );
  }
  return key;
}

export function isPaystackConfigured(): boolean {
  return Boolean(process.env.PAYSTACK_SECRET_KEY && process.env.PAYSTACK_PUBLIC_KEY);
}

export const paystackProvider: PaymentProvider = {
  async initialize({ email, amount, currency, reference, callbackUrl, metadata }) {
    const secretKey = getSecretKey();

    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount,
        currency,
        reference,
        callback_url: callbackUrl,
        metadata,
      }),
    });

    const json = await response.json();
    if (!response.ok || !json?.status) {
      throw new Error(json?.message || "Failed to initialize payment with Paystack");
    }

    const result: InitializePaymentResult = {
      authorizationUrl: json.data.authorization_url,
      reference: json.data.reference,
      accessCode: json.data.access_code,
    };
    return result;
  },

  async verify(reference: string) {
    const secretKey = getSecretKey();

    const response = await fetch(
      `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: { Authorization: `Bearer ${secretKey}` },
      }
    );

    const json = await response.json();
    if (!response.ok || !json?.status) {
      throw new Error(json?.message || "Failed to verify payment with Paystack");
    }

    const data = json.data;
    const status: VerifyPaymentResult["status"] =
      data.status === "success"
        ? "success"
        : data.status === "abandoned"
          ? "abandoned"
          : data.status === "failed"
            ? "failed"
            : "pending";

    return {
      reference: data.reference,
      status,
      amount: data.amount,
      currency: data.currency,
      raw: data,
    };
  },
};
