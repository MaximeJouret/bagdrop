"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "À quelle heure dois-je réserver pour un vol le même jour ?",
    a: "Au minimum 4h avant l'heure de décollage pour Brussels Airport (BRU), 5h pour Charleroi (CRL). Cela nous laisse le temps de collecter vos bagages, les transporter, et les remettre au comptoir d'enregistrement avant la fermeture.",
  },
  {
    q: "Quels sont les bagages acceptés ?",
    a: "Toutes les valises et sacs jusqu'à 32 kg et 158 cm (L+l+H) — soit les standards des compagnies aériennes. Sacs de golf, instruments de musique, vélos pliés acceptés sur demande (supplément). Pas d'animaux vivants ni de matières dangereuses.",
  },
  {
    q: "Que se passe-t-il si mon vol est en retard ou annulé ?",
    a: "Pour les livraisons aéroport→hôtel, vos bagages restent en transit dans nos lockers sécurisés et nous nous adaptons à votre nouvelle heure d'arrivée sans frais. Pour les livraisons hôtel→aéroport, contactez notre support 7j/7 pour replanifier.",
  },
  {
    q: "Pouvez-vous remettre mes bagages directement à l'enregistrement ?",
    a: "Réglementairement, l'enregistrement définitif au sein du système IATA doit être effectué par vous-même (passeport + billet). Nous remettons vos bagages au comptoir de votre compagnie au moment de votre arrivée, où vous finalisez l'enregistrement en quelques minutes.",
  },
  {
    q: "Mon hôtel n'est pas partenaire BagDrop. Puis-je quand même utiliser le service ?",
    a: "Oui. Nous pouvons effectuer la collecte directement à la réception de n'importe quel hôtel bruxellois, à condition que celui-ci accepte la prise en charge. Si votre hôtel refuse, nous proposons un point de collecte alternatif à proximité.",
  },
  {
    q: "Comment se passe le paiement ?",
    a: "Paiement sécurisé en ligne lors de la réservation (carte bancaire, Apple Pay, Google Pay, Bancontact). Aucun dépôt de garantie. Annulation gratuite jusqu'à 6h avant la collecte. Au-delà, 50% de frais de service retenus.",
  },
  {
    q: "Puis-je réserver depuis l'étranger ?",
    a: "Bien sûr. Notre plateforme est disponible en français, anglais et néerlandais. Le paiement accepte les cartes internationales. Le service est particulièrement utilisé par les voyageurs Eurostar (Londres, Paris, Amsterdam) et la clientèle business internationale.",
  },
  {
    q: "Combien de bagages puis-je faire transporter en une seule réservation ?",
    a: "Jusqu'à 6 bagages par réservation (1 inclus + 5 supplémentaires). Au-delà, contactez notre support pour un devis groupe ou famille nombreuse. Tarif dégressif au-delà de 4 bagages.",
  },
];

export function B2CFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 px-6 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-16">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--brand-cobalt)] mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-[var(--brand-cobalt)]" />
            Questions fréquentes
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-[var(--brand-ink)] dark:text-foreground leading-[1.02]">
            Vos questions,
            <br />
            <span className="text-muted-foreground">nos réponses.</span>
          </h2>
        </div>

        <div className="border-t border-border">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-border">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cobalt)] focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg font-semibold text-[var(--brand-ink)] dark:text-foreground group-hover:text-[var(--brand-cobalt)] transition-colors">
                    {faq.q}
                  </span>
                  <span className="shrink-0 w-9 h-9 rounded-full border border-border flex items-center justify-center group-hover:border-[var(--brand-cobalt)] group-hover:bg-[var(--brand-cobalt)] transition-all">
                    {isOpen ? (
                      <Minus className="h-3.5 w-3.5 text-[var(--brand-cobalt)] group-hover:text-white" />
                    ) : (
                      <Plus className="h-3.5 w-3.5 text-foreground group-hover:text-white" />
                    )}
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-6 text-base text-muted-foreground leading-relaxed pr-14 max-w-3xl">
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
