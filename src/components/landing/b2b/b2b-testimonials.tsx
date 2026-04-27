import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "On a libéré 4 m² de stockage et nos clients adorent. Le ROI a été immédiat sur les commissions, mais c'est surtout sur les avis Booking que l'impact se voit.",
    author: "M. Verbeke",
    role: "Directeur d'hébergement",
    hotel: "Hôtel 4★ — Centre",
    note: "Partenaire depuis Q1 2026",
  },
  {
    quote:
      "Notre conciergerie passait des heures à gérer des bagages. Aujourd'hui, c'est un service premium qu'on offre, pas une corvée qu'on subit. La différence est culturelle.",
    author: "C. Dewinter",
    role: "Cheffe de réception",
    hotel: "Boutique-hôtel — Sablon",
    note: "Partenaire depuis Q2 2026",
  },
  {
    quote:
      "Pour nos guests business qui filent à Zaventem entre deux meetings, c'est devenu un argument commercial. Notre commercial events l'a inclus dans son pitch entreprises.",
    author: "L. Janssens",
    role: "General Manager",
    hotel: "Hôtel d'affaires — Quartier européen",
    note: "Partenaire depuis Q1 2026",
  },
];

export function B2BTestimonials() {
  return (
    <section className="py-20 md:py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
            Ils nous font confiance
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--brand-charcoal)] dark:text-foreground mb-4">
            La parole à nos partenaires
          </h2>
          <p className="text-xs text-muted-foreground/70 italic max-w-md mx-auto">
            Retours anonymisés à la demande de nos partenaires en phase de
            lancement.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.author}
              className="rounded-2xl border border-border/50 bg-[var(--brand-cream)]/30 p-7 flex flex-col"
            >
              <Quote className="h-7 w-7 text-primary/30 mb-4" />
              <blockquote className="text-sm text-[var(--brand-charcoal)]/90 dark:text-foreground/90 leading-relaxed mb-6 flex-1 italic">
                « {t.quote} »
              </blockquote>
              <figcaption className="border-t border-border/50 pt-4">
                <p className="font-semibold text-sm text-[var(--brand-charcoal)] dark:text-foreground">
                  {t.author}
                </p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
                <p className="text-xs text-muted-foreground">{t.hotel}</p>
                <p className="text-xs font-mono text-primary/70 mt-2">
                  {t.note}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
