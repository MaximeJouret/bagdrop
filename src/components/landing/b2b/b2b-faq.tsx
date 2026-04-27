"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Quelle est la responsabilité légale de notre hôtel ?",
    a: "Aucune. Dès la signature du bordereau de prise en charge par notre opérateur, BagDrop devient l'unique responsable des bagages. Notre contrat-cadre transfère explicitement la garde juridique. Vous conservez uniquement votre rôle d'apporteur d'affaires.",
  },
  {
    q: "Que se passe-t-il en cas de perte ou de dommage ?",
    a: "Chaque bagage est assuré jusqu'à 1 500€ via notre RC professionnelle. En cas de sinistre, votre client est indemnisé directement par notre assureur sous 15 jours, sans implication de votre établissement.",
  },
  {
    q: "Comment se déroule la mise en place ?",
    a: "Onboarding en 72h : signature du contrat-cadre, livraison de la tablette de réservation, formation de 30 min de votre équipe, et tests grandeur nature sur 5 réservations gratuites pour valider le flux.",
  },
  {
    q: "Quel volume minimum est requis ?",
    a: "Aucun minimum sur la formule Boutique. Pour la formule Premium, nous recommandons un volume cible de 30 réservations par mois — mais ce seuil est indicatif, pas contractuel.",
  },
  {
    q: "Comment sont versées les commissions ?",
    a: "Versement mensuel par virement SEPA, le 5 du mois suivant. Vous recevez automatiquement un relevé détaillé compatible avec votre comptabilité.",
  },
  {
    q: "Le service fonctionne-t-il pour Brussels Airport et Charleroi ?",
    a: "Oui, les deux sont couverts. Pricing différencié pour Charleroi (distance plus importante). Pour les correspondances internationales, prévoyez T-3h minimum avant l'heure d'embarquement, T-4h pour Charleroi.",
  },
  {
    q: "Comment intégrez-vous avec notre PMS (Mews, Opera, Cloudbeds) ?",
    a: "API REST disponible sur la formule Premium. Intégrations natives prêtes pour Mews et Cloudbeds, en cours de développement pour Opera Cloud. Sur Boutique, la tablette dédiée fonctionne en autonomie.",
  },
];

export function B2BFAQ() {
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
