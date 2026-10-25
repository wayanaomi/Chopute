import Image from "next/image";

const services = [
  {
    number: "01",
    title: "Custom Software Development",
    description:
      "Purpose-built software designed around your operations, customers and commercial goals.",
  },
  {
    number: "02",
    title: "AI Agents & Intelligent Automation",
    description:
      "Put AI to practical work. Automate repetitive tasks and help your team focus on higher-value work.",
  },
  {
    number: "03",
    title: "White-Label Software & Development",
    description:
      "Launch and extend digital products with technology built to fit your brand and business model.",
  },
  {
    number: "04",
    title: "Marketing Technology",
    description:
      "Connect your marketing tools, improve workflows and turn disconnected activities into a more effective system.",
  },
  {
    number: "05",
    title: "IT Consulting & Digital Transformation",
    description:
      "Make informed technology decisions and build a practical roadmap for improving how your business operates.",
  },
  {
    number: "06",
    title: "Software Integration & Systems Automation",
    description:
      "Connect the systems you already use and reduce the manual work between them.",
  },
  {
    number: "07",
    title: "Web Development & Digital Products",
    description:
      "Build fast, considered digital experiences that give your business a stronger online presence.",
  },
];

const principles = [
  {
    title: "Business before technology",
    description:
      "We start with the problem, the people and the outcome—not a technology looking for a use.",
  },
  {
    title: "Built for real operations",
    description:
      "Our focus is on solutions that work in everyday business, not just impressive demonstrations.",
  },
  {
    title: "Flexible by design",
    description:
      "Start with the problem you need to solve today, with room to expand as your business grows.",
  },
];

