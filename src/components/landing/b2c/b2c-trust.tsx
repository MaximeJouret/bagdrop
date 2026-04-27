import { ShieldCheck, MapPin, Lock, Camera } from "lucide-react";

const guarantees = [
  {
    icon: ShieldCheck,
    title: "Assurance 1 500€",
    description:
      "Couverture intégrale dès la prise en charge. Indemnisation sous 15 jours.",
  },
  {
    icon: MapPin,
    title: "GPS temps réel",
    description:
      "Suivi minute par minute. Notifications automatiques à chaque étape.",
  },
  {
    icon: Lock,
    title: "Lockers scellés",
    description:
      "Numéro de scellé unique remis à la collecte, vérifié à la livraison.",
  },
  {
    icon: Camera,
    title: "Photo de remise",
    description:
      "Photo horodatée à la collecte et à la livraison. Preuve d'état du bagage.",
  },
];

export function B2CTrust() {
  return (
    <section className="py-32 md:py-48 px-6 bg-[var(--brand-cream)] dark:bg-muted/20">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-20 md:mb-28 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] text-[var(--brand-ink)] dark:text-foreground leading-[1.1]">
            Vos bagages valent plus
            <br />
            <span className="text-muted-foreground">qu'un trajet en taxi.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10">
          {guarantees.map((g) => (
            <div key={g.title} className="text-center md:text-left">
              <g.icon
                strokeWidth={1.25}
                className="h-7 w-7 text-[var(--brand-cobalt)] mb-5 mx-auto md:mx-0"
              />
              <h3 className="text-lg md:text-xl font-semibold tracking-tight text-[var(--brand-ink)] dark:text-foreground mb-3">
                {g.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {g.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
