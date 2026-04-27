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
    a: "Chaque bagage est assuré jusqu'à 1 500€ via notre RC professionnelle (police dédiée transport de marchandises). En cas de sinistre, votre client est indemnisé directement par notre assureur sous 15 jours, sans implication de votre établissement.",
  },
  {
    q: "Comment se déroule la mise en place ?",
    a: "Onboarding en 72h : signature du contrat-cadre, livraison de la tablette de réservation, formation de 30 min de votre équipe (réception + conciergerie), et tests grandeur nature sur 5 réservations gratuites pour valider le flux.",
  },
  {
    q: "Quel volume minimum est requis ?",
    a: "Aucun minimum sur la formule Boutique. Pour la formule Premium, nous recommandons un volume cible de 30 réservations par mois pour rentabiliser l'account manager dédié — mais ce seuil est indicatif, pas contractuel.",
  },
  {
    q: "Comment sont versées les commissions ?",
    a: "Versement mensuel par virement SEPA, le 5 du mois suivant. Vous recevez automatiquement un relevé détaillé (réservations, montants, commissions, TVA) compatible avec votre comptabilité.",
  },
  {
    q: "Pouvez-vous gérer les pics de saisonnalité ?",
    a: "Notre flotte est dimensionnée pour absorber les pics (avril-juin, septembre-octobre, fêtes de fin d'année). Engagement contractuel : aucune réservation refusée pour cause de capacité, sauf demande de dernière minute (moins de 2h avant).",
  },
  {
    q: "Le service fonctionne-t-il pour Brussels Airport et Charleroi ?",
    a: "Oui, les deux sont couverts. Pricing différencié pour Charleroi (distance plus importante). Pour les correspondances internationales, prévoyez T-3h minimum avant l'heure d'embarquement, T-4h pour Charleroi.",
  },
  {
    q: "Comment intégrez-vous avec notre PMS (Mews, Opera, Cloudbeds) ?",
    a: "API REST disponible sur la formule Premium. Intégrations natives prêtes pour Mews et Cloudbeds, en cours de développement pour Opera Cloud. Sur Boutique, la tablette dédiée fonctionne en autonomie sans intégration PMS.",
  },
];

export function B2BFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 px-6 bg-[var(--brand-cream)] dark:bg-muted/20">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-16">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--brand-cobalt)] mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-[var(--brand-cobalt)]" />
            Questions fréquentes
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-[var(--brand-ink)] dark:text-foreground leading-[1.02]">
            Tout ce que votre direction
            <br />
            <span className="text-muted-foreground">veut savoir.</span>
          </h2>
        </div>

        <div className="border-t border-border">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-border">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
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
