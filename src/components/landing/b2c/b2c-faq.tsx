"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <section id="faq" className="py-20 md:py-24 px-4 bg-background">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
            Questions fréquentes
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--brand-charcoal)] dark:text-foreground mb-4">
            Tout ce que vous voulez savoir
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/50 bg-[var(--brand-cream)]/30 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-[var(--brand-cream)]/60 transition-colors"
                aria-expanded={open === i}
              >
                <span className="font-medium text-[var(--brand-charcoal)] dark:text-foreground pr-6">
                  {faq.q}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200",
                    open === i && "rotate-180"
                  )}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
