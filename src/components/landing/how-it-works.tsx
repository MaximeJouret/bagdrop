import { MapPinned, CreditCard, ScanLine } from "lucide-react";

const steps = [
  {
    icon: MapPinned,
    title: "Choisissez un emplacement",
    description:
      "Selectionnez le casier le plus proche sur la carte interactive.",
  },
  {
    icon: CreditCard,
    title: "Reservez et payez",
    description:
      "Choisissez la taille et la duree. Paiement securise en ligne.",
  },
  {
    icon: ScanLine,
    title: "Deposez vos bagages",
    description:
      "Presentez votre QR code au casier. Recuperez vos affaires quand vous voulez.",
  },
];

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-14">
          Comment ca marche
        </h2>
        <div className="relative grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Connecting line (desktop only) */}
          <div
            className="hidden md:block absolute top-10 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-border"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <div key={step.title} className="relative text-center">
              <div className="relative z-10 mx-auto mb-5 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="inline-block text-xs font-mono font-medium text-primary/60 uppercase tracking-widest mb-2">
                Etape {i + 1}
              </span>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
