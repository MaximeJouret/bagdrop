import { Plane, MapPin } from "lucide-react";

const airports = [
  {
    code: "BRU",
    name: "Brussels Airport",
    city: "Zaventem",
    distance: "12 km",
    duration: "20-35 min",
    passengers: "22,7M / an",
    primary: true,
  },
  {
    code: "CRL",
    name: "Brussels South",
    city: "Charleroi",
    distance: "55 km",
    duration: "55-70 min",
    passengers: "8,5M / an",
    primary: false,
  },
];

const zones = [
  "Centre historique (Grand-Place, Sablon)",
  "Quartier européen (Schuman, Luxembourg)",
  "Louise / Avenue Louise",
  "Quartier Nord / Gare du Midi",
  "Saint-Gilles / Châtelain",
  "Tour & Taxis / Canal",
];

export function B2BCoverage() {
  return (
    <section id="couverture" className="py-20 md:py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
            Zone de service
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--brand-charcoal)] dark:text-foreground mb-4">
            Tout Bruxelles, deux aéroports
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Une couverture pensée pour les hôtels du centre et du quartier
            européen, avec deux destinations aéroportuaires.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {airports.map((airport) => (
            <div
              key={airport.code}
              className={`relative rounded-2xl border p-7 ${
                airport.primary
                  ? "border-primary/30 bg-[var(--brand-cream)]/30"
                  : "border-border/50 bg-background"
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
                    {airport.code}
                  </span>
                  <h3 className="text-2xl font-bold text-[var(--brand-charcoal)] dark:text-foreground mt-1">
                    {airport.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{airport.city}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Plane className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/50">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Distance</p>
                  <p className="font-mono font-semibold">{airport.distance}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Trajet</p>
                  <p className="font-mono font-semibold">{airport.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Trafic</p>
                  <p className="font-mono font-semibold">{airport.passengers}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border/50 bg-background p-7">
          <div className="flex items-center gap-3 mb-5">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg text-[var(--brand-charcoal)] dark:text-foreground">
              Zones de collecte couvertes
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {zones.map((zone) => (
              <div
                key={zone}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {zone}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/70 mt-5 pt-5 border-t border-border/50 italic">
            Hors zone ? Contactez-nous pour évaluer la faisabilité.
          </p>
        </div>
      </div>
    </section>
  );
}
