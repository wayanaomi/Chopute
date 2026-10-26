import type { Metadata } from "next";
import { CorporateSiteShell } from "@/components/corporate/corporate-site-shell";
import { ToursWaitlistForm } from "@/components/corporate/tours-waitlist-form";

export const metadata: Metadata = {
  title: "Boss Campus Tour | Chopute Labs",
  description:
    "12 universities. 3 African countries. One tour. Join the waitlist for Boss Campus Tour and follow the future of tech, AI and innovation across Africa.",
};

export default function ToursPage() {
  return (
    <CorporateSiteShell>
      <main>
        <section className="relative overflow-hidden bg-[#171717] text-white">
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ff8a42]">
                Boss Campus Tour
              </p>
              <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.08] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                Coming to a city near you.
              </h1>
              <p className="mt-7 text-xl font-semibold text-white sm:text-2xl">
                12 Universities. 3 African Countries. One Tour.
              </p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                Nigeria. Ghana. Rwanda.
              </p>
              <p className="mt-3 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                We’re bringing tech, AI, and the future of innovation to campuses
                across Africa. Get ready to explore possibilities, discover
                opportunities, and position yourself for the future.
              </p>
              <a
                href="#join-waitlist"
                className="mt-9 inline-flex min-h-14 items-center justify-center rounded-full bg-[#ff6b00] px-7 py-4 font-semibold text-white transition hover:bg-[#e85f00]"
              >
                Join the waitlist <span className="ml-3" aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/[0.06] p-7 sm:p-9">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#ff8a42]">
                One continent. New possibilities.
              </p>
              <div className="mt-8 space-y-5">
                {[
                  ["01", "Nigeria", "Meet the next wave of campus innovators."],
                  ["02", "Ghana", "Explore technology, ideas and opportunity."],
                  ["03", "Rwanda", "Be part of the future of innovation."],
                ].map(([number, country, description]) => (
                  <div key={country} className="flex gap-4 border-b border-white/10 pb-5 last:border-0 last:pb-0">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff6b00]/15 text-sm font-bold text-[#ff8a42]">
                      {number}
                    </span>
                    <div>
                      <h2 className="font-semibold">{country}</h2>
                      <p className="mt-1 text-sm leading-6 text-white/65">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="join-waitlist" className="scroll-mt-28 bg-[#fafafa]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#ff6b00]">
                Stay in the loop
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">
                Be first to hear when we arrive.
              </h2>
              <p className="mt-5 max-w-lg leading-8 text-[#5c5c5c]">
                Join the Boss Campus Tour waitlist for updates about the tour
                and opportunities to take part.
              </p>
            </div>

            <div className="rounded-3xl border border-[#eeeeee] bg-white p-6 shadow-sm sm:p-9">
              <ToursWaitlistForm />
            </div>
          </div>
        </section>
      </main>
    </CorporateSiteShell>
  );
}
