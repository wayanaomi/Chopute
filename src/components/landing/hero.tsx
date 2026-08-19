import Link from "next/link";

const previewLeads = [
  {
    initials: "GG",
    name: "Glow & Gele Salon",
    location: "Lagos",
    phone: "+234 801 234 5678",
    rating: "4.8",
  },
  {
    initials: "KH",
    name: "Kemi's Hair Studio",
    location: "Ikeja, Lagos",
    phone: "+234 802 345 6789",
    rating: "4.6",
  },
  {
    initials: "LL",
    name: "Lagos Locs & Co",
    location: "Lekki, Lagos",
    phone: "+234 803 456 7890",
    rating: "4.9",
  },
  {
    initials: "VB",
    name: "VB Beauty Lounge",
    location: "VI, Lagos",
    phone: "+234 804 567 8901",
    rating: "4.7",
  },
];

function LeadPreview() {
  return (
    <div className="relative w-full max-w-[480px]">
      {/* Search/results card */}
      <div className="rounded-[16px] border border-[#d9dce1] bg-white p-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.20)]">
        {/* Search state */}
        <div className="flex items-center gap-[8px] text-[12px]">
          <span className="rounded-full border border-[#f6b77f] bg-[#fffaf5] px-[10px] py-[4px] font-medium text-[#f4771f]">
            hair salons · Lagos
          </span>

          <span className="h-[6px] w-[6px] rounded-full bg-[#f4771f]" />

          <span className="text-[#9ba3b0]">searching...</span>
        </div>

        {/* Results count */}
        <div className="mt-[20px] flex items-baseline gap-[10px]">
          <span className="text-[46px] font-medium leading-none tracking-[-2px] text-[#17191c]">
            23
          </span>

          <span className="text-[16px] text-[#929baa]">
            leads found
          </span>
        </div>

        {/* Lead list */}
        <div className="mt-[22px] space-y-[8px]">
          {previewLeads.map((lead) => (
            <div
              key={lead.name}
              className="flex items-center gap-[12px] rounded-[12px] border border-[#eceef1] bg-[#f8f9fa] px-[16px] py-[11px]"
            >
              {/* Initials */}
              <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[8px] bg-[#f4771f] text-[10px] font-bold text-white">
                {lead.initials}
              </div>

              {/* Business */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold text-[#24272b]">
                  {lead.name}
                </p>

                <p className="mt-[1px] truncate text-[12px] text-[#9aa2af]">
                  {lead.location}
                </p>
              </div>

              {/* Contact + rating */}
              <div className="shrink-0 text-right">
                <p className="text-[11px] text-[#697386]">
                  {lead.phone}
                </p>

                <p className="mt-[2px] text-[12px] font-medium text-[#f4771f]">
                  ★ {lead.rating}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0f0f0f] text-white">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[180px] top-[80px] h-[600px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(244,119,31,0.10)_0%,rgba(244,119,31,0.035)_35%,transparent_70%)] blur-[30px]"
      />

      <div className="relative mx-auto w-full max-w-[1050px] px-6">
        <div className="grid min-h-[690px] items-center gap-[60px] py-[80px] lg:grid-cols-[1fr_1fr]">
          {/* LEFT */}
          <div className="max-w-[540px]">
            {/* Badge */}
            <div className="mb-[28px] inline-flex items-center gap-[8px] rounded-full border border-[#713817] bg-[#25170f] px-[13px] py-[6px] text-[12px] font-medium text-[#f4771f]">
              <span className="h-[6px] w-[6px] rounded-full bg-[#f4771f]" />
              195 countries · Instant results
            </div>

            {/* Heading */}
            <h1 className="text-[54px] font-bold leading-[1.03] tracking-[-2.5px] text-white sm:text-[60px] lg:text-[62px]">
              1,000 Business{" "}
              <br />
              Leads.{" "}
              <span className="text-[#f4771f]">60</span>
              <br />
              <span className="text-[#f4771f]">
                Seconds.
              </span>
              <br />
              <span className="text-[#f4771f]">
                $25. Forever.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-[28px] max-w-[500px] text-[16px] leading-[1.75] text-[#9ca3af]">
              Type any business and any city. Chopute hands you
              verified phone numbers, emails, websites, and ratings
              for 1,000+ real businesses — instantly, in any of 195
              countries. Pay once. Use it for life.
            </p>

            {/* CTA */}
            <div className="mt-[34px]">
              <Link
               href="/pricing" 
                className="inline-flex h-[55px] items-center justify-center rounded-[12px] bg-[#f4771f] px-[32px] text-[14px] font-semibold text-white shadow-[0_10px_25px_rgba(244,119,31,0.20)] transition-all hover:bg-[#e96b15] hover:shadow-[0_12px_30px_rgba(244,119,31,0.28)]"
              >
                Get Instant Access — $25 One-Time
                <span className="ml-[8px]">→</span>
              </Link>
            </div>

            {/* Free search link */}
            <Link
              href="/login"
              className="mt-[22px] inline-block text-[13px] text-[#697386] underline decoration-[#697386]/60 underline-offset-[5px] transition-colors hover:text-white"
            >
              or try 2 free searches first — no card, no signup
            </Link>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center lg:justify-end">
            <LeadPreview />
          </div>
        </div>
      </div>
    </section>
  );
}