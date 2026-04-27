import { Check, Plane, ArrowLeftRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const services = [
  {
    icon: Plane,
    name: "Hôtel → Aéroport",
    description:
      "Notre service phare. Collecte à votre hôtel, livraison à votre comptoir d'enregistrement.",
    price: "35",
    priceUnit: "€",
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
    description:
      "Vous arrivez à Bruxelles ? On récupère vos bagages à l'aéroport et on les livre à votre hôtel.",
    price: "35",
    priceUnit: "€",
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
    description:
      "Pas de vol prévu ? Stockage sécurisé en consigne mobile pour la journée.",
    price: "9",
    priceUnit: "€/jour",
    extraBag: 6,
    duration: "Jusqu'à 24h",
    features: [
      "Locker individuel sécurisé",
      "Récupération flexible",
      "Idéal entre deux check-ins",
      "Sans réservation préalable",
    ],
    cta: "Réserver",
    highlighted: false,
  },
];

export function B2CPricing() {
  return (
    <section
      id="tarifs"
      className="py-24 md:py-32 px-6 bg-background"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 lg:mb-20">
          <div className="lg:col-span-6">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--brand-cobalt)] mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--brand-cobalt)]" />
              Nos services
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-[var(--brand-ink)] dark:text-foreground leading-[1.02]">
              Tarifs simples,
              <br />
              <span className="text-muted-foreground">tout inclus.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-3">
                Pas de frais cachés, pas de mauvaise surprise. Assurance et
                tracking inclus dans chaque réservation.
              </p>
              <p className="text-xs text-muted-foreground/70">
                Tarifs indicatifs — susceptibles d'évolution selon zone et
                saisonnalité.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {services.map((service) => (
            <article
              key={service.name}
              className={cn(
                "p-8 md:p-10 flex flex-col relative",
                service.highlighted
                  ? "bg-[var(--brand-cobalt-deep)] text-white"
                  : "bg-card"
              )}
            >
              {service.highlighted && (
                <span className="absolute top-6 right-6 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--brand-cobalt-deep)] bg-[var(--brand-yellow)] px-3 py-1 rounded-full font-bold">
                  Le plus demandé
                </span>
              )}

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
                  "text-2xl font-bold tracking-[-0.025em] mb-2",
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

              <div
                className={cn(
                  "mb-8 pb-8 border-b",
                  service.highlighted ? "border-white/15" : "border-border"
                )}
              >
                <div className="flex items-baseline gap-1 mb-2">
                  <span
                    className={cn(
                      "text-6xl font-extrabold font-mono tracking-[-0.05em] leading-none",
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
                <p
                  className={cn(
                    "text-xs",
                    service.highlighted ? "text-white/60" : "text-muted-foreground"
                  )}
                >
                  1 bagage · +{service.extraBag}€ par bagage suppl.
                </p>
                <p
                  className={cn(
                    "text-[10px] font-mono uppercase tracking-[0.2em] mt-3 font-bold",
                    service.highlighted
                      ? "text-[var(--brand-yellow)]"
                      : "text-[var(--brand-cobalt)]"
                  )}
                >
                  {service.duration}
                </p>
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
                  "inline-flex items-center justify-center h-11 px-5 rounded-full text-sm font-semibold transition-colors",
                  service.highlighted
                    ? "bg-[var(--brand-yellow)] text-[var(--brand-cobalt-deep)] hover:bg-[var(--brand-yellow-deep)]"
                    : "bg-[var(--brand-cobalt)] text-white hover:bg-[var(--brand-cobalt-deep)]"
                )}
              >
                {service.cta}
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Charleroi (CRL) :{" "}
            <span className="font-bold text-[var(--brand-ink)] dark:text-foreground">
              +15€
            </span>{" "}
            sur les services de transport (distance allongée)
          </p>
        </div>
      </div>
    </section>
  );
}
