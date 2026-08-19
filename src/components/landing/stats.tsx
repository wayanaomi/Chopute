const stats = [
  {
    value: "60s",
    description: "Results in under 60 seconds",
  },
  {
    value: "195",
    description: "Countries covered",
  },
  {
    value: "1,000+",
    description: "Businesses per search",
  },
  {
    value: "$25",
    description: "One-time. Never again.",
  },
];

export function StatsSection() {
  return (
    <section className="border-b border-[#eeeeee] bg-white">
      <div className="mx-auto grid w-full max-w-[1050px] grid-cols-2 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.value}
            className={`flex min-h-[96px] flex-col items-center justify-center px-6 text-center ${
              index !== 0
                ? "border-l border-[#eeeeee]"
                : ""
            }`}
          >
            <div className="text-[24px] font-semibold leading-none tracking-[-0.5px] text-[#f4771f]">
              {stat.value}
            </div>

            <div className="mt-[8px] text-[12px] leading-[1.4] text-[#596273]">
              {stat.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}