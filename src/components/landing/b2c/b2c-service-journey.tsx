import { Calendar, BellRing, Truck, PlaneTakeoff } from "lucide-react";

const stages = [
  {
    num: "01",
    time: "J-1",
    icon: Calendar,
    title: "Vous réservez",
    description:
      "En 2 minutes sur l'app ou directement à votre hôtel partenaire. Vous choisissez votre créneau et votre vol.",
  },
  {
    num: "02",
    time: "J — 11h",
    icon: BellRing,
    title: "Notification de collecte",
    description:
      "SMS 30 min avant. La conciergerie a déjà préparé vos bagages. Aucun stress.",
  },
  {
    num: "03",
    time: "J — 11h30",
    icon: Truck,
    title: "Transport sécurisé",
    description:
      "Bagages scellés et scannés. Locker individuel verrouillé, GPS actif, suivi temps réel.",
  },
  {
    num: "04",
    time: "J — 16h",
    icon: PlaneTakeoff,
    title: "Vos bagages vous attendent",
    description:
      "Remise au comptoir d'enregistrement de votre compagnie aérienne. Vous embarquez serein.",
  },
];

export function B2CServiceJourney() {
  return (
    <section id="parcours" className="py-32 md:py-48 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20 md:mb-28 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] text-[var(--brand-ink)] dark:text-foreground leading-[1.1]">
            Quatre étapes,
            <br />
            <span className="text-muted-foreground">zéro effort.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10">
          {stages.map((stage) => (
            <div key={stage.num} className="text-center md:text-left">
              <div className="flex items-center md:items-baseline justify-center md:justify-start gap-4 mb-6">
                <span className="font-mono text-sm text-[var(--brand-cobalt)] tracking-widest">
                  {stage.num}
                </span>
                <span className="hidden md:block flex-1 h-px bg-border" aria-hidden="true" />
                <stage.icon
                  strokeWidth={1.5}
                  className="h-5 w-5 text-[var(--brand-cobalt)]"
                />
              </div>
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                {stage.time}
              </p>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--brand-ink)] dark:text-foreground mb-3 leading-tight">
                {stage.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
