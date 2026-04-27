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
      id="processus"
      className="py-24 md:py-32 px-6 bg-[var(--brand-cream)] dark:bg-muted/20"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 lg:mb-20 max-w-3xl">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--brand-cobalt)] mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-[var(--brand-cobalt)]" />
            Le processus
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-[var(--brand-ink)] dark:text-foreground leading-[1.02] mb-6">
            Quatre étapes,
            <br />
            <span className="highlight text-[var(--brand-ink)] dark:text-foreground">
              zéro friction.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Une opération intégrée à votre flux quotidien. Aucun matériel à
            installer, aucune formation longue, aucune complexité.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {steps.map((step) => (
            <article
              key={step.num}
              className="bg-card p-8 flex flex-col h-full"
            >
              <div className="flex items-baseline justify-between mb-10">
                <span className="text-7xl font-extrabold font-mono text-[var(--brand-cobalt)]/15 leading-none tracking-[-0.045em]">
                  {step.num}
                </span>
                <step.icon
                  strokeWidth={1.5}
                  className="h-6 w-6 text-[var(--brand-cobalt)]"
                />
              </div>
              <h3 className="font-bold text-xl tracking-[-0.025em] text-[var(--brand-ink)] dark:text-foreground mb-3 leading-tight">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-1">
                {step.description}
              </p>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--brand-cobalt)] font-semibold border-t border-border pt-5">
                {step.timing}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
