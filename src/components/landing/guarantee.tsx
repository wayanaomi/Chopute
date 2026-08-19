import { ShieldCheck } from "lucide-react";

export function GuaranteeSection() {
  return (
    <section className="border-y border-[#1f1f1f] bg-[#111111]">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-14">
          {/* Icon */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#7a3616] bg-[#24170f]">
            <ShieldCheck
              className="h-8 w-8 text-orange-400"
              strokeWidth={1.5}
            />
          </div>

          {/* Content */}
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-brand">
              — The Guarantee
            </p>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Zero Risk On Your Side
            </h2>

            <p className="mt-5 text-base leading-6 text-[#9ca3af]">
              Chopute has returned real, usable results in every city and
              country we've tested — all 195 of them. If your very first
              search comes back empty for any reason, contact us and we'll
              fix it immediately, no questions asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}