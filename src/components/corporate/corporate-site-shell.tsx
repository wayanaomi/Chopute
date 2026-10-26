import Image from "next/image";

const products = [
  { name: "Keren", href: "https://keren.chopute.com", description: "Discover and pursue opportunities." },
  { name: "Leads", href: "https://leads.chopute.com", description: "Find businesses and organise prospects." },
  { name: "Academy", href: "https://academy.chopute.com", description: "Learn and build new capabilities." },
];

export function CorporateSiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-[#212121]">
      <header className="sticky top-0 z-50 border-b border-[#eeeeee] bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-[82px] max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="/" aria-label="Chopute Labs homepage" className="shrink-0">
            <Image
              src="/brand/chopute-logo.png"
              alt="Chopute Labs"
              width={300}
              height={98}
              priority
              className="h-14 w-auto object-contain"
            />
          </a>

          <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-1 sm:gap-2">
            <a className="rounded-full px-3 py-2 text-sm hover:bg-[#fff3ea] hover:text-[#ff6b00]" href="/">Home</a>
            <a className="rounded-full px-3 py-2 text-sm hover:bg-[#fff3ea] hover:text-[#ff6b00]" href="/about">About</a>
            <a className="rounded-full px-3 py-2 text-sm hover:bg-[#fff3ea] hover:text-[#ff6b00]" href="/services">Services</a>
            <a className="rounded-full px-3 py-2 text-sm hover:bg-[#fff3ea] hover:text-[#ff6b00]" href="/blog">Blog</a>
            <details className="relative">
              <summary className="cursor-pointer list-none rounded-full px-3 py-2 text-sm hover:bg-[#fff3ea] hover:text-[#ff6b00]">
                Products <span aria-hidden="true">⌄</span>
              </summary>
              <div className="absolute right-0 z-50 mt-2 w-72 rounded-2xl border border-[#eeeeee] bg-white p-2 shadow-xl">
                {products.map((product) => (
                  <a
                    key={product.name}
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl p-3 hover:bg-[#fff3ea]"
                  >
                    <span className="block font-semibold">{product.name} <span aria-hidden="true">↗</span></span>
                    <span className="mt-1 block text-xs text-[#696969]">{product.description}</span>
                  </a>
                ))}
              </div>
            </details>
            <a className="rounded-full px-3 py-2 text-sm hover:bg-[#fff3ea] hover:text-[#ff6b00]" href="/tours">Tours</a>
            <a className="rounded-full px-3 py-2 text-sm hover:bg-[#fff3ea] hover:text-[#ff6b00]" href="/contact">Contact</a>
          </nav>

          <a
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#ff6b00] px-5 text-sm font-semibold text-white transition hover:bg-[#e85f00]"
          >
            Discuss a project <span className="ml-2" aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-[#eeeeee] bg-[#fafafa]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="/" className="inline-block">
              <Image src="/brand/chopute-logo.png" alt="Chopute Labs" width={240} height={78} className="h-12 w-auto object-contain" />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#696969]">
              Build better. Connect smarter. Move forward.
            </p>
          </div>

          <div>
            <h2 className="font-semibold">Explore</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#696969]">
              <a href="/about" className="hover:text-[#ff6b00]">About us</a>
              <a href="/services" className="hover:text-[#ff6b00]">Services</a>
              <a href="/blog" className="hover:text-[#ff6b00]">Blog & insights</a>
              <a href="/contact" className="hover:text-[#ff6b00]">Contact us</a>
            </div>
          </div>

          <div>
            <h2 className="font-semibold">Our platforms</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#696969]">
              {products.map((product) => (
                <a key={product.name} href={product.href} target="_blank" rel="noopener noreferrer" className="hover:text-[#ff6b00]">
                  {product.name} ↗
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold">Start a conversation</h2>
            <p className="mt-4 text-sm leading-6 text-[#696969]">
              Tell us about your project, your idea, or the problem you want to solve.
            </p>
            <a href="mailto:Projects@chopute.com" className="mt-3 inline-block text-sm font-semibold text-[#ff6b00]">
              Projects@chopute.com
            </a>
          </div>
        </div>
        <div className="border-t border-[#eeeeee] px-5 py-5 text-center text-xs text-[#696969]">
          © {new Date().getFullYear()} Chopute Labs. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
