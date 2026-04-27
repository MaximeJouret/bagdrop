"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
    a: "Aucun minimum sur la formule Boutique. Pour la formule Premium, nous recommandons un volume cible de 30 réservations/mois pour rentabiliser l'account manager dédié — mais ce seuil est indicatif, pas contractuel.",
  },
  {
    q: "Comment sont versées les commissions ?",
    a: "Versement mensuel par virement SEPA, le 5 du mois suivant. Vous recevez automatiquement un relevé détaillé (réservations, montants, commissions, TVA) compatible avec votre comptabilité.",
  },
  {
    q: "Pouvez-vous gérer les pics de saisonnalité ?",
    a: "Notre flotte est dimensionnée pour absorber les pics (avril-juin, septembre-octobre, fêtes de fin d'année). Engagement contractuel : aucune réservation refusée pour cause de capacité, sauf demande de dernière minute (< 2h avant).",
  },
  {
    q: "Le service fonctionne-t-il pour Brussels Airport et Charleroi ?",
    a: "Oui, les deux sont couverts. Pricing différencié pour Charleroi (distance plus importante). Pour les correspondances internationales, prévoyez T-3h minimum avant l'heure d'embarquement, T-4h pour Charleroi.",
  },
  {
    q: "Comment intégrez-vous avec notre PMS (Mews, Opera, Cloudbeds...) ?",
    a: "API REST disponible sur la formule Premium. Intégrations natives prêtes pour Mews et Cloudbeds, en cours de développement pour Opera Cloud. Sur Boutique, la tablette dédiée fonctionne en autonomie sans intégration PMS.",
  },
];

export function B2BFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-24 px-4 bg-[var(--brand-cream)] dark:bg-muted/20">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
            Questions fréquentes
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--brand-charcoal)] dark:text-foreground mb-4">
            Tout ce que votre direction veut savoir
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/50 bg-background overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-[var(--brand-cream)]/40 transition-colors"
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
