const COUNTRIES = [
  { flag: "🇳🇬", name: "Nigeria" },
  { flag: "🇬🇧", name: "United Kingdom" },
  { flag: "🇺🇸", name: "United States" },
  { flag: "🇦🇪", name: "UAE" },
  { flag: "🇰🇪", name: "Kenya" },
  { flag: "🇬🇭", name: "Ghana" },
  { flag: "🇿🇦", name: "South Africa" },
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇮🇳", name: "India" },
];

export function CountryCoverageSection() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-brand">
            <span className="h-px w-4 bg-brand" />
            Country Coverage
          </div>

          <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            195 Countries. Every City. No
            <br className="hidden sm:block" />
            Exceptions.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-foreground-muted sm:text-lg">
            From London to Lagos, New York to Nairobi, Dubai to Accra —
            Chopute surfaces real, contactable businesses anywhere people are
            doing business.
          </p>
        </div>

        <div className="mt-10 flex max-w-5xl flex-wrap gap-2">
          {COUNTRIES.map((country) => (
            <div
              key={country.name}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground"
            >
              <span>{country.flag}</span>
              <span>{country.name}</span>
            </div>
          ))}

          <button
            type="button"
            className="rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            + 185 more
          </button>
        </div>
      </div>
    </section>
  );
}