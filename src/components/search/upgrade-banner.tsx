import { Card, CardContent } from "@/components/ui/card";
import { PaymentButton } from "@/components/payment/payment-button";

export function UpgradeBanner() {
  return (
    <Card className="border-brand/30 bg-brand-light">
      <CardContent className="text-center">
        <p className="font-semibold text-foreground">You&apos;ve used your 2 free searches</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-foreground-muted">
          Unlock unlimited searches in 195 countries for a one-time payment of $25 —
          no subscription, ever.
        </p>
        <div className="mt-4 flex justify-center">
          <PaymentButton />
        </div>
        <p className="mt-2 text-xs text-foreground-muted">Instant access after payment</p>
      </CardContent>
    </Card>
  );
}
