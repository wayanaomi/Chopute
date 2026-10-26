"use client";

import { useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Products", href: "/#products" },
  { label: "Tours", href: "/tours" },
  { label: "Contact", href: "/contact" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(!open)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#eeeeee] text-[#212121] transition hover:bg-[#fff3ea]"
      >
        {open ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6"
          >
            <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6"
          >
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <div
          id="mobile-navigation"
          className="absolute right-0 top-[calc(100%+10px)] z-50 max-h-[calc(100dvh-100px)] w-[min(88vw,360px)] overflow-y-auto rounded-2xl border border-[#eeeeee] bg-white p-4 shadow-xl"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3.5 text-sm font-semibold text-[#212121] transition hover:bg-[#fff3ea] hover:text-[#ff6b00]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#ff6b00] px-5 text-sm font-semibold text-white transition hover:bg-[#e85f00]"
          >
            Discuss a project <span className="ml-2" aria-hidden="true">↗</span>
          </a>
        </div>
      )}
    </div>
  );
}
