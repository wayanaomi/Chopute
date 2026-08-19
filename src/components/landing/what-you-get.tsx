const features = [
  {
    icon: "📞",
    title: "Direct phone numbers and email addresses",
    description:
      "Real contact points, not guesses or generic inboxes.",
  },
  {
    icon: "📍",
    title: "Full street address",
    description:
      "For every business returned, so you know exactly who you're reaching.",
  },
  {
    icon: "⭐",
    title: "Google rating on every result",
    description:
      "Instantly spot who's struggling and most likely to need what you sell.",
  },
  {
    icon: "🌐",
    title: "Live website link",
    description:
      "Size up their online presence before you ever pick up the phone.",
  },
  {
    icon: "🏷️",
    title: "Built-in lead tracker",
    description:
      "Tag every contact New, Contacted, Interested, Closed, or Not Interested — right inside your dashboard.",
  },
  {
    icon: "🕐",
    title: "Automatic search history",
    description:
      "Every list you've ever pulled, saved and one click away, forever.",
  },
  {
    icon: "📡",
    title: "Smart area expansion",
    description:
      "After each search, Chopute surfaces nearby areas you hadn't thought to check — multiplying your pipeline without retyping a thing.",
  },
];

export function WhatYouGetSection() {
  return (
    <section className="bg-[#fafafa]">
      <div className="mx-auto w-full max-w-[1050px] px-6 py-[105px]">
        {/* Section label */}
        <div className="flex items-center gap-[8px] text-[12px] font-medium uppercase tracking-[0.8px] text-[#f4771f]">
          <span className="h-[1px] w-[17px] bg-[#f4771f]" />
          What you get
        </div>

        {/* Heading */}
        <h2 className="mt-[25px] max-w-[590px] text-[40px] font-bold leading-[1.15] tracking-[-1.5px] text-[#202124] sm:text-[42px]">
          Nothing Half-Baked. Every
          <br />
          Result, Fully Loaded.
        </h2>

        {/* Feature grid */}
        <div className="mt-[65px] grid gap-[12px] md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex min-h-[122px] items-start gap-[16px] rounded-[16px] border border-[#e7e9ec] bg-white px-[24px] py-[24px] shadow-[0_2px_4px_rgba(0,0,0,0.06)]"
            >
              {/* Icon */}
              <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[12px] bg-[#fff8ed] text-[19px]">
                {feature.icon}
              </div>

              {/* Content */}
              <div className="min-w-0">
                <h3 className="text-[15px] font-semibold leading-[1.45] text-[#202124]">
                  {feature.title}
                </h3>

                <p className="mt-[5px] max-w-[410px] text-[14px] leading-[1.65] text-[#697386]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}