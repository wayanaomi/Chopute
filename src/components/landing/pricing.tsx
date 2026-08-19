const FEATURES = [
  "Unlimited searches, for life — no cap, no \"credits,\" ever",
  "1,000+ verified business contacts per search",
  "All 195 countries, every city, no region locked behind a higher tier",
  "Every feature included: lead tracker, saved history, smart area suggestions, CSV export",
  "All future updates and new features, automatically, at no extra charge",
  "Zero monthly fees. Zero renewal. Zero subscription, ever.",
];

export function PricingSection() {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-brand">
            — Pricing
          </p>

          <h2 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Everything Chopute Does. One Payment. No Catch.
          </h2>

          <p className="mt-5 text-base text-foreground-muted">
            Here's the entire deal, laid out plainly:
          </p>
        </div>

        {/* Pricing content */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.35fr_0.85fr] lg:items-start">
          {/* Features */}
          <div>
            <div className="space-y-5">
              {FEATURES.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 text-base leading-6 text-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] bg-green-500 text-sm font-bold text-white"
                  >
                    ✓
                  </span>

                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <p className="mt-10 max-w-2xl text-base leading-6 text-foreground-muted">
              Most tools in this category lock you into a recurring bill —
              $97/month and up is normal for unlimited search access elsewhere.
              Chopute doesn't. You pay once, and the meter never starts.
            </p>
          </div>

          {/* Pricing card */}
          <div className="rounded-2xl border border-brand/40 bg-card p-8 shadow-sm">
            <div>
              <p className="text-5xl font-bold tracking-tight text-foreground">
                $25
              </p>

              <p className="mt-1 text-sm text-foreground-muted">
                paid once, yours permanently.
              </p>
            </div>

            <p className="mt-7 text-base leading-6 text-foreground-muted">
              Launch pricing. Once this batch of access is claimed, new
              customers pay the standard yearly rate. Lock in now.
            </p>

            <a
              href="/pricing"
              className="mt-7 flex w-full items-center justify-center rounded-xl bg-brand px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:opacity-90"
            >
              Get Instant Access — $25 One-Time →
            </a>

            <p className="mt-3 text-center text-xs text-foreground-muted">
              Secure checkout. Access unlocks immediately.
            </p>

            <div className="my-6 border-t border-border" />

            <p className="text-center text-sm leading-5 text-foreground-muted">
              Prefer bank transfer? Send proof via WhatsApp to{" "}
              <a
                href="https://wa.me/2348075608147"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand hover:underline"
              >
                08075608147
              </a>{" "}
              — activated within minutes.
            </p>

            <div className="mt-4 text-center">
              <a
                href="/login"
                className="text-sm text-foreground-muted underline decoration-border underline-offset-4 transition hover:text-foreground"
              >
                Or try 2 free searches first, no card needed
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}