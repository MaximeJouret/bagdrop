import { B2BHero } from "@/components/landing/b2b/b2b-hero";
import { B2BStatsBar } from "@/components/landing/b2b/b2b-stats-bar";
import { B2BPainPoints } from "@/components/landing/b2b/b2b-pain-points";
import { B2BHowItWorks } from "@/components/landing/b2b/b2b-how-it-works";
import { B2BBenefits } from "@/components/landing/b2b/b2b-benefits";
import { B2BCoverage } from "@/components/landing/b2b/b2b-coverage";
import { B2BPricing } from "@/components/landing/b2b/b2b-pricing";
import { B2BTestimonials } from "@/components/landing/b2b/b2b-testimonials";
import { B2BFAQ } from "@/components/landing/b2b/b2b-faq";
import { B2BPartnerForm } from "@/components/landing/b2b/b2b-partner-form";
import { B2BFinalCTA } from "@/components/landing/b2b/b2b-final-cta";
import { DonorLogos } from "@/components/landing/donor-logos";

export default function HomePage() {
  return (
    <div>
      <B2BHero />
      <B2BStatsBar />
      <B2BPainPoints />
      <B2BHowItWorks />
      <B2BBenefits />
      <B2BCoverage />
      <B2BTestimonials />
      <DonorLogos />
      <B2BPricing />
      <B2BFAQ />
      <B2BPartnerForm />
      <B2BFinalCTA />
    </div>
  );
}
