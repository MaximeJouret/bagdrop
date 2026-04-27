import { Plane } from "lucide-react";

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
  "Centre historique · Grand-Place, Sablon",
  "Quartier européen · Schuman, Luxembourg",
  "Louise · Avenue Louise",
  "Quartier Nord · Gare du Midi",
  "Saint-Gilles · Châtelain",
  "Tour & Taxis · Canal",
];

export function B2BCoverage() {
  return (
    <section
      id="couverture"
      className="py-24 md:py-32 px-6 bg-background"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 lg:mb-20 max-w-3xl">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--brand-cobalt)] mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-[var(--brand-cobalt)]" />
            Zone de service
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-[var(--brand-ink)] dark:text-foreground leading-[1.02]">
            Tout Bruxelles,
            <br />
            <span className="text-[var(--brand-cobalt)]">deux aéroports.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border border-border mb-px">
          {airports.map((airport) => (
            <article
              key={airport.code}
              className="bg-card p-10 md:p-12"
            >
              <div className="flex items-start justify-between mb-10">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--brand-cobalt)] font-semibold">
                    Aéroport · {airport.code}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[var(--brand-ink)] dark:text-foreground mt-3">
                    {airport.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {airport.city}
                  </p>
                </div>
                <Plane
                  strokeWidth={1.25}
                  className={`h-7 w-7 ${
                    airport.primary
                      ? "text-[var(--brand-cobalt)]"
                      : "text-muted-foreground"
                  }`}
                />
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                <Metric label="Distance" value={airport.distance} />
                <Metric label="Trajet" value={airport.duration} />
                <Metric label="Trafic" value={airport.passengers} />
              </div>
            </article>
          ))}
        </div>

        <div className="bg-card border border-border border-t-0 rounded-b-2xl p-10 md:p-12">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--brand-cobalt)] font-semibold mb-5">
            Zones de collecte
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
            {zones.map((zone) => (
              <p
                key={zone}
                className="text-sm text-foreground border-b border-border pb-3"
              >
                {zone}
              </p>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/70 mt-6">
            Hors zone ? Contactez-nous pour évaluer la faisabilité.
          </p>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
        {label}
      </p>
      <p className="font-mono text-base font-bold text-foreground">{value}</p>
    </div>
  );
}
