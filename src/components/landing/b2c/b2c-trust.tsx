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
    <section className="py-24 md:py-32 px-6 bg-[var(--brand-cream)] dark:bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 lg:mb-20">
          <div className="lg:col-span-6">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--brand-cobalt)] mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--brand-cobalt)]" />
              Confiance & sécurité
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-[var(--brand-ink)] dark:text-foreground leading-[1.02]">
              Vos bagages valent
              <br />
              <span className="text-muted-foreground">plus qu'un trajet en taxi.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 flex items-end">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              On le sait. C'est pourquoi chaque bagage confié à BagDrop
              bénéficie de quatre couches de protection, vérifiables à chaque
              étape du transport.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {guarantees.map((g) => (
            <article key={g.title} className="bg-card p-8">
              <g.icon
                strokeWidth={1.5}
                className="h-7 w-7 text-[var(--brand-cobalt)] mb-6"
              />
              <h3 className="font-bold text-lg tracking-[-0.02em] text-[var(--brand-ink)] dark:text-foreground mb-3">
                {g.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {g.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
