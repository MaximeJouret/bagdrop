"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/text-reveal";

const tiers = [
  {
    name: "Boutique",
    target: "Hôtels indépendants < 50 chambres",
    commission: "12%",
    features: [
      "Tablette de réservation incluse",
      "Formation équipe 30 min",
      "Support email + téléphone",
      "1 collecte programmée par jour",
    ],
    cta: "Recevoir un devis",
    highlighted: false,
  },
  {
    name: "Premium",
    target: "Hôtels 4-5★ ou 50-150 chambres",
    commission: "15%",
    features: [
      "Tout Boutique, plus :",
      "Collectes multiples par jour",
      "Account manager dédié",
      "API d'intégration PMS",
      "Service prioritaire 7j/7",
    ],
    cta: "Choisir Premium",
    highlighted: true,
  },
  {
    name: "Groupe",
    target: "Chaînes & groupes 3+ établissements",
    commission: "Sur mesure",
    features: [
      "Contrat cadre multi-sites",
      "Branding personnalisable",
      "SLA garantis",
      "Comité de pilotage trimestriel",
    ],
    cta: "Nous contacter",
    highlighted: false,
  },
];

export function B2BPricing() {
  const reduced = useReducedMotion();

  return (
    <section
      id="tarifs"
      className="py-32 md:py-48 px-6 bg-background"
    >
      <div className="container mx-auto max-w-6xl">
        <Reveal>
          <div className="text-center mb-20 md:mb-28 max-w-3xl mx-auto">
            <p className="text-sm text-[var(--brand-cobalt)] mb-4">
              Modèles de partenariat
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] text-[var(--brand-ink)] dark:text-foreground leading-[1.1]">
              Trois formules,
              <br />
              <span className="text-muted-foreground">zéro frais cachés.</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-8">
              Tarifs indicatifs — affinés selon votre volume.
            </p>
          </div>
        </Reveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 md:gap-8" stagger={0.12}>
          {tiers.map((tier) => (
            <StaggerItem key={tier.name}>
              <motion.article
                whileHover={reduced ? undefined : { y: -6 }}
                transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={cn(
                  "rounded-3xl p-8 md:p-10 flex flex-col h-full",
                  tier.highlighted
                    ? "bg-[var(--brand-cobalt-deep)] text-white shadow-xl shadow-[var(--brand-cobalt-deep)]/15"
                    : "bg-[var(--brand-cream)]"
                )}
              >
                <div className="mb-8">
                  <h3
                    className={cn(
                      "text-2xl font-semibold tracking-tight mb-2",
                      tier.highlighted
                        ? "text-white"
                        : "text-[var(--brand-ink)] dark:text-foreground"
                    )}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={cn(
                      "text-sm",
                      tier.highlighted ? "text-white/60" : "text-muted-foreground"
                    )}
                  >
                    {tier.target}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span
                      className={cn(
                        "text-5xl md:text-6xl font-semibold tracking-[-0.04em] leading-none",
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
                      "text-sm mt-2",
                      tier.highlighted ? "text-white/60" : "text-muted-foreground"
                    )}
                  >
                    Activation offerte
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
                    "inline-flex items-center justify-center h-11 px-5 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    tier.highlighted
                      ? "bg-[var(--brand-yellow)] text-[var(--brand-cobalt-deep)] hover:bg-[var(--brand-yellow-deep)] focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-[var(--brand-cobalt-deep)]"
                      : "bg-[var(--brand-cobalt)] text-white hover:bg-[var(--brand-cobalt-deep)] focus-visible:ring-[var(--brand-cobalt)] focus-visible:ring-offset-[var(--brand-cream)]"
                  )}
                >
                  {tier.cta}
                </Link>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
