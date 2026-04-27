import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Check, Plane, ArrowLeftRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const services = [
  {
    icon: Plane,
    name: "Hôtel → Aéroport",
    description: "Notre service phare. Collecte à votre hôtel, livraison à votre comptoir d'enregistrement.",
    price: 35,
    extraBag: 20,
    duration: "Livraison T-3h avant vol",
    features: [
      "Collecte à l'horaire de votre choix",
      "Suivi GPS en temps réel",
      "Assurance 1 500€ par bagage",
      "Photo confirmation de remise",
    ],
    cta: "Réserver",
    highlighted: true,
  },
  {
    icon: ArrowLeftRight,
    name: "Aéroport → Hôtel",
    description: "Vous arrivez à Bruxelles ? On récupère vos bagages à l'aéroport et on les livre à votre hôtel.",
    price: 35,
    extraBag: 20,
    duration: "Livraison sous 90 min",
    features: [
      "Récupération à l'arrivée",
      "Pas de stress avec les valises",
      "Profitez de Bruxelles dès l'arrivée",
      "Disponible 7j/7",
    ],
    cta: "Réserver",
    highlighted: false,
  },
  {
    icon: Clock,
    name: "Stockage journée",
    description: "Pas de vol prévu ? Stockage sécurisé en consigne mobile pour la journée.",
    price: 9,
    priceUnit: "/jour",
    extraBag: 6,
    duration: "Jusqu'à 24h",
    features: [
      "Locker individuel sécurisé",
      "Récupération flexible",
      "Idéal entre deux check-ins",
      "Sans réservation préalable possible",
    ],
    cta: "Réserver",
    highlighted: false,
  },
];

export function B2CPricing() {
  return (
    <section id="tarifs" className="py-20 md:py-24 px-4 bg-[var(--brand-cream)] dark:bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
            Nos services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--brand-charcoal)] dark:text-foreground mb-4">
            Tarifs simples, tout inclus
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Pas de frais cachés, pas de mauvaise surprise. Assurance et tracking
            inclus dans chaque réservation.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-4 italic">
            Tarifs indicatifs — susceptibles d'évolution selon zone et
            saisonnalité.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.name}
              className={cn(
                "relative flex flex-col",
                service.highlighted &&
                  "border-primary/40 shadow-lg scale-[1.02] bg-background"
              )}
            >
              <CardContent className="p-7 flex flex-col h-full">
                {service.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1">
                    Le plus demandé
                  </Badge>
                )}

                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <service.icon className="h-5 w-5 text-primary" />
                </div>

                <h3 className="text-xl font-bold text-[var(--brand-charcoal)] dark:text-foreground mb-2">
                  {service.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="mb-6 pb-6 border-b border-border/50">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold font-mono text-[var(--brand-charcoal)] dark:text-foreground">
                      {service.price}
                    </span>
                    <span className="text-lg text-muted-foreground">
                      €{service.priceUnit ?? ""}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    1 bagage · +{service.extraBag}€ par bagage supplémentaire
                  </p>
                  <p className="text-xs font-mono text-primary mt-2">
                    {service.duration}
                  </p>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#reserver"
                  className={cn(
                    buttonVariants({
                      variant: service.highlighted ? "default" : "outline",
                    }),
                    "w-full"
                  )}
                >
                  {service.cta}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Charleroi (CRL) :{" "}
            <span className="font-medium text-[var(--brand-charcoal)] dark:text-foreground">
              +15€
            </span>{" "}
            sur les services de transport (distance allongée)
          </p>
        </div>
      </div>
    </section>
  );
}
