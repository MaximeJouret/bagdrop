import { PackageX, Clock, Star } from "lucide-react";

const painPoints = [
  {
    icon: PackageX,
    problem: "Conciergerie saturée",
    description:
      "Vos espaces de stockage débordent en haute saison. On les libère.",
  },
  {
    icon: Clock,
    problem: "Le creux de l'après-midi",
    description:
      "Vos clients reviennent à 16h récupérer leurs bagages. On les emmène directement à l'aéroport.",
  },
  {
    icon: Star,
    problem: "Votre note Booking en jeu",
    description:
      "Une mauvaise fin de séjour, c'est une note moyenne qui descend. On la protège.",
  },
];

export function B2BPainPoints() {
  return (
    <section className="py-32 md:py-48 px-6 bg-[var(--brand-cream)] dark:bg-muted/20">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-20 md:mb-32 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] text-[var(--brand-ink)] dark:text-foreground leading-[1.1]">
            Les bagages sont
            <br />
            <span className="text-muted-foreground">l'angle mort de la fin de séjour.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {painPoints.map((point) => (
            <div key={point.problem} className="text-center">
              <div className="inline-flex items-center justify-center mb-6">
                <point.icon
                  strokeWidth={1.25}
                  className="h-8 w-8 text-[var(--brand-cobalt)]"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--brand-ink)] dark:text-foreground mb-3">
                {point.problem}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
