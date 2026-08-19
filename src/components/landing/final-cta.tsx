const WHATSAPP_NUMBER = "08075608147";

export function FinalCTASection() {
  return (
    <section className="border-b border-[#1f252b] bg-[#111111] text-white">
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            Your Next Client Is $25
            <br />
            and 60 Seconds Away
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#9299a5] sm:text-lg">
            Every business you'll ever need to pitch is already searchable.
            <br className="hidden sm:block" />
            Chopute just hands them to you — instantly, anywhere, for life.
          </p>

          <a
            href="/pricing"
            className="mt-10 inline-flex min-h-[56px] items-center justify-center rounded-xl bg-brand px-9 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:-translate-y-0.5 hover:opacity-90"
          >
            Get Instant Access — $25 One-Time →
          </a>

          <p className="mt-8 text-sm text-[#5f6672]">
            One payment. No renewals. No regrets.
          </p>

          <a
            href="/app"
            className="mt-3 inline-block text-sm text-[#747c89] underline underline-offset-4 transition-colors hover:text-white"
          >
            Or try 2 free searches first, no card needed
          </a>
        </div>

        <div className="mx-auto mt-11 max-w-4xl border-t border-[#283039]" />

        <p className="mt-8 text-center text-sm text-[#7f8793]">
          Want our sales reps to call these leads for you?{" "}
          <a
            href={`https://wa.me/234${WHATSAPP_NUMBER.slice(1)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand transition-opacity hover:opacity-80"
          >
            Send a WhatsApp to {WHATSAPP_NUMBER}
          </a>
        </p>
      </div>
    </section>
  );
}