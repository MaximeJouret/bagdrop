"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "À quelle heure dois-je réserver pour un vol le même jour ?",
    a: "Au minimum 4h avant l'heure de décollage pour Brussels Airport (BRU), 5h pour Charleroi (CRL).",
  },
  {
    q: "Quels sont les bagages acceptés ?",
    a: "Toutes les valises et sacs jusqu'à 32 kg et 158 cm (L+l+H). Sacs de golf, instruments de musique, vélos pliés acceptés sur demande. Pas d'animaux vivants ni de matières dangereuses.",
  },
  {
    q: "Que se passe-t-il si mon vol est en retard ou annulé ?",
    a: "Pour les livraisons aéroport→hôtel, vos bagages restent en transit dans nos lockers sécurisés. Pour les livraisons hôtel→aéroport, contactez notre support 7j/7 pour replanifier.",
  },
  {
    q: "Pouvez-vous remettre mes bagages directement à l'enregistrement ?",
    a: "Réglementairement, l'enregistrement définitif IATA doit être effectué par vous-même. Nous remettons vos bagages au comptoir de votre compagnie au moment de votre arrivée.",
  },
  {
    q: "Mon hôtel n'est pas partenaire BagDrop. Puis-je quand même utiliser le service ?",
    a: "Oui. Nous pouvons effectuer la collecte directement à la réception de n'importe quel hôtel bruxellois, à condition que celui-ci accepte la prise en charge.",
  },
  {
    q: "Comment se passe le paiement ?",
    a: "Paiement sécurisé en ligne lors de la réservation (carte, Apple Pay, Google Pay, Bancontact). Annulation gratuite jusqu'à 6h avant la collecte.",
  },
  {
    q: "Puis-je réserver depuis l'étranger ?",
    a: "Bien sûr. Plateforme en français, anglais et néerlandais. Cartes internationales acceptées. Service utilisé majoritairement par les voyageurs Eurostar (Londres, Paris, Amsterdam) et la clientèle business internationale.",
  },
  {
    q: "Combien de bagages puis-je faire transporter en une seule réservation ?",
    a: "Jusqu'à 6 bagages par réservation (1 inclus + 5 supplémentaires). Au-delà, contactez notre support pour un devis groupe ou famille nombreuse.",
  },
];

export function B2CFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 md:py-48 px-6 bg-background">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-20 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] text-[var(--brand-ink)] dark:text-foreground leading-[1.1]">
            Vos questions,
            <br />
            <span className="text-muted-foreground">nos réponses.</span>
          </h2>
        </div>

        <div>
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-t border-border last:border-b">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-8 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cobalt)] focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg md:text-xl font-medium text-[var(--brand-ink)] dark:text-foreground">
                    {faq.q}
                  </span>
                  <span className="shrink-0">
                    {isOpen ? (
                      <Minus className="h-5 w-5 text-[var(--brand-cobalt)]" />
                    ) : (
                      <Plus className="h-5 w-5 text-foreground" />
                    )}
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-8 text-base md:text-lg text-muted-foreground leading-relaxed pr-12 max-w-3xl">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
