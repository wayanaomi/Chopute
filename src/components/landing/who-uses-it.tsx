const AUDIENCES = [
  {
    title: "WEB DESIGNERS",
    description: "Find businesses running broken or outdated sites.",
    featured: true,
  },
  {
    title: "SOCIAL MEDIA MANAGERS",
    description: "Find local businesses with zero online presence worth mentioning.",
  },
  {
    title: "SEO AGENCIES",
    description: "Find businesses that are invisible on Google and don't know it.",
  },
  {
    title: "COPYWRITERS",
    description: "Find companies whose messaging is begging for help.",
  },
  {
    title: "MARKETING CONSULTANTS",
    description:
      "Stop guessing where your next client is hiding and start pointing straight at them.",
  },
  {
    title: "SALES REPS & RECRUITERS",
    description:
      "Any niche, any city — the list is already there, waiting to be pulled.",
  },
];

export function WhoUsesItSection() {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-brand">
          <span className="h-px w-[17px] bg-brand" />
          Who uses it
        </div>

        {/* Heading */}
        <h2 className="mt-7 max-w-[650px] text-4xl font-bold leading-[1.2] tracking-[-0.04em] text-foreground sm:text-[40px]">
          If You Sell to Businesses,
          <br />
          Chopute Sells You the List
        </h2>

        {/* Audience cards */}
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {AUDIENCES.map((audience) => (
            <div
              key={audience.title}
              className={`min-h-[132px] rounded-2xl border bg-card px-7 py-7 shadow-sm ${
                audience.featured
                  ? "border-[#ffca9b]"
                  : "border-border"
              }`}
            >
              <div className="text-[11px] font-medium uppercase tracking-[0.15em] text-brand">
                {audience.title}
              </div>

              <p className="mt-4 text-[15px] leading-[1.55] text-foreground-muted">
                {audience.description}
              </p>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <p className="mt-12 max-w-[720px] text-[16px] leading-[1.55] text-foreground-muted">
          Whatever you sell to businesses, the businesses are already
          searchable. You just haven&apos;t had a fast enough way to find them
          — until now.
        </p>
      </div>
    </section>
  );
}