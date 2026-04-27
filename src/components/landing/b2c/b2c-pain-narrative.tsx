import { Clock3 } from "lucide-react";

export function B2CPainNarrative() {
  return (
    <section className="py-20 md:py-24 px-4 bg-[var(--brand-cream)] dark:bg-muted/20">
      <div className="container mx-auto max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Le scénario classique
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--brand-charcoal)] dark:text-foreground mb-6 leading-tight">
              Huit heures
              <br />
              <span className="text-muted-foreground">avec 25 kg sur le dos.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Check-out à 11h. Vol à 19h. Entre les deux, vous avez voulu
              profiter encore un peu : un dernier café au Sablon, une visite au
              musée Magritte, un repas dans le Châtelain.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Sauf que <span className="text-primary font-medium">vos
              valises sont sur votre dos</span>. Et que le casier de la gare du
              Midi, vous ne lui faites pas vraiment confiance.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-2xl" />
            <div className="relative bg-background border border-border/50 rounded-3xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Une journée type
                  </p>
                  <p className="font-semibold">Sans BagDrop</p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex gap-4">
                  <span className="font-mono text-muted-foreground w-12">
                    11:00
                  </span>
                  <span className="text-[var(--brand-charcoal)]/80 dark:text-foreground/80">
                    Check-out forcé. Bagages à la conciergerie.
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="font-mono text-muted-foreground w-12">
                    14:00
                  </span>
                  <span className="text-[var(--brand-charcoal)]/80 dark:text-foreground/80">
                    Retour à l'hôtel pour récupérer les bagages.
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="font-mono text-muted-foreground w-12">
                    14:30
                  </span>
                  <span className="text-[var(--brand-charcoal)]/80 dark:text-foreground/80">
                    Taxi vers Zaventem avec valises. ~70€.
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="font-mono text-muted-foreground w-12">
                    15:30
                  </span>
                  <span className="text-[var(--brand-charcoal)]/80 dark:text-foreground/80">
                    Trois heures à patienter à l'aéroport.
                  </span>
                </div>
                <div className="pt-4 border-t border-border/50 flex gap-4">
                  <span className="font-mono text-primary w-12 font-bold">
                    →
                  </span>
                  <span className="text-primary font-medium">
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
