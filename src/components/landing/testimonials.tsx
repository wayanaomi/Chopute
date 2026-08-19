const TESTIMONIALS = [
  {
    quote:
      "The lead quality was spot on — relevant contacts that actually matched what I was looking for. Saved me a ton of time chasing dead ends. The pricing is hard to beat for what you get.",
    name: "Nour Badr",
    initial: "N",
  },
  {
    quote:
      "Customer care is excellent, and I love how it remembers and sorts my search history automatically.",
    name: "Rebecca Omonigho",
    initial: "R",
  },
  {
    quote:
      "Compared to Upwork and a few others, this feels like a shortcut. The contacts land in your lap in seconds.",
    name: "Osita Livinus",
    initial: "O",
  },
  {
    quote:
      "A genuinely useful database, and the area-suggestion feature is a nice touch I didn't expect.",
    name: "Paul Hassan",
    initial: "P",
  },
  {
    quote:
      "My first search came back beyond what I expected. I'd recommend it to any marketing professional.",
    name: "Deborah Stephen",
    initial: "D",
  },
];

export function TestimonialsSection() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
        <div className="mb-14">
          <div className="mb-6 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-brand">
            <span className="h-px w-4 bg-brand" />
            Testimonials
          </div>

          <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            What People Are Finding
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <article
              key={`${testimonial.name}-${index}`}
              className="flex min-h-[335px] flex-col rounded-2xl border border-border bg-card p-7 shadow-sm"
            >
              <div className="text-3xl font-bold leading-none text-brand/25">
                “
              </div>

              <p className="mt-10 flex-1 text-base leading-6 text-foreground-muted">
                {testimonial.quote}
              </p>

              <div className="mt-6 border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-medium text-white">
                    {testimonial.initial}
                  </div>

                  <span className="text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}