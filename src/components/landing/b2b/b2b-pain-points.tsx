import { PackageX, Clock, Star } from "lucide-react";

const painPoints = [
  {
    icon: PackageX,
    problem: "Conciergerie saturée",
    description:
      "Vos espaces de stockage débordent en haute saison. Bagages empilés, équipe sollicitée, responsabilité engagée.",
    solution: "Délestage immédiat dès 11h.",
  },
  {
    icon: Clock,
    problem: "Le creux de l'après-midi",
    description:
      "Check-out à 11h, vol à 19h : vos clients reviennent à 16h récupérer leurs bagages, encombrent le lobby, partent en taxi cher.",
    solution: "Pickup unique, livraison directe.",
  },
  {
    icon: Star,
    problem: "Score Booking en jeu",
    description:
      "Une mauvaise expérience de fin de séjour, c'est une note moyenne qui descend. Et un guest qui ne reviendra pas.",
    solution: "Service premium qui marque.",
  },
];

export function B2BPainPoints() {
  return (
    <section className="py-24 md:py-32 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 lg:mb-20">
          <div className="lg:col-span-6">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--brand-cobalt)] mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--brand-cobalt)]" />
              Le problème
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-[var(--brand-ink)] dark:text-foreground leading-[1.02]">
              Les bagages,
              <br />
              <span className="text-muted-foreground">l'angle mort</span>
              <br />
              de la fin de séjour.
            </h2>
          </div>
          <div className="lg:col-span-6 flex items-end">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Chaque jour, vos clients quittent leur chambre en milieu de
              matinée pour un vol en fin de journée. Entre les deux, leurs
              bagages deviennent <span className="text-foreground font-semibold">votre</span> problème.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {painPoints.map((point, i) => (
            <article
              key={point.problem}
              className="bg-card p-8 md:p-10 flex flex-col group hover:bg-[var(--brand-cream)] transition-colors"
            >
              <span className="text-xs font-mono text-[var(--brand-cobalt)] mb-8 font-semibold">
                0{i + 1} / 03
              </span>
              <point.icon
                strokeWidth={1.5}
                className="h-7 w-7 text-[var(--brand-cobalt)] mb-6"
              />
              <h3 className="text-2xl md:text-3xl font-bold tracking-[-0.025em] text-[var(--brand-ink)] dark:text-foreground mb-4 leading-tight">
                {point.problem}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-1">
                {point.description}
              </p>
              <p className="text-sm font-semibold text-[var(--brand-cobalt)] border-t border-border pt-5 flex items-center gap-2">
                <span>→</span>
                {point.solution}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
