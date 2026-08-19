"use client";

import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/form-controls";
import { Button } from "@/components/ui/button";

export function ReferralCard() {
  const [referralUrl, setReferralUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/referrals")
      .then((res) => res.json())
      .then((data) => setReferralUrl(data.referralUrl))
      .catch(() => setReferralUrl(null));
  }, []);

  async function handleCopy() {
    if (!referralUrl) return;
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Refer a friend</CardTitle>
        <CardDescription>
          Share your link and earn 1 extra free search for each person who signs up.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input value={referralUrl ?? "Loading…"} readOnly aria-label="Referral link" />
          <Button type="button" onClick={handleCopy} disabled={!referralUrl} className="bg-[#f4771f] text-white hover:bg-[#e96b15]">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy link"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
