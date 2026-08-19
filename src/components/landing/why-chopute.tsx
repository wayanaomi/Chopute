import { Check, X } from "lucide-react";

const OTHER_POINTS = [
  "$588+/year, billed on renewal",
  "Static database — scraped months ago",
  "Dead numbers, bounced emails",
  "Stale the day you download it",
];

const CHOPUTE_POINTS = [
  "$25 one-time, yours forever",
  "Live results pulled at search time",
  "Active listings, fewer dead ends",
  "Always current, every time you search",
];

export function WhyChoputeSection() {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto grid w-full max-w-6xl gap-16 px-6 py-24 md:grid-cols-2 md:items-center">
        {/* LEFT SIDE */}
        <div>
          {/* Eyebrow */}
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-brand">
            <span className="h-px w-[17px] bg-brand" />
            Why Chopute beats a static database
          </div>

          {/* Heading */}
          <h2 className="mt-7 max-w-xl text-4xl font-bold leading-[1.2] tracking-[-0.04em] text-foreground sm:text-[42px]">
            Stop Paying for
            <br />
            Yesterday&apos;s Leads
          </h2>

          {/* Description */}
          <div className="mt-8 max-w-[520px] space-y-5 text-base leading-[1.6] text-foreground-muted">
            <p>
              Most contact databases sell you a list that was scraped months
              ago and hasn&apos;t been touched since. Apollo.io, for example,
              charges roughly $588 a year for exactly that — frozen, aging
              records.
            </p>

            <p>
              Chopute pulls fresh results from active, current listings on
              every single search. Fewer dead numbers, fewer bounced emails,
              and a list that&apos;s actually worth your time.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-3">
          {/* OTHER DATABASES */}
          <div className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm">
            <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-foreground-muted">
              Others (e.g. Apollo.io)
            </div>

            <div className="mt-5">
              {OTHER_POINTS.map((point, index) => (
                <div
                  key={point}
                  className={`flex items-center gap-3 py-4 text-sm text-foreground-muted ${
                    index !== OTHER_POINTS.length - 1
                      ? "border-b border-border"
                      : ""
                  }`}
                >
                  <X className="h-4 w-4 shrink-0 text-danger" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CHOPUTE */}
          <div className="rounded-2xl border border-[#ffca9b] bg-[#fffdfa] px-6 py-6 shadow-sm">
            <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-brand">
              Chopute
            </div>

            <div className="mt-5">
              {CHOPUTE_POINTS.map((point, index) => (
                <div
                  key={point}
                  className={`flex items-center gap-3 py-4 text-sm text-foreground-muted ${
                    index !== CHOPUTE_POINTS.length - 1
                      ? "border-b border-[#f4dfca]"
                      : ""
                  }`}
                >
                  <Check className="h-4 w-4 shrink-0 text-brand" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}