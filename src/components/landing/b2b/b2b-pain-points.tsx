import { Card, CardContent } from "@/components/ui/card";
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
    <section className="py-20 md:py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
            Le problème
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--brand-charcoal)] dark:text-foreground mb-4">
            Les bagages, l'angle mort
            <br />
            <span className="text-muted-foreground">
              de la fin de séjour.
            </span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Chaque jour, vos clients quittent leur chambre en milieu de matinée
            pour un vol en fin de journée. Entre les deux, leurs bagages
            deviennent votre problème.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((point, i) => (
            <Card
              key={point.problem}
              className="relative overflow-hidden border-border/50 hover:border-primary/30 transition-colors"
            >
              <CardContent className="p-7">
                <span className="absolute top-4 right-4 text-xs font-mono text-muted-foreground/40">
                  0{i + 1}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <point.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[var(--brand-charcoal)] dark:text-foreground">
                  {point.problem}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {point.description}
                </p>
                <p className="text-sm font-medium text-primary border-t border-border/50 pt-4">
                  → {point.solution}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
