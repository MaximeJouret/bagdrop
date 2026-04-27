import { Plane, Building2, Users, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Plane,
    value: "31M",
    label: "Passagers/an aux aéroports belges",
    sublabel: "Zaventem + Charleroi",
  },
  {
    icon: Building2,
    value: "8,5M",
    label: "Nuitées hôtelières à Bruxelles",
    sublabel: "Sources : visit.brussels",
  },
  {
    icon: Users,
    value: "62%",
    label: "Voyageurs business",
    sublabel: "Premier marché européen",
  },
  {
    icon: TrendingUp,
    value: "+8%",
    label: "Croissance tourisme annuelle",
    sublabel: "Projection 2025-2030",
  },
];

export function B2BStatsBar() {
  return (
    <section className="border-y bg-[var(--brand-charcoal)] text-[var(--brand-cream)] py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <p className="text-xs font-mono tracking-widest uppercase text-[var(--brand-gold)] text-center mb-6">
          Le marché bruxellois en chiffres
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-gold)]/15 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-[var(--brand-gold)]" />
                </div>
              </div>
              <p className="text-3xl md:text-4xl font-bold font-mono mb-1">
                {stat.value}
              </p>
              <p className="text-sm font-medium leading-tight">{stat.label}</p>
              <p className="text-xs text-[var(--brand-cream)]/60 mt-1">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
