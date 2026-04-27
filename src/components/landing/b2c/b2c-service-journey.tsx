import { Calendar, BellRing, Truck, PlaneTakeoff } from "lucide-react";

const stages = [
  {
    num: "01",
    time: "J-1",
    icon: Calendar,
    title: "Vous réservez",
    description:
      "En 2 minutes sur l'app ou directement à votre hôtel partenaire. Vous choisissez votre créneau de collecte et votre vol.",
  },
  {
    num: "02",
    time: "J — 11h",
    icon: BellRing,
    title: "Notification de collecte",
    description:
      "Vous recevez un SMS 30 min avant. La conciergerie de l'hôtel a déjà préparé vos bagages. Aucun stress.",
  },
  {
    num: "03",
    time: "J — 11h30",
    icon: Truck,
    title: "Transport sécurisé",
    description:
      "Notre opérateur scanne et scelle chaque bagage. Locker individuel verrouillé, GPS actif, vous suivez en temps réel.",
  },
  {
    num: "04",
    time: "J — 16h",
    icon: PlaneTakeoff,
    title: "Vos bagages vous attendent",
    description:
      "Remise au comptoir d'enregistrement de votre compagnie aérienne. Vous arrivez les mains libres, vous embarquez serein.",
  },
];

export function B2CServiceJourney() {
  return (
    <section id="parcours" className="py-24 md:py-32 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 lg:mb-20 max-w-3xl">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--brand-cobalt)] mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-[var(--brand-cobalt)]" />
            Le parcours BagDrop
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-[var(--brand-ink)] dark:text-foreground leading-[1.02] mb-6">
            Quatre étapes,
            <br />
            <span className="text-muted-foreground">zéro effort.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Vous gérez votre journée. Nous gérons vos bagages. Tout est
            transparent, traçable, garanti.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {stages.map((stage) => (
            <article
              key={stage.num}
              className="bg-card p-8 flex flex-col h-full"
            >
              <div className="flex items-baseline justify-between mb-10">
                <span className="text-7xl font-extrabold font-mono text-[var(--brand-cobalt)]/15 leading-none tracking-[-0.045em]">
                  {stage.num}
                </span>
                <stage.icon
                  strokeWidth={1.5}
                  className="h-6 w-6 text-[var(--brand-cobalt)]"
                />
              </div>
              <span className="inline-block self-start text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--brand-cobalt)] font-bold mb-3 px-3 py-1 rounded-full bg-[var(--brand-cobalt)]/10">
                {stage.time}
              </span>
              <h3 className="font-bold text-xl tracking-[-0.025em] text-[var(--brand-ink)] dark:text-foreground mb-3 leading-tight">
                {stage.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stage.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
