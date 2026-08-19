"use client";

import { Button } from "@/components/ui/button";

const SELAR_CHECKOUT_URL = "https://selar.com/chopute";

export function PaymentButton({
  label = "Get Unlimited Access — $25 One-Time →",
}: {
  label?: string;
}) {
  function handleClick() {
    window.location.href = SELAR_CHECKOUT_URL;
  }

  return (
    <Button size="lg" onClick={handleClick}>
      {label}
    </Button>
  );
}