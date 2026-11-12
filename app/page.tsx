import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { WhySection } from "@/components/landing/WhySection";
import { HowSection } from "@/components/landing/HowSection";
import { PortalsSection } from "@/components/landing/PortalsSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HelpSection } from "@/components/landing/HelpSection";
import { PrivacySection } from "@/components/landing/PrivacySection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { Footer } from "@/components/landing/Footer";
import { CardZoomController } from "@/components/landing/CardZoomController";

export default function HomePage() {
  return (
    <>
      <CardZoomController />
      <Navbar />
      <main>
        <Hero />
        <WhySection />
        <HowSection />
        <PortalsSection />
        <FeaturesSection />
        <HelpSection />
        <PrivacySection />
        <BenefitsSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
