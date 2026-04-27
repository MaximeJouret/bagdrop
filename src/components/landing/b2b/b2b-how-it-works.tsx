import { ClipboardCheck, Truck, ShieldCheck, PlaneTakeoff } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: ClipboardCheck,
    title: "Le client réserve",
    description:
      "Via notre plateforme ou directement à votre conciergerie. Vous générez le bon de prise en charge en 30 secondes.",
    timing: "T-24h à T-1h",
  },
  {
    num: "02",
    icon: Truck,
    title: "On collecte chez vous",
    description:
      "Notre camionnette équipée de lockers connectés passe à l'horaire convenu. Vos bagages sont scellés et scannés sur place.",
    timing: "Créneau de 30 min",
  },
  {
    num: "03",
    icon: ShieldCheck,
    title: "Transport sécurisé",
    description:
      "GPS temps réel, lockers individuels verrouillés, assurance jusqu'à 1 500€ par bagage. Vous suivez en direct.",
    timing: "30-50 min selon trafic",
  },
  {
    num: "04",
    icon: PlaneTakeoff,
    title: "Livraison à l'aéroport",
    description:
      "Remise au comptoir d'enregistrement de la compagnie, ou en zone dépose-bagage selon le choix client.",
    timing: "T-3h avant vol",
  },
];

export function B2BHowItWorks() {
  return (
    <section
      id="comment-ca-marche"
      className="py-20 md:py-24 px-4 bg-[var(--brand-cream)] dark:bg-muted/20"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
            Le processus
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--brand-charcoal)] dark:text-foreground mb-4">
            Comment ça marche
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Une opération simple, intégrée à votre flux quotidien. Aucun
            matériel à installer, aucune formation requise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              {/* Step card */}
              <div className="bg-background rounded-2xl border border-border/50 p-6 h-full hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-3xl font-bold font-mono text-primary/20">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[var(--brand-charcoal)] dark:text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {step.description}
                </p>
                <p className="text-xs font-mono uppercase tracking-wider text-primary border-t border-border/50 pt-3">
                  {step.timing}
                </p>
              </div>

              {/* Connector arrow */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-border z-0"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
