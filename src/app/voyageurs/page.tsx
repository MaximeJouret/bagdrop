import { B2CHero } from "@/components/landing/b2c/b2c-hero";
import { B2CPainNarrative } from "@/components/landing/b2c/b2c-pain-narrative";
import { B2CServiceJourney } from "@/components/landing/b2c/b2c-service-journey";
import { B2CPricing } from "@/components/landing/b2c/b2c-pricing";
import { B2CTrust } from "@/components/landing/b2c/b2c-trust";
import { B2CTestimonials } from "@/components/landing/b2c/b2c-testimonials";
import { B2CFAQ } from "@/components/landing/b2c/b2c-faq";
import { B2CFinalCTA } from "@/components/landing/b2c/b2c-final-cta";
import { MapSection } from "@/components/landing/map-section";

export const metadata = {
  title: "BagDrop pour les voyageurs — Service de livraison bagages Bruxelles",
  description:
    "Confiez vos bagages à BagDrop. Collecte à votre hôtel, livraison à l'aéroport. Brussels Airport et Charleroi. Assurance 1500€, GPS temps réel.",
};

export default function VoyageursPage() {
  return (
    <div>
      <B2CHero />
      <B2CPainNarrative />
      <B2CServiceJourney />
      <B2CTrust />
      <MapSection />
      <B2CPricing />
      <B2CTestimonials />
      <B2CFAQ />
      <B2CFinalCTA />
    </div>
  );
}
