import type { ReactNode } from "react";

export function CorporatePageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="border-b border-[#eeeeee] bg-[#fafafa]">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#ff6b00]">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5c5c5c]">{description}</p>
      </div>
    </section>
  );
}

export function CorporateSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      <div className="mt-6 max-w-4xl space-y-5 text-base leading-8 text-[#5c5c5c]">{children}</div>
    </section>
  );
}

export function CorporateCTA() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
      <div className="rounded-3xl bg-[#fff3ea] p-8 sm:p-12">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight">You don't need more technology. You need the right solution.</h2>
        <p className="mt-4 max-w-2xl leading-7 text-[#5c5c5c]">Tell us what your business is trying to achieve, what's getting in the way, or what you want to build next.</p>
        <a href="/contact" className="mt-7 inline-flex rounded-full bg-[#ff6b00] px-6 py-3 font-semibold text-white hover:bg-[#e85f00]">Let's talk <span className="ml-2" aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
