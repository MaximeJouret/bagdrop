import { Coins, ShieldCheck, Smile, Zap, BarChart3, Headphones } from "lucide-react";

const benefits = [
  {
    icon: Coins,
    title: "Nouveau revenu passif",
    description:
      "15% de commission sur chaque réservation initiée par votre établissement. Sans investissement, sans gestion.",
  },
  {
    icon: ShieldCheck,
    title: "Responsabilité transférée",
    description:
      "Dès la prise en charge, BagDrop est seul responsable. Bagages assurés, contrat clair, aucune zone grise.",
  },
  {
    icon: Smile,
    title: "Satisfaction client +",
    description:
      "Service haut de gamme inclus dans votre offre. Vos avis Booking et TripAdvisor en bénéficient directement.",
  },
  {
    icon: Zap,
    title: "Mise en place express",
    description:
      "Onboarding en 72h. Formation de votre équipe en 30 minutes. Tablette de réservation fournie gratuitement.",
  },
  {
    icon: BarChart3,
    title: "Tableau de bord dédié",
    description:
      "Suivi en temps réel des collectes, statistiques de revenus, exports comptables mensuels automatiques.",
  },
  {
    icon: Headphones,
    title: "Support 7j/7",
    description:
      "Une ligne directe pour votre conciergerie. Un interlocuteur dédié pendant toute la durée du partenariat.",
  },
];

export function B2BBenefits() {
  return (
    <section className="py-20 md:py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
            Les bénéfices
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--brand-charcoal)] dark:text-foreground mb-4">
            Ce que vous y gagnez
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Un service qui s'aligne sur les standards de l'hôtellerie premium,
            avec un modèle économique transparent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="p-6 rounded-2xl border border-border/50 bg-background hover:bg-[var(--brand-cream)]/30 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <benefit.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-base mb-2 text-[var(--brand-charcoal)] dark:text-foreground">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
