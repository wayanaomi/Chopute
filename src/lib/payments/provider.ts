/**
 * Generic payment provider contract. Only Paystack is implemented today,
 * but route handlers depend on this interface so a different provider
 * could be swapped in without touching call sites.
 */
export interface InitializePaymentResult {
  authorizationUrl: string;
  reference: string;
  accessCode?: string;
}

export interface VerifyPaymentResult {
  reference: string;
  status: "success" | "failed" | "abandoned" | "pending";
  amount: number;
  currency: string;
  raw: unknown;
}

export interface PaymentProvider {
  initialize(params: {
    email: string;
    amount: number;
    currency: string;
    reference: string;
    callbackUrl: string;
    metadata?: Record<string, unknown>;
  }): Promise<InitializePaymentResult>;

  verify(reference: string): Promise<VerifyPaymentResult>;
}
