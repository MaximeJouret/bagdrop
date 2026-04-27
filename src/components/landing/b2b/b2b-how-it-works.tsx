import { ClipboardCheck, Truck, ShieldCheck, PlaneTakeoff } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: ClipboardCheck,
    title: "Le client réserve",
    description:
      "Via notre plateforme ou directement à votre conciergerie. Génération du bon de prise en charge en 30 secondes.",
  },
  {
    num: "02",
    icon: Truck,
    title: "On collecte chez vous",
    description:
      "Notre camionnette équipée de lockers connectés passe à l'horaire convenu. Bagages scellés et scannés sur place.",
  },
  {
    num: "03",
    icon: ShieldCheck,
    title: "Transport sécurisé",
    description:
      "GPS temps réel, lockers individuels verrouillés, assurance jusqu'à 1 500€ par bagage. Suivi en direct.",
  },
  {
    num: "04",
    icon: PlaneTakeoff,
    title: "Livraison à l'aéroport",
    description:
      "Remise au comptoir d'enregistrement de la compagnie aérienne, ou en zone dépose-bagage selon le choix client.",
  },
];

export function B2BHowItWorks() {
  return (
    <section
      id="processus"
      className="py-32 md:py-48 px-6 bg-background"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20 md:mb-28 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] text-[var(--brand-ink)] dark:text-foreground leading-[1.1]">
            Quatre étapes,
            <br />
            <span className="text-muted-foreground">zéro friction.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10">
          {steps.map((step) => (
            <div key={step.num} className="text-center md:text-left">
              <div className="flex items-center md:items-baseline justify-center md:justify-start gap-4 mb-6">
                <span className="font-mono text-sm text-[var(--brand-cobalt)] tracking-widest">
                  {step.num}
                </span>
                <span className="hidden md:block flex-1 h-px bg-border" aria-hidden="true" />
                <step.icon
                  strokeWidth={1.5}
                  className="h-5 w-5 text-[var(--brand-cobalt)]"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--brand-ink)] dark:text-foreground mb-3 leading-tight">
                {step.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
