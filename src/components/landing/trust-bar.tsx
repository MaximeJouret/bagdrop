import { MapPin, Luggage, Star, ShieldCheck } from "lucide-react";

const metrics = [
  { icon: MapPin, value: "5", label: "emplacements" },
  { icon: Luggage, value: "1 200+", label: "bagages stockes" },
  { icon: Star, value: "4.9/5", label: "satisfaction" },
  { icon: ShieldCheck, value: "100%", label: "assurance incluse" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border/50 bg-[var(--brand-cream)] dark:bg-muted/30 py-5 px-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {metrics.map((m) => (
            <div key={m.label} className="flex items-center gap-2.5">
              <m.icon className="h-4 w-4 text-primary shrink-0" />
              <span className="font-mono font-semibold text-sm tracking-tight">
                {m.value}
              </span>
              <span className="text-sm text-muted-foreground">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
