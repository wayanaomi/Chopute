import type { Metadata } from "next";
import { CorporateSiteShell } from "@/components/corporate/corporate-site-shell";
import { CorporateCTA, CorporatePageHero, CorporateSection } from "@/components/corporate/corporate-page-content";

export const metadata: Metadata = {
  title: "About Chopute Labs",
  description: "Learn how Chopute Labs helps businesses turn technology into practical progress.",
};

export default function AboutPage() {
  return (
    <CorporateSiteShell>
      <CorporatePageHero
        eyebrow="About Chopute Labs"
        title="Technology is only useful when it solves something that matters."
        description="We help businesses build, integrate, and deploy software, AI, and automation around real-world needs."
      />
      <CorporateSection title="Our philosophy">
        <p>The best solution isn't always the most complicated one. We prefer to understand the problem, question the assumptions, find the simplest solution that meets the requirement, build it well, and measure whether it works.</p>
        <p>We believe good technology should make work clearer, processes more dependable, and opportunities easier to pursue.</p>
      </CorporateSection>
      <CorporateSection title="Our mission">
        <p>To make useful technology more accessible to businesses by helping them build, integrate, and deploy software, AI, and automation around real-world needs.</p>
      </CorporateSection>
      <CorporateSection title="Our vision">
        <p>A business environment where organisations of different sizes can access the technical capabilities they need to compete, innovate, and grow.</p>
      </CorporateSection>
      <CorporateSection title="How we work">
        <p><strong className="text-[#212121]">We listen before we build.</strong> We learn about your objectives, users, processes, and constraints.</p>
        <p><strong className="text-[#212121]">We challenge unnecessary complexity.</strong> If a simpler approach achieves the same outcome, we'll consider it.</p>
        <p><strong className="text-[#212121]">We communicate clearly.</strong> You should understand what we're building, why it matters, and what happens next.</p>
        <p><strong className="text-[#212121]">We think beyond delivery.</strong> Deployment, adoption, maintenance, and future improvements matter as much as the initial build.</p>
      </CorporateSection>
      <CorporateCTA />
    </CorporateSiteShell>
  );
}
