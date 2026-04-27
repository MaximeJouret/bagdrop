import { Star } from "lucide-react";

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
    <section className="py-24 md:py-32 px-6 bg-[var(--brand-cream)] dark:bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 lg:mb-20">
          <div className="lg:col-span-6">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--brand-cobalt)] mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--brand-cobalt)]" />
              Avis voyageurs
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-[var(--brand-ink)] dark:text-foreground leading-[1.02]">
              4,9 / 5
              <br />
              <span className="text-muted-foreground">
                sur les 50 premières réservations.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-xs text-muted-foreground/70 max-w-md">
              Données issues de notre période de test (Q1-Q2 2026). Avis
              anonymisés pour le respect de la vie privée.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {reviews.map((review) => (
            <figure
              key={review.author}
              className="bg-card p-8 md:p-10 flex flex-col"
            >
              <div
                className="flex items-center gap-1 mb-6"
                role="img"
                aria-label={`Note : ${review.rating} sur 5`}
              >
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    aria-hidden="true"
                    className="h-4 w-4 fill-[var(--brand-yellow)] text-[var(--brand-yellow)]"
                  />
                ))}
              </div>
              <blockquote className="text-base text-foreground leading-relaxed mb-8 flex-1">
                « {review.quote} »
              </blockquote>
              <figcaption className="border-t border-border pt-5">
                <p className="font-bold text-sm text-[var(--brand-ink)] dark:text-foreground">
                  {review.author}
                </p>
                <p className="text-xs text-muted-foreground">
                  {review.context}
                </p>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/70 mt-2">
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
