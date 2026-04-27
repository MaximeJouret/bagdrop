import { Star, Quote } from "lucide-react";

const reviews = [
  {
    rating: 5,
    quote:
      "J'ai pu profiter de mon dernier après-midi à Bruxelles au lieu de traîner mes valises. Service impeccable, livraison à l'heure exacte au comptoir Brussels Airlines.",
    author: "Émilie R.",
    context: "Voyage d'affaires · Hôtel Sablon",
    date: "Mars 2026",
  },
  {
    rating: 5,
    quote:
      "Arrivée Eurostar de Londres à 9h, première réunion à 10h30. Sans BagDrop j'aurais dû gérer ma valise toute la journée. Là, je suis allée directement au bureau.",
    author: "Sarah M.",
    context: "Voyage d'affaires · UK",
    date: "Février 2026",
  },
  {
    rating: 5,
    quote:
      "On était sceptiques au départ — confier ses bagages à des inconnus, ça inquiète. Mais le tracking GPS et les photos rassurent vraiment. Service nickel.",
    author: "Marc & Laurence D.",
    context: "Voyage en couple · France",
    date: "Avril 2026",
  },
];

export function B2CTestimonials() {
  return (
    <section className="py-20 md:py-24 px-4 bg-[var(--brand-cream)] dark:bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
            Avis voyageurs
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--brand-charcoal)] dark:text-foreground mb-4">
            4,9/5 sur les 50 premières réservations
          </h2>
          <p className="text-xs text-muted-foreground/70 italic max-w-md mx-auto">
            Données issues de notre période de test (Q1-Q2 2026). Avis
            anonymisés pour le respect de la vie privée.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <figure
              key={review.author}
              className="rounded-2xl border border-border/50 bg-background p-7"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[var(--brand-gold)] text-[var(--brand-gold)]"
                  />
                ))}
              </div>
              <Quote className="h-5 w-5 text-primary/30 mb-3" />
              <blockquote className="text-sm text-[var(--brand-charcoal)]/90 dark:text-foreground/90 leading-relaxed mb-5 italic">
                « {review.quote} »
              </blockquote>
              <figcaption className="border-t border-border/50 pt-4">
                <p className="font-semibold text-sm text-[var(--brand-charcoal)] dark:text-foreground">
                  {review.author}
                </p>
                <p className="text-xs text-muted-foreground">
                  {review.context}
                </p>
                <p className="text-xs font-mono text-muted-foreground/70 mt-1">
                  {review.date}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
