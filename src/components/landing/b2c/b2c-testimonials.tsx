import { Star } from "lucide-react";

const reviews = [
  {
    rating: 5,
    quote:
      "J'ai pu profiter de mon dernier après-midi à Bruxelles au lieu de traîner mes valises. Service impeccable.",
    author: "Émilie R.",
    context: "Voyage d'affaires · Hôtel Sablon",
  },
  {
    rating: 5,
    quote:
      "Arrivée Eurostar à 9h, première réunion à 10h30. Sans BagDrop j'aurais dû gérer ma valise toute la journée.",
    author: "Sarah M.",
    context: "Voyage d'affaires · UK",
  },
  {
    rating: 5,
    quote:
      "Le tracking GPS et les photos rassurent vraiment. Service nickel.",
    author: "Marc & Laurence D.",
    context: "Voyage en couple · France",
  },
];

export function B2CTestimonials() {
  return (
    <section className="py-32 md:py-48 px-6 bg-[var(--brand-cream)] dark:bg-muted/20">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-20 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] text-[var(--brand-ink)] dark:text-foreground leading-[1.1]">
            4,9 / 5
            <br />
            <span className="text-muted-foreground">sur 50 premières réservations.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-10">
          {reviews.map((review) => (
            <figure key={review.author} className="text-center md:text-left">
              <div
                className="flex items-center justify-center md:justify-start gap-1 mb-5"
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
              <blockquote className="text-base md:text-lg text-foreground leading-relaxed mb-6">
                « {review.quote} »
              </blockquote>
              <figcaption>
                <p className="font-semibold text-sm text-[var(--brand-ink)] dark:text-foreground">
                  {review.author}
                </p>
                <p className="text-sm text-muted-foreground">{review.context}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
