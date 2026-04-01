import Link from "next/link";
import { MapPin, QrCode, Shield, Clock } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent } from "@/components/ui/card";
import { DynamicMap } from "@/components/map/dynamic-map";
import { cn } from "@/lib/utils";

// Hardcoded trailers for MVP (before Supabase is connected)
const DEMO_TRAILERS = [
  {
    id: "a1000000-0000-0000-0000-000000000001",
    name: "BagDrop Grand-Place",
    address: "Rue de la Colline 1, 1000 Bruxelles",
    latitude: 50.8467,
    longitude: 4.3525,
    active: true,
    opening_time: "08:00",
    closing_time: "22:00",
    created_at: "",
    updated_at: "",
    availableSmall: 4,
    availableLarge: 2,
  },
  {
    id: "a1000000-0000-0000-0000-000000000002",
    name: "BagDrop Gare du Midi",
    address: "Avenue Fonsny 47B, 1060 Bruxelles",
    latitude: 50.8354,
    longitude: 4.3365,
    active: true,
    opening_time: "06:00",
    closing_time: "23:00",
    created_at: "",
    updated_at: "",
    availableSmall: 4,
    availableLarge: 2,
  },
  {
    id: "a1000000-0000-0000-0000-000000000003",
    name: "BagDrop Gare Centrale",
    address: "Boulevard de l'Impératrice 2, 1000 Bruxelles",
    latitude: 50.8456,
    longitude: 4.3567,
    active: true,
    opening_time: "07:00",
    closing_time: "22:00",
    created_at: "",
    updated_at: "",
    availableSmall: 4,
    availableLarge: 2,
  },
  {
    id: "a1000000-0000-0000-0000-000000000004",
    name: "BagDrop Manneken Pis",
    address: "Rue du Chêne 3, 1000 Bruxelles",
    latitude: 50.845,
    longitude: 4.3498,
    active: true,
    opening_time: "08:00",
    closing_time: "21:00",
    created_at: "",
    updated_at: "",
    availableSmall: 4,
    availableLarge: 2,
  },
  {
    id: "a1000000-0000-0000-0000-000000000005",
    name: "BagDrop Atomium",
    address: "Place de l'Atomium 1, 1020 Bruxelles",
    latitude: 50.8947,
    longitude: 4.3416,
    active: true,
    opening_time: "09:00",
    closing_time: "20:00",
    created_at: "",
    updated_at: "",
    availableSmall: 4,
    availableLarge: 2,
  },
];

const features = [
  {
    icon: MapPin,
    title: "Emplacements stratégiques",
    description:
      "Nos casiers sont situés aux meilleurs spots touristiques de Bruxelles.",
  },
  {
    icon: QrCode,
    title: "Accès par QR code",
    description:
      "Réservez en ligne et accédez à votre casier avec un simple QR code.",
  },
  {
    icon: Shield,
    title: "Sécurisé et assuré",
    description:
      "Vos bagages sont protégés dans des casiers fermés et assurés.",
  },
  {
    icon: Clock,
    title: "Flexible",
    description:
      "Réservez pour 1 heure ou toute la journée, prolongez à tout moment.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Déposez vos bagages,
            <br />
            <span className="text-primary">explorez Bruxelles</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Casiers connectés et sécurisés aux meilleurs emplacements
            touristiques. Réservez en ligne, déposez vos bagages, profitez de
            votre journée.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="#map" className={cn(buttonVariants({ size: "lg" }))}>
              Voir les emplacements
            </Link>
            <Link href="/#how-it-works" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              Comment ça marche
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing badges */}
      <section className="pb-8 px-4">
        <div className="container mx-auto flex flex-wrap justify-center gap-6">
          <Card className="bg-muted/50">
            <CardContent className="flex items-center gap-3 py-3 px-5">
              <span className="text-2xl font-bold">2,50 €</span>
              <span className="text-sm text-muted-foreground">
                /heure — Petit casier
                <br />
                Bagage à main
              </span>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardContent className="flex items-center gap-3 py-3 px-5">
              <span className="text-2xl font-bold">4,00 €</span>
              <span className="text-sm text-muted-foreground">
                /heure — Grand casier
                <br />
                Valise 23 kg
              </span>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Map */}
      <section id="map" className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            Nos emplacements à Bruxelles
          </h2>
          <div className="h-[500px] md:h-[600px]">
            <DynamicMap trailers={DEMO_TRAILERS} />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">
            Comment ça marche
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Choisissez un emplacement",
                description:
                  "Sélectionnez le casier le plus proche de votre visite sur la carte.",
              },
              {
                step: "2",
                title: "Réservez et payez",
                description:
                  "Choisissez la taille du casier et la durée. Paiement sécurisé en ligne.",
              },
              {
                step: "3",
                title: "Déposez vos bagages",
                description:
                  "Présentez votre QR code au casier. Récupérez vos affaires quand vous voulez.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="pricing" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">
            Pourquoi BagDrop ?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="pt-6">
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Prêt à voyager léger ?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Réservez votre casier en quelques clics et profitez de Bruxelles
            sans vos bagages.
          </p>
          <Link href="#map" className={cn(buttonVariants({ size: "lg", variant: "secondary" }))}>
            Réserver maintenant
          </Link>
        </div>
      </section>
    </div>
  );
}
