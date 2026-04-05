import { Hero } from "@/components/landing/hero";
import { TrustBar } from "@/components/landing/trust-bar";
import { HowItWorks } from "@/components/landing/how-it-works";
import { MapSection } from "@/components/landing/map-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { SocialCTA } from "@/components/landing/social-cta";
import { DonorLogos } from "@/components/landing/donor-logos";
import { FinalCTA } from "@/components/landing/final-cta";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <TrustBar />
      <HowItWorks />
      <MapSection />
      <PricingSection />
      <SocialCTA />
      <DonorLogos />
      <FinalCTA />
    </div>
  );
}