export function CorporateHomePage() {
  return (
    <div className="min-h-screen bg-white text-[#212121]">
      <header className="sticky top-0 z-50 border-b border-[#eeeeee] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="/" aria-label="Chopute Labs homepage" className="shrink-0">
            <Image
              src="/brand/chopute-logo.png"
              alt="Chopute"
              width={300}
              height={98}
              priority
              className="h-22 w-auto object-contain"
            />
          </a>

        <nav className="hidden items-center gap-2 md:flex">
  <a
    href="#services"
    className="rounded-full border border-transparent px-5 py-3 text-sm font-semibold text-[#212121] transition duration-200 hover:border-[#ffd8bd] hover:bg-[#fff3ea] hover:text-[#ff6b00]"
  >
    Services
  </a>

  <a
    href="#about"
    className="rounded-full border border-transparent px-5 py-3 text-sm font-semibold text-[#212121] transition duration-200 hover:border-[#ffd8bd] hover:bg-[#fff3ea] hover:text-[#ff6b00]"
  >
    About
  </a>

  <a
    href="#products"
    className="rounded-full border border-transparent px-5 py-3 text-sm font-semibold text-[#212121] transition duration-200 hover:border-[#ffd8bd] hover:bg-[#fff3ea] hover:text-[#ff6b00]"
  >
    Products
  </a>
</nav>

          <a
            href="#contact"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#ff6b00] px-5 text-sm font-semibold text-white transition hover:bg-[#e85f00] sm:px-6"
          >
            Discuss a project <span className="ml-2" aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-36">
            <div>

              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Technology should move your business forward.{" "}
                <span className="text-[#ff6b00]">Not give you more work.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5c5c5c] sm:text-xl sm:leading-9">
                We build software, connect systems, automate repetitive work,
                and put AI to practical use helping businesses operate smarter,
                launch faster, and create new opportunities.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex h-14 items-center justify-center rounded-full bg-[#ff6b00] px-7 text-sm font-semibold text-white transition hover:bg-[#e85f00]"
                >
                  Tell us what you want to build
                  <span className="ml-3" aria-hidden="true">↗</span>
                </a>
                <a
                  href="#services"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-[#dedede] px-7 text-sm font-semibold text-[#212121] transition hover:border-[#ff6b00] hover:text-[#ff6b00]"
                >
                  Explore our services
                </a>
              </div>

              <p className="mt-8 text-sm text-[#777777]">
                Practical technology. Thoughtful execution. Room to grow.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#fff0e5] blur-3xl" />
              <div className="relative rounded-[2rem] border border-[#eeeeee] bg-[#fafafa] p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-[#e9e9e9] pb-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#888888]">
                      The bigger picture
                    </p>
                    <h2 className="mt-2 text-xl font-semibold">
                      Technology that works together.
                    </h2>
                  </div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ff6b00] text-xl text-white">
                    ↗
                  </span>
                </div>

                <div className="space-y-3 py-6">
                  {[
                    ["Software", "Tools built around your business"],
                    ["Automation", "Less repetitive manual work"],
                    ["Artificial intelligence", "Practical, focused applications"],
                    ["Integration", "Systems that work together"],
                  ].map(([title, description], index) => (
                    <div
                      key={title}
                      className="flex items-center gap-4 rounded-2xl border border-[#eeeeee] bg-white p-4"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff0e5] text-sm font-bold text-[#ff6b00]">
                        0{index + 1}
                      </span>
                      <div>
                        <p className="font-semibold">{title}</p>
                        <p className="mt-1 text-sm leading-5 text-[#777777]">
                          {description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-[#212121] p-5 text-white">
                  <p className="text-sm text-white/65">
                    Start with a real business problem.
                  </p>
                  <p className="mt-1 text-lg font-semibold">
                    Build the right solution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="border-t border-[#eeeeee] bg-[#fafafa]">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ff6b00]">
                What we do
              </p>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                The right technology for the work that matters.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#666666]">
                From a single workflow to a complete digital product, we help
                turn business needs into useful technology.
              </p>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.number}
                  className="group rounded-3xl border border-[#e9e9e9] bg-white p-7 transition duration-200 hover:-translate-y-1 hover:border-[#ffb780]"
                >
                  <p className="text-sm font-semibold text-[#ff6b00]">
                    {service.number}
                  </p>
                  <h3 className="mt-7 text-xl font-semibold leading-7 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#666666]">
                    {service.description}
                  </p>
                  <a
                    href="#contact"
                    className="mt-7 inline-flex items-center text-sm font-semibold text-[#212121] transition group-hover:text-[#ff6b00]"
                  >
                    Discuss this service
                    <span className="ml-2" aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ff6b00]">
                Why Chopute Labs
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">
                Useful technology starts with understanding the problem.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-8 text-[#5c5c5c]">
                We make useful technology more accessible by helping businesses
                build, integrate and deploy software, AI and automation around
                real-world needs.
              </p>
              <div className="mt-9 divide-y divide-[#eeeeee]">
                {principles.map((principle) => (
                  <div key={principle.title} className="py-6 first:pt-0">
                    <h3 className="text-lg font-semibold">{principle.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#666666]">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="border-y border-[#eeeeee] bg-[#fafafa]">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-20 sm:px-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ff6b00]">
                Products & digital ventures
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                More than projects. Technology with room to grow.
              </h2>
              <p className="mt-4 leading-7 text-[#666666]">
                We also develop digital products and focused solutions for
                specific business and learning needs. Explore our work or talk
                to us about an idea.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex h-12 shrink-0 items-center justify-center self-start rounded-full border border-[#d8d8d8] px-6 text-sm font-semibold transition hover:border-[#ff6b00] hover:text-[#ff6b00] md:self-center"
            >
              Explore an idea <span className="ml-2" aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section id="contact" className="bg-white">
          <div className="mx-auto max-w-5xl px-5 py-24 text-center sm:px-8 sm:py-32">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ff6b00]">
              Let’s build something useful
            </p>
            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
              Have a business problem worth solving?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#666666]">
              Tell us what you are trying to achieve. We’ll explore the
              challenge with you and discuss a practical way forward.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:Projects@chopute.com?subject=Discuss%20a%20project"
                className="inline-flex h-14 items-center justify-center rounded-full bg-[#ff6b00] px-8 text-sm font-semibold text-white transition hover:bg-[#e85f00]"
              >
                Let’s discuss your project <span className="ml-2" aria-hidden="true">↗</span>
              </a>
              <a
                href="https://wa.me/2348075608147"
                className="inline-flex h-14 items-center justify-center rounded-full border border-[#dedede] px-8 text-sm font-semibold transition hover:border-[#ff6b00] hover:text-[#ff6b00]"
              >
                Chat on WhatsApp
              </a>
            </div>
            <p className="mt-6 text-sm text-[#777777]">
              Or email{" "}
              <a
                className="font-medium text-[#212121] underline decoration-[#ffb780] underline-offset-4"
                href="mailto:Projects@chopute.com"
              >
                Projects@chopute.com
              </a>
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#eeeeee] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 text-sm text-[#777777] sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/chopute-logo.png"
              alt="Chopute"
              width={270}
              height={82}
              className="h-20 w-auto object-contain"
            />
            <span>Software & Technology</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <a href="#services" className="hover:text-[#ff6b00]">Services</a>
            <a href="#about" className="hover:text-[#ff6b00]">About</a>
            <a href="mailto:Projects@chopute.com" className="hover:text-[#ff6b00]">Contact</a>
            <span>© {new Date().getFullYear()} Chopute Labs</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
