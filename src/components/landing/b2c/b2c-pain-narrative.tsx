import { Clock3 } from "lucide-react";

export function B2CPainNarrative() {
  return (
    <section className="py-24 md:py-32 px-6 bg-[var(--brand-cream)] dark:bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--brand-cobalt)] mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--brand-cobalt)]" />
              Le scénario classique
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-[var(--brand-ink)] dark:text-foreground leading-[1.02] mb-8">
              Huit heures
              <br />
              <span className="text-muted-foreground">avec 25 kg sur le dos.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Check-out à 11h. Vol à 19h. Entre les deux, vous avez voulu
              profiter encore un peu : un dernier café au Sablon, une visite au
              musée Magritte, un repas dans le Châtelain.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Sauf que <span className="text-foreground font-semibold">vos
              valises sont sur votre dos</span>. Et que le casier de la gare du
              Midi, vous ne lui faites pas vraiment confiance.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
                <Clock3
                  strokeWidth={1.5}
                  className="h-6 w-6 text-[var(--brand-cobalt)]"
                />
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                    Une journée type
                  </p>
                  <p className="font-bold text-base text-[var(--brand-ink)] dark:text-foreground">
                    Sans BagDrop
                  </p>
                </div>
              </div>

              <div className="space-y-5 text-sm">
                {[
                  ["11:00", "Check-out forcé. Bagages à la conciergerie."],
                  ["14:00", "Retour à l'hôtel pour récupérer les bagages."],
                  ["14:30", "Taxi vers Zaventem avec valises. ~70€."],
                  ["15:30", "Trois heures à patienter à l'aéroport."],
                ].map(([time, desc]) => (
                  <div key={time} className="flex gap-5">
                    <span className="font-mono font-bold text-[var(--brand-cobalt)] w-14 shrink-0">
                      {time}
                    </span>
                    <span className="text-foreground/80">{desc}</span>
                  </div>
                ))}
                <div className="pt-5 mt-2 border-t border-border flex gap-5">
                  <span className="font-mono w-14 shrink-0 text-[var(--brand-cobalt)] font-bold">
                    →
                  </span>
                  <span className="font-semibold text-[var(--brand-ink)] dark:text-foreground">
                    5h utiles perdues. ~70€ de taxi inutile.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
