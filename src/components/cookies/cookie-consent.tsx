"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "chopute_cookie_consent";

type Consent = "accepted" | "rejected";

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_KEY) as Consent | null;
    setConsent(saved);
  }, []);

  const saveConsent = (value: Consent) => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);

    window.dispatchEvent(
      new CustomEvent("chopute-cookie-consent", {
        detail: value,
      })
    );
  };

  if (consent) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-background/95 shadow-2xl backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-base font-semibold text-foreground">
            We use cookies
          </h2>

          <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
            Chopute uses cookies to keep the website working and, with your
            permission, analytics cookies to understand how visitors use our
            website and improve your experience.
          </p>

          <a
            href="/privacy"
            className="mt-2 inline-block text-sm font-medium text-brand underline-offset-4 hover:underline"
          >
            Read our Privacy Policy
          </a>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => saveConsent("rejected")}
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Reject
          </button>

          <button
            type="button"
            onClick={() => saveConsent("accepted")}
            className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
