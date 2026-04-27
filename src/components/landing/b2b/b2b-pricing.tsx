import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Boutique",
    target: "Hôtels indépendants < 50 chambres",
    commission: "12%",
    setup: "Gratuit",
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
    setup: "Gratuit",
    features: [
      "Tout Boutique, plus :",
      "Collectes multiples / jour",
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
    target: "Chaînes hôtelières et groupes 3+ établissements",
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
    <section id="tarifs" className="py-20 md:py-24 px-4 bg-[var(--brand-cream)] dark:bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
            Modèles de partenariat
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--brand-charcoal)] dark:text-foreground mb-4">
            Trois formules, zéro frais cachés
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Aucun investissement initial. Vous touchez votre commission dès la
            première réservation.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-4 italic">
            Tarifs indicatifs — ajustables selon volume et conditions
            spécifiques de votre établissement.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                "relative flex flex-col",
                tier.highlighted &&
                  "border-primary/40 shadow-lg scale-[1.02] bg-background"
              )}
            >
              <CardContent className="p-7 flex flex-col h-full">
                {tier.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1">
                    Recommandé
                  </Badge>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[var(--brand-charcoal)] dark:text-foreground mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{tier.target}</p>
                </div>

                <div className="mb-6 pb-6 border-b border-border/50">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold font-mono text-[var(--brand-charcoal)] dark:text-foreground">
                      {tier.commission}
                    </span>
                    {tier.commission !== "Sur mesure" && (
                      <span className="text-sm text-muted-foreground">
                        commission
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Mise en service : {tier.setup}
                  </p>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {tier.features.map((feature) => (
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
                  href="#partenariat"
                  className={cn(
                    buttonVariants({
                      variant: tier.highlighted ? "default" : "outline",
                    }),
                    "w-full"
                  )}
                >
                  {tier.cta}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
