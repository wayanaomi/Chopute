import type { Metadata } from "next";
import { CorporateSiteShell } from "@/components/corporate/corporate-site-shell";
import { CorporatePageHero } from "@/components/corporate/corporate-page-content";

export const metadata: Metadata = {
  title: "Contact Chopute Labs",
  description: "Tell Chopute Labs about your project, business challenge, or technology requirements.",
};

export default function ContactPage() {
  return (
    <CorporateSiteShell>
      <CorporatePageHero
        eyebrow="Contact us"
        title="Tell us what you want to make possible."
        description="You don't need a complete specification, a technical diagram, or all the answers. Start with the problem you're trying to solve."
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold">What can we help with?</h2>
          <ul className="mt-6 space-y-3 leading-7 text-[#5c5c5c]">
            <li>Custom software development</li>
            <li>AI agents and automation</li>
            <li>White-label services</li>
            <li>Marketing and sales technology</li>
            <li>IT consulting and systems integration</li>
            <li>Web development and digital products</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-[#eeeeee] p-7 sm:p-9">
          <h2 className="text-2xl font-semibold">Start a conversation</h2>
          <p className="mt-4 leading-7 text-[#5c5c5c]">Tell us a little about your idea, current challenge, or desired outcome. We'll review your enquiry and determine the appropriate next step.</p>
          <a className="mt-7 inline-flex rounded-full bg-[#ff6b00] px-6 py-3 font-semibold text-white hover:bg-[#e85f00]" href="mailto:Projects@chopute.com?subject=Chopute%20Labs%20project%20enquiry">Email Projects@chopute.com ↗</a>
          <p className="mt-6 text-sm text-[#696969]">Prefer WhatsApp?</p>
          <a href="https://wa.me/2348075608147" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-semibold text-[#ff6b00]">Message Chopute Labs ↗</a>
        </div>
      </section>
    </CorporateSiteShell>
  );
}
