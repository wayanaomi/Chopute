import { LandingHeader } from "@/components/landing/header";
import { LandingFooter } from "@/components/landing/footer";

export const metadata = { title: "Terms of Service — Chopute" };

export default function TermsPage() {
  return (
    <>
      <LandingHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground-muted">
            <p>
              Chopute provides business lead search based on publicly available
              business listing data. Results depend on data availability for the
              requested location and business type and are provided &ldquo;as is&rdquo;.
            </p>
            <p>
              New accounts receive 2 free searches. Unlimited access is granted after
              a verified one-time payment of $25 and does not expire. Payments are
              non-refundable once unlimited access has been granted, except where
              required by law.
            </p>
            <p>
              You agree to use exported business data in compliance with applicable
              anti-spam and data protection laws in your jurisdiction.
            </p>
          </div>
        </div>
      </main>
      <LandingFooter />
    </>
  );
}
