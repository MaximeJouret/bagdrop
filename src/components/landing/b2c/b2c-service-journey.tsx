import { Calendar, BellRing, Truck, PlaneTakeoff } from "lucide-react";

const stages = [
  {
    time: "J-1",
    icon: Calendar,
    title: "Vous réservez",
    description:
      "En 2 minutes sur l'app ou directement à votre hôtel partenaire. Vous choisissez votre créneau de collecte et votre vol.",
    color: "from-primary/20 to-primary/5",
  },
  {
    time: "J — 11h",
    icon: BellRing,
    title: "Notification de collecte",
    description:
      "Vous recevez un SMS 30 min avant. La conciergerie de l'hôtel a déjà préparé vos bagages. Aucun stress.",
    color: "from-[var(--brand-gold)]/30 to-[var(--brand-gold)]/5",
  },
  {
    time: "J — 11h30",
    icon: Truck,
    title: "Transport sécurisé",
    description:
      "Notre opérateur scanne et scelle chaque bagage. Locker individuel verrouillé, GPS actif, vous suivez en temps réel.",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    time: "J — 16h",
    icon: PlaneTakeoff,
    title: "Vos bagages vous attendent",
    description:
      "Remise au comptoir d'enregistrement de votre compagnie aérienne. Vous arrivez les mains libres, vous embarquez serein.",
    color: "from-emerald-500/20 to-emerald-500/5",
  },
];

export function B2CServiceJourney() {
  return (
    <section id="parcours" className="py-20 md:py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
            Le parcours BagDrop
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--brand-charcoal)] dark:text-foreground mb-4">
            Quatre étapes, zéro effort
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Vous gérez votre journée. Nous gérons vos bagages. Tout est
            transparent, traçable, garanti.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line (desktop) */}
          <div
            className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent"
            aria-hidden="true"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stages.map((stage, i) => (
              <div key={stage.title} className="relative">
                {/* Timeline dot (desktop) */}
                <div
                  className="hidden lg:block absolute top-[26px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-4 border-background z-10"
                  aria-hidden="true"
                />

                {/* Step number bubble */}
                <div className="relative flex justify-center mb-6 lg:mb-12">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stage.color} flex items-center justify-center`}
                  >
                    <stage.icon className="h-7 w-7 text-[var(--brand-charcoal)] dark:text-foreground" />
                  </div>
                </div>

                <div className="text-center">
                  <span className="inline-block text-xs font-mono font-medium text-primary uppercase tracking-widest mb-2 px-3 py-1 rounded-full bg-primary/10">
                    {stage.time}
                  </span>
                  <h3 className="font-semibold text-lg mb-2 text-[var(--brand-charcoal)] dark:text-foreground">
                    {i + 1}. {stage.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
