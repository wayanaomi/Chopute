"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { LoadingState } from "@/components/states/loading-state";
import { Button } from "@/components/ui/button";

export function PaymentStatus({ reference }: { reference: string }) {
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/payments/verify?reference=${encodeURIComponent(reference)}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Verification failed");
          setStatus("failed");
          return;
        }
        setStatus(data.status === "PAID" ? "success" : "failed");
      })
      .catch(() => {
        setError("Could not verify payment");
        setStatus("failed");
      });
  }, [reference]);

  if (status === "loading") return <LoadingState label="Verifying your payment…" />;

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <CheckCircle2 className="h-10 w-10 text-success" />
        <p className="text-lg font-semibold text-foreground">Payment verified</p>
        <p className="text-sm text-foreground-muted">
          You now have unlimited access to Chopute searches.
        </p>
        <Link href="/app/search">
          <Button className="mt-2">Start searching</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 py-12 text-center">
      <XCircle className="h-10 w-10 text-danger" />
      <p className="text-lg font-semibold text-foreground">Payment not confirmed</p>
      <p className="text-sm text-foreground-muted">{error || "Please try again."}</p>
      <Link href="/app/search">
        <Button variant="secondary" className="mt-2">
          Back to Chopute
        </Button>
      </Link>
    </div>
  );
}
