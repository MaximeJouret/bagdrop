import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Boutique",
    target: "Hôtels indépendants < 50 chambres",
    commission: "12%",
    setup: "Offerte",
    features: [
      "Tablette de réservation incluse",
      "Formation équipe 30 min",
      "Support email + téléphone",
      "Reporting mensuel automatique",
      "1 collecte programmée par jour",
    ],
    cta: "Demander un devis",
    highlighted: false,
  },
  {
    name: "Premium",
    target: "Hôtels 4-5★ ou 50-150 chambres",
    commission: "15%",
    setup: "Offerte",
    features: [
      "Tout Boutique, plus :",
      "Collectes multiples par jour",
      "Account manager dédié",
      "API d'intégration PMS",
      "Reporting personnalisé",
      "Service prioritaire 7j/7",
    ],
    cta: "Devenir partenaire premium",
    highlighted: true,
  },
  {
    name: "Groupe",
    target: "Chaînes & groupes 3+ établissements",
    commission: "Sur mesure",
    setup: "Sur mesure",
    features: [
      "Contrat cadre multi-sites",
      "Branding personnalisable",
      "SLA garantis",
      "Intégration ERP / CRM",
      "Comité de pilotage trimestriel",
    ],
    cta: "Nous contacter",
    highlighted: false,
  },
];

export function B2BPricing() {
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
              Modèles de partenariat
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-[var(--brand-ink)] dark:text-foreground leading-[1.02]">
              Trois formules,
              <br />
              <span className="text-muted-foreground">zéro frais cachés.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-3">
                Aucun investissement initial. Vous touchez votre commission dès
                la première réservation.
              </p>
              <p className="text-xs text-muted-foreground/70">
                Tarifs indicatifs — ajustables selon volume et conditions
                spécifiques.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={cn(
                "p-8 md:p-10 flex flex-col relative",
                tier.highlighted
                  ? "bg-[var(--brand-cobalt-deep)] text-white"
                  : "bg-card"
              )}
            >
              {tier.highlighted && (
                <span className="absolute top-6 right-6 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--brand-cobalt-deep)] bg-[var(--brand-yellow)] px-3 py-1 rounded-full font-bold">
                  Recommandé
                </span>
              )}

              <div className="mb-8">
                <h3
                  className={cn(
                    "text-3xl font-bold tracking-[-0.03em] mb-2",
                    tier.highlighted
                      ? "text-white"
                      : "text-[var(--brand-ink)] dark:text-foreground"
                  )}
                >
                  {tier.name}
                </h3>
                <p
                  className={cn(
                    "text-xs",
                    tier.highlighted ? "text-white/60" : "text-muted-foreground"
                  )}
                >
                  {tier.target}
                </p>
              </div>

              <div
                className={cn(
                  "mb-8 pb-8 border-b",
                  tier.highlighted ? "border-white/15" : "border-border"
                )}
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <span
                    className={cn(
                      "text-6xl font-extrabold font-mono tracking-[-0.05em] leading-none",
                      tier.highlighted
                        ? "text-white"
                        : "text-[var(--brand-ink)] dark:text-foreground"
                    )}
                  >
                    {tier.commission}
                  </span>
                  {tier.commission !== "Sur mesure" && (
                    <span
                      className={cn(
                        "text-sm",
                        tier.highlighted
                          ? "text-white/60"
                          : "text-muted-foreground"
                      )}
                    >
                      commission
                    </span>
                  )}
                </div>
                <p
                  className={cn(
                    "text-xs mt-2",
                    tier.highlighted ? "text-white/60" : "text-muted-foreground"
                  )}
                >
                  Activation : {tier.setup}
                </p>
              </div>

              <ul className="space-y-3 mb-10 flex-1">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className={cn(
                      "flex items-start gap-3 text-sm",
                      tier.highlighted ? "text-white/85" : "text-muted-foreground"
                    )}
                  >
                    <Check
                      className={cn(
                        "h-4 w-4 shrink-0 mt-0.5",
                        tier.highlighted
                          ? "text-[var(--brand-yellow)]"
                          : "text-[var(--brand-cobalt)]"
                      )}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#partenariat"
                className={cn(
                  "inline-flex items-center justify-center h-11 px-5 rounded-full text-sm font-semibold transition-colors",
                  tier.highlighted
                    ? "bg-[var(--brand-yellow)] text-[var(--brand-cobalt-deep)] hover:bg-[var(--brand-yellow-deep)]"
                    : "bg-[var(--brand-cobalt)] text-white hover:bg-[var(--brand-cobalt-deep)]"
                )}
              >
                {tier.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
