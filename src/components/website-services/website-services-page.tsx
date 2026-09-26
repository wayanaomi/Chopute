"use client";

import {
  ArrowRight,
  Check,
  Globe2,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";

const benefits = [
  "Showcase your products or services",
  "Tell customers who you are and what you do",
  "Display your contact information clearly",
  "Receive enquiries from potential customers",
  "Give customers a place to learn before contacting you",
  "Connect your location and social media links",
];

export function WebsiteServicesPage() {
  return (
    <main className="min-h-screen bg-white text-[#212121]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#eeeeee] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-5 sm:px-6">
          <a
            href="https://chopute.com"
            className="flex items-center"
            aria-label="Chopute"
          >
            <img
              src="/chopute-logo.png"
              alt="Chopute"
              className="h-auto w-[135px] object-contain"
            />
          </a>

          <a
            href="#start"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF6B00] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e85f00]"
          >
            Get started
            <ArrowRight size={16} />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#212121]">
        <div className="absolute right-[-120px] top-[-100px] h-[420px] w-[420px] rounded-full bg-[#FF6B00]/20 blur-3xl" />
        <div className="absolute bottom-[-180px] left-[-100px] h-[380px] w-[380px] rounded-full bg-[#FF8A00]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#FF8A00]">
              <Sparkles size={14} />
              Get your business online
            </div>

            <h1 className="max-w-[700px] text-[45px] font-extrabold leading-[1.02] tracking-[-2.5px] text-white sm:text-[58px] lg:text-[68px]">
              Get your business online without paying everything upfront.
            </h1>

            <p className="mt-7 max-w-[600px] text-[17px] leading-[1.7] text-white/70 sm:text-[19px]">
              Start your professional business website with{" "}
              <span className="font-bold text-white">₦40,000</span>, then
              spread the remaining balance across 5 months.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#start"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6B00] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#e85f00]"
              >
                Start my website
                <ArrowRight size={17} />
              </a>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* HERO CARD */}
          <div className="relative">
            <div className="rounded-[28px] border border-white/10 bg-white p-4 shadow-2xl">
              <div className="overflow-hidden rounded-[20px] bg-[#F3F3F3]">
                <div className="flex items-center justify-between border-b border-[#e5e5e5] bg-white px-5 py-4">
                  <img
                    src="/chopute-logo.png"
                    alt="Chopute"
                    className="h-auto w-[105px] object-contain"
                  />

                  <span className="rounded-full bg-[#FFF1E6] px-3 py-1 text-[11px] font-bold text-[#FF6B00]">
                    ONLINE
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="h-3 w-24 rounded-full bg-[#FF6B00]" />
                  <div className="mt-5 h-9 w-[80%] rounded-lg bg-[#212121]" />
                  <div className="mt-3 h-3 w-[65%] rounded-full bg-[#cfcfcf]" />

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <div className="h-28 rounded-2xl bg-white" />
                    <div className="h-28 rounded-2xl bg-white" />
                  </div>

                  <div className="mt-5 rounded-2xl bg-[#212121] p-5">
                    <div className="h-3 w-24 rounded-full bg-[#FF6B00]" />
                    <div className="mt-3 h-3 w-[75%] rounded-full bg-white/20" />
                    <div className="mt-5 h-9 w-28 rounded-full bg-[#FF6B00]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-4 rounded-2xl border border-[#eeeeee] bg-white px-5 py-4 shadow-xl sm:-left-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#777]">
                Start with
              </p>
              <p className="mt-1 text-xl font-extrabold tracking-[-0.7px] text-[#212121]">
                ₦40,000
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="border-b border-[#eeeeee] bg-white">
        <div className="mx-auto max-w-[900px] px-5 py-20 text-center sm:px-6 sm:py-24">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF1E6] text-[#FF6B00]">
            <Globe2 size={22} />
          </div>

          <h2 className="mt-6 text-[34px] font-extrabold leading-[1.1] tracking-[-1.5px] sm:text-[45px]">
            Your business deserves a place online that belongs to you.
          </h2>

          <p className="mx-auto mt-6 max-w-[720px] text-[16px] leading-[1.8] text-[#5C5C5C] sm:text-[18px]">
            Social media can help people discover your business, but your
            website gives customers one clear place to understand what you
            offer, trust your business and take the next step.
          </p>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="bg-[#F3F3F3]">
        <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-6 sm:py-24">
          <div className="max-w-[650px]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#FF6B00]">
              <span className="h-px w-5 bg-[#FF6B00]" />
              What your website does
            </div>

            <h2 className="mt-5 text-[36px] font-extrabold leading-[1.1] tracking-[-1.6px] sm:text-[48px]">
              More than a website. A home for your business online.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-[20px] border border-[#e4e4e4] bg-white p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF1E6] text-[#FF6B00]">
                  <Check size={19} strokeWidth={2.5} />
                </div>

                <p className="mt-5 text-[15px] font-bold leading-[1.55] text-[#212121]">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY A WEBSITE */}
      <section id="how-it-works" className="bg-white">
        <div className="mx-auto grid max-w-[1180px] gap-14 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#FF6B00]">
              <span className="h-px w-5 bg-[#FF6B00]" />
              Why your business needs one
            </div>

            <h2 className="mt-5 text-[36px] font-extrabold leading-[1.1] tracking-[-1.6px] sm:text-[48px]">
              Let customers learn about you before they contact you.
            </h2>

            <p className="mt-6 text-[16px] leading-[1.8] text-[#5C5C5C]">
              A professional website helps customers find your business,
              understand what you offer, see where you are located, explore
              your services and decide what to do next.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[22px] border border-[#e8e8e8] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#212121] text-white">
                  <Smartphone size={20} />
                </div>

                <div>
                  <h3 className="font-extrabold">Built for your customers</h3>
                  <p className="mt-2 text-sm leading-6 text-[#697386]">
                    Give customers a clear place to discover your business
                    from their phones, tablets or computers.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[22px] border border-[#e8e8e8] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF1E6] text-[#FF6B00]">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <h3 className="font-extrabold">Build credibility</h3>
                  <p className="mt-2 text-sm leading-6 text-[#697386]">
                    Give potential customers more information before they
                    decide to reach out or buy.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[22px] border border-[#e8e8e8] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#212121] text-white">
                  <MessageCircle size={20} />
                </div>

                <div>
                  <h3 className="font-extrabold">
                    Create another path to enquiries
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#697386]">
                    Turn your online presence into a place where interested
                    customers can take the next step.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAYMENT */}
      <section id="start" className="bg-[#212121]">
        <div className="mx-auto max-w-[1000px] px-5 py-20 sm:px-6 sm:py-24">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white">
            <div className="grid lg:grid-cols-[1fr_0.8fr]">
              <div className="p-8 sm:p-12">
                <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#FF6B00]">
                  Simple payment plan
                </div>

                <h2 className="mt-5 text-[38px] font-extrabold leading-[1.05] tracking-[-1.7px] sm:text-[50px]">
                  Start now.
                  <br />
                  Pay the rest over time.
                </h2>

                <p className="mt-6 max-w-[520px] text-[16px] leading-[1.8] text-[#5C5C5C]">
                  You don't have to wait until you have the full amount before
                  getting your business online.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    "₦40,000 to get started",
                    "Remaining balance spread across 5 months",
                    "Professional business website",
                    "Built around your business needs",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF6B00] text-white">
                        <Check size={14} strokeWidth={3} />
                      </div>

                      <span className="text-sm font-semibold text-[#212121]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center bg-[#FF6B00] p-8 text-white sm:p-12">
                <p className="text-sm font-bold uppercase tracking-[0.1em] text-white/75">
                  Starting payment
                </p>

                <div className="mt-3 text-[54px] font-extrabold leading-none tracking-[-2px]">
                  ₦40,000
                </div>

                <p className="mt-4 text-sm leading-6 text-white/80">
                  Start your website today and spread the remaining balance
                  across 5 months.
                </p>

                <a
                  href="mailto:hello@chopute.com?subject=I want to start my business website"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-bold text-[#212121] transition hover:bg-[#f5f5f5]"
                >
                  Start my website
                  <ArrowRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-[850px] px-5 py-20 text-center sm:px-6 sm:py-24">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF1E6] text-[#FF6B00]">
            <Globe2 size={22} />
          </div>

          <h2 className="mt-6 text-[38px] font-extrabold leading-[1.05] tracking-[-1.8px] sm:text-[52px]">
            Get your business website started today.
          </h2>

          <p className="mx-auto mt-6 max-w-[650px] text-[16px] leading-[1.8] text-[#5C5C5C]">
            Start with ₦40,000 and spread the remaining balance across up to
            5 months. Let's build a professional online home for your
            business.
          </p>

          <a
            href="mailto:hello@chopute.com?subject=I want to start my business website"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#FF6B00] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#e85f00]"
          >
            Start my website
            <ArrowRight size={17} />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#eeeeee] bg-[#F3F3F3]">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <img
              src="/chopute-logo.png"
              alt="Chopute"
              className="h-auto w-[110px] object-contain"
            />
          </div>

          <p className="text-xs text-[#697386]">
            Professional websites built for business.
          </p>
        </div>
      </footer>
    </main>
  );
}