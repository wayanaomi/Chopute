import { LandingHeader } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero";
import { StatsSection } from "@/components/landing/stats";
import { HowItWorksSection } from "@/components/landing/how-it-works";
import { TutorialVideoSection } from "@/components/landing/tutorial-video";
import { WhatYouGetSection } from "@/components/landing/what-you-get";
import { WhyChoputeSection } from "@/components/landing/why-chopute";
import { WhoUsesItSection } from "@/components/landing/who-uses-it";
import { PricingSection } from "@/components/landing/pricing";
import { GuaranteeSection } from "@/components/landing/guarantee";
import { CountryCoverageSection } from "@/components/landing/country-coverage";
import { TestimonialsSection } from "@/components/landing/testimonials";
import { FAQSection } from "@/components/landing/faq";
import { FinalCTASection } from "@/components/landing/final-cta";
import { LandingFooter } from "@/components/landing/footer";

export function LeadsLandingPage() {
  return (
    <>
      <LandingHeader />
      <main>
        <HeroSection />
        <StatsSection />
        <HowItWorksSection />
        <TutorialVideoSection />
        <WhatYouGetSection />
        <WhyChoputeSection />
        <WhoUsesItSection />
        <PricingSection />
        <GuaranteeSection />
        <CountryCoverageSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <LandingFooter />
    </>
  );
}
