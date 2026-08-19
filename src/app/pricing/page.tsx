import Link from "next/link";
import { ChoputeLogoLink } from "@/components/brand/chopute-logo";
import { PaymentButton } from "@/components/payment/payment-button";

const FEATURES = [
  "Unlimited searches, for life — no cap, no \"credits,\" ever",
  "1,000+ verified business contacts per search",
  "All 195 countries, every city",
  "Phone numbers, emails, websites, addresses, Google ratings",
  "Built-in lead tracker (New / Contacted / Closed / etc.)",
  "Automatic search history — every list, saved forever",
  "Smart area expansion after each search",
  "One-click CSV export",
  "All future updates at no extra charge",
];

export const metadata = {
  title: "Pricing — Chopute",
  description:
    "Get unlimited Chopute business lead searches for a one-time payment.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-[#eeeeee] bg-white">
        <div className="mx-auto flex h-[90px] w-full max-w-[1050px] items-center justify-between px-6">
          <ChoputeLogoLink className="shrink-0" />

          <Link
            href="/login"
            className="inline-flex h-[44px] items-center justify-center rounded-[10px] bg-[#f4771f] px-[24px] text-[14px] font-semibold text-white shadow-[0_6px_16px_rgba(244,119,31,0.20)] transition-all hover:bg-[#e96b15]"
          >
            Try free first
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 pb-12 pt-20 text-center sm:pt-24">
        <p className="text-[14px] font-semibold uppercase tracking-[0.14em] text-[#f4771f]">
          Pricing
        </p>

        <h1 className="mx-auto mt-7 max-w-[760px] text-[42px] font-bold leading-[1.15] tracking-[-0.03em] text-[#171717] sm:text-[52px]">
          Everything Chopute Does.
          <br />
          One Payment. No Catch.
        </h1>

        <p className="mx-auto mt-7 max-w-[650px] text-[17px] leading-7 text-[#697386]">
          Pay $25 once. Run unlimited searches in 195 countries,
          forever. No subscription, no renewal — ever.
        </p>
      </section>

      {/* Pricing card */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[520px] rounded-[18px] border border-[#f5c49e] bg-[#fffdfa] p-8 sm:p-10">
          <div>
            <div className="flex items-end gap-3">
              <span className="text-[58px] font-bold leading-none tracking-[-0.04em] text-[#171717]">
                $25
              </span>

              <span className="pb-1 text-[16px] text-[#697386]">
                one-time
              </span>
            </div>

            <p className="mt-3 text-[14px] text-[#697386]">
              Launch pricing. Yours permanently after one payment.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {FEATURES.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 text-[15px] leading-6 text-[#3f4856]"
              >
                <span
                  aria-hidden="true"
                  className="mt-[2px] flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-[4px] bg-[#22c55e] text-[12px] font-bold text-white"
                >
                  ✓
                </span>

                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Purchase */}
          <div className="mt-9">
            <PaymentButton
              label="Get Instant Access — $25 One-Time →"
            />
          </div>

          <p className="mt-3 text-center text-[12px] text-[#9aa3b2]">
            Card payments unlock access immediately. Secure checkout.
          </p>

          <div className="my-7 border-t border-[#e7e7e7]" />

          {/* Bank transfer */}
          <div className="rounded-[14px] border border-[#e1e5eb] bg-white px-5 py-5 text-center">
            <p className="text-[13px] text-[#697386]">
              Prefer bank transfer?
            </p>

            <p className="mt-2 text-[14px] leading-6 text-[#3f4856]">
              Send proof of payment via WhatsApp to{" "}
              <a
                href="https://wa.me/2348075608147"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#f4771f] hover:underline"
              >
                08075608147
              </a>{" "}
              — account activated within minutes.
            </p>
          </div>
        </div>

        {/* Free option */}
        <div className="mt-12 text-center">
          <p className="text-[14px] text-[#697386]">
            Not ready to pay yet?
          </p>

          <Link
            href="/login"
            className="mt-3 inline-block text-[14px] font-medium text-[#f4771f] underline underline-offset-4 hover:text-[#e96b15]"
          >
            Try 2 free searches first — no card, no signup
          </Link>
        </div>
      </section>

      {/* Guarantee */}
      <section className="border-t border-[#eeeeee] bg-[#f8fafc] px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#f4771f]">
            The Guarantee
          </p>

          <h2 className="mt-5 text-[30px] font-bold tracking-[-0.02em] text-[#171717] sm:text-[34px]">
            Zero Risk On Your Side
          </h2>

          <p className="mt-6 text-[16px] leading-7 text-[#697386]">
            Chopute has returned real, usable results in every city and
            country we've tested — all 195 of them. If your very first
            search comes back empty for any reason, contact us and we'll
            fix it immediately, no questions asked.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#eeeeee] bg-[#f8fafc]">
        <div className="mx-auto flex min-h-[120px] w-full max-w-[1050px] items-center justify-between px-6">
          <ChoputeLogoLink className="scale-[0.55] origin-left" />

          <p className="text-[13px] text-[#9aa3b2]">
            © {new Date().getFullYear()} Chopute.
          </p>
        </div>
      </footer>
    </main>
  );
}