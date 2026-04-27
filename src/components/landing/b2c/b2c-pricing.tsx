import { Check, Plane, ArrowLeftRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const services = [
  {
    icon: Plane,
    name: "Hôtel → Aéroport",
    description: "Notre service phare.",
    price: "35",
    priceUnit: "€",
    features: [
      "Collecte à l'horaire de votre choix",
      "Suivi GPS en temps réel",
      "Assurance 1 500€ par bagage",
    ],
    cta: "Réserver",
    highlighted: true,
  },
  {
    icon: ArrowLeftRight,
    name: "Aéroport → Hôtel",
    description: "Vous arrivez à Bruxelles ?",
    price: "35",
    priceUnit: "€",
    features: [
      "Récupération à l'arrivée",
      "Livraison sous 90 min",
      "Disponible 7j/7",
    ],
    cta: "Réserver",
    highlighted: false,
  },
  {
    icon: Clock,
    name: "Stockage journée",
    description: "Pas de vol prévu ?",
    price: "9",
    priceUnit: "€/jour",
    features: [
      "Locker individuel sécurisé",
      "Récupération flexible",
      "Jusqu'à 24h",
    ],
    cta: "Réserver",
    highlighted: false,
  },
];

export function B2CPricing() {
  return (
    <section
      id="tarifs"
      className="py-32 md:py-48 px-6 bg-background"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20 md:mb-28 max-w-3xl mx-auto">
          <p className="text-sm text-[var(--brand-cobalt)] mb-4">Nos services</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] text-[var(--brand-ink)] dark:text-foreground leading-[1.1]">
            Trois services,
            <br />
            <span className="text-muted-foreground">prix tout compris.</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-8">
            Tarifs indicatifs · Charleroi à +15€
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <article
              key={service.name}
              className={cn(
                "rounded-3xl p-8 md:p-10 flex flex-col",
                service.highlighted
                  ? "bg-[var(--brand-cobalt-deep)] text-white"
                  : "bg-[var(--brand-cream)]"
              )}
            >
              <service.icon
                strokeWidth={1.5}
                className={cn(
                  "h-7 w-7 mb-6",
                  service.highlighted
                    ? "text-[var(--brand-yellow)]"
                    : "text-[var(--brand-cobalt)]"
                )}
              />

              <h3
                className={cn(
                  "text-2xl font-semibold tracking-tight mb-2",
                  service.highlighted
                    ? "text-white"
                    : "text-[var(--brand-ink)] dark:text-foreground"
                )}
              >
                {service.name}
              </h3>
              <p
                className={cn(
                  "text-sm leading-relaxed mb-8",
                  service.highlighted ? "text-white/70" : "text-muted-foreground"
                )}
              >
                {service.description}
              </p>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span
                    className={cn(
                      "text-5xl md:text-6xl font-semibold tracking-[-0.04em] leading-none",
                      service.highlighted
                        ? "text-white"
                        : "text-[var(--brand-ink)] dark:text-foreground"
                    )}
                  >
                    {service.price}
                  </span>
                  <span
                    className={cn(
                      "text-base",
                      service.highlighted ? "text-white/60" : "text-muted-foreground"
                    )}
                  >
                    {service.priceUnit}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-10 flex-1">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className={cn(
                      "flex items-start gap-3 text-sm",
                      service.highlighted ? "text-white/85" : "text-muted-foreground"
                    )}
                  >
                    <Check
                      className={cn(
                        "h-4 w-4 shrink-0 mt-0.5",
                        service.highlighted
                          ? "text-[var(--brand-yellow)]"
                          : "text-[var(--brand-cobalt)]"
                      )}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#reserver"
                className={cn(
                  "inline-flex items-center justify-center h-11 px-5 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  service.highlighted
                    ? "bg-[var(--brand-yellow)] text-[var(--brand-cobalt-deep)] hover:bg-[var(--brand-yellow-deep)] focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-[var(--brand-cobalt-deep)]"
                    : "bg-[var(--brand-cobalt)] text-white hover:bg-[var(--brand-cobalt-deep)] focus-visible:ring-[var(--brand-cobalt)] focus-visible:ring-offset-[var(--brand-cream)]"
                )}
              >
                {service.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
