import type { Metadata } from "next";
import { CorporateSiteShell } from "@/components/corporate/corporate-site-shell";
import { CorporateCTA, CorporatePageHero } from "@/components/corporate/corporate-page-content";

export const metadata: Metadata = {
  title: "Services | Chopute Labs",
  description: "Software development, AI agents, automation, white-label delivery, consulting, and systems integration.",
};

const services = [
  ["Custom Software Development", "Build business management systems, customer portals, web applications, SaaS products, booking platforms, dashboards, and MVPs around your real requirements."],
  ["AI Agents & Automation", "Use AI and automation to support enquiries, classify information, assist customer support, organise documents, update connected systems, and trigger appropriate follow-up tasks."],
  ["White-Label Solutions & Development", "Expand your technical delivery capabilities with software, integrations, digital platforms, and development support delivered under an agreed partnership model."],
  ["Marketing Technology", "Connect lead capture, CRM systems, marketing workflows, customer engagement, campaign reporting, and sales operations."],
  ["IT Consulting & Digital Transformation", "Clarify requirements, evaluate build-versus-buy options, review processes, plan technology roadmaps, and assess practical AI use cases."],
  ["Systems Integration & API Development", "Connect third-party applications, synchronise data, create cross-platform workflows, and improve the flow of information between systems."],
  ["Web Development & Digital Products", "Create business websites, landing pages, customer portals, web applications, and conversion-focused digital experiences."],
];

export default function ServicesPage() {
  return (
    <CorporateSiteShell>
      <CorporatePageHero
        eyebrow="Our services"
        title="The technology capabilities your business needs, in one place."
        description="You shouldn't have to coordinate multiple providers just to get your software, integrations, automation, and marketing systems working together."
      />
      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-8 sm:py-20 md:grid-cols-2">
        {services.map(([title, description], index) => (
          <article key={title} className="rounded-2xl border border-[#eeeeee] p-7 transition hover:border-[#ffd0b0]">
            <p className="text-sm font-semibold text-[#ff6b00]">{String(index + 1).padStart(2, "0")}</p>
            <h2 className="mt-3 text-xl font-semibold">{title}</h2>
            <p className="mt-3 leading-7 text-[#5c5c5c]">{description}</p>
            <a href="/contact" className="mt-5 inline-block text-sm font-semibold text-[#ff6b00]">Discuss this service ↗</a>
          </article>
        ))}
      </section>
      <CorporateCTA />
    </CorporateSiteShell>
  );
}
