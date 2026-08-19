const steps = [
  {
    number: "01",
    title: "Type a business type and a city.",
    description:
      "Plumbers in Manchester. Dentists in Lagos. Coffee shops in Austin. Any niche, any place on Earth.",
  },
  {
    number: "02",
    title: "Watch your list build itself in real time.",
    description:
      "Results stream onto your screen as Chopute finds them — no waiting, no loading screens.",
  },
  {
    number: "03",
    title: "Export and start closing.",
    description:
      "One click sends everything to a clean CSV, ready for Excel, Sheets, or your CRM.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1050px] px-6 py-[104px]">
        {/* Section label */}
        <div className="flex items-center gap-[8px] text-[12px] font-medium uppercase tracking-[0.8px] text-[#f4771f]">
          <span className="h-[1px] w-[17px] bg-[#f4771f]" />
          How it works
        </div>

        {/* Heading */}
        <h2 className="mt-[26px] max-w-[560px] text-[40px] font-bold leading-[1.15] tracking-[-1.5px] text-[#202124] sm:text-[42px]">
          Three Steps Between You
          <br />
          and Your Next Client
        </h2>

        {/* Steps */}
        <div className="mt-[64px] grid gap-[18px] md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="min-h-[242px] rounded-[16px] border border-[#e8eaed] bg-[#f8f9fa] px-[32px] py-[29px] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              {/* Number */}
              <div className="text-[30px] font-semibold leading-none tracking-[-1px] text-[#f8dcca]">
                {step.number}
              </div>

              {/* Title */}
              <h3 className="mt-[20px] text-[16px] font-semibold leading-[1.45] text-[#202124]">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-[11px] text-[14px] leading-[1.65] text-[#697386]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
                {/* Supporting statement */}
        <p className="mt-[42px] text-center text-[16px] leading-[1.5] text-[#9aa5b5]">
          No installs. No setup. No learning curve. If you can type, you can use Chopute.
        </p>
      </div>
    </section>
  );
}