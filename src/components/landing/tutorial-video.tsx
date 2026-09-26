export function TutorialVideoSection() {
  return (
    <section className="border-y border-border bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
            See Chopute in Action
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            See how Chopute works
          </h2>

          <p className="mt-4 text-base leading-7 text-foreground-muted sm:text-lg">
            Watch this quick tutorial to see how Chopute helps you find
            businesses and build lead lists in seconds.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-[280px]">
          <div className="overflow-hidden rounded-3xl border border-border bg-black shadow-2xl">
            <video
              className="block h-auto w-full"
              controls
              preload="metadata"
              playsInline
              poster="/videos/chopute-tutorial-poster.png"
            >
              <source
                src="/videos/chopute-tutorial.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}