import { ShieldCheck, MapPin, Lock, Camera } from "lucide-react";

const guarantees = [
  {
    icon: ShieldCheck,
    title: "Assurance 1 500€",
    description:
      "Chaque bagage est couvert dès la prise en charge jusqu'à la remise finale. Indemnisation sous 15 jours en cas de sinistre.",
  },
  {
    icon: MapPin,
    title: "GPS temps réel",
    description:
      "Vous suivez votre bagage minute par minute via notre app. Notifications automatiques à chaque étape clé.",
  },
  {
    icon: Lock,
    title: "Lockers scellés",
    description:
      "Chaque compartiment est verrouillé individuellement. Numéro de scellé unique remis lors de la collecte, vérifié à la livraison.",
  },
  {
    icon: Camera,
    title: "Photo de remise",
    description:
      "Photo horodatée à chaque transmission de garde. Preuve d'état du bagage à la collecte et à la livraison.",
  },
];

export function B2CTrust() {
  return (
    <section className="py-20 md:py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
            Confiance & sécurité
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--brand-charcoal)] dark:text-foreground mb-4">
            Vos bagages valent plus qu'un trajet en taxi
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            On le sait. C'est pourquoi chaque bagage confié à BagDrop bénéficie
            de quatre couches de protection.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((g) => (
            <div
              key={g.title}
              className="text-center p-6 rounded-2xl border border-border/50 bg-[var(--brand-cream)]/30 hover:bg-[var(--brand-cream)]/60 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <g.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-base mb-2 text-[var(--brand-charcoal)] dark:text-foreground">
                {g.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {g.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
