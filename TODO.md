# 🚀 BagDrop — Checklist Go-Live

Liste de tout ce qui est **placeholder / fictif** dans le site v0 et qui
doit être remplacé avant le lancement réel.

> Coche au fur et à mesure. Quand tout est ✅, on est prêts à passer en
> production avec des vrais clients.

---

## 🗺 Carte du réseau

- [ ] **Remplacer les hôtels placeholders** dans `src/data/network-points.ts`
  - 8 hôtels fictifs à remplacer par tes vrais partenaires signés
  - Garder les coordonnées lat/lng exactes (Google Maps → clic droit → "Coordonnées")
  - Garder les 2 entrées `type: "airport"` intactes
  - Une fois fait → la carte se met à jour automatiquement sur B2B et B2C

## 📞 Contact & coordonnées

- [ ] **Numéro de téléphone** dans `src/components/landing/b2b/b2b-final-cta.tsx`
  - Actuellement : `+32 483 00 00 00` (fictif)
  - Remplacer par le vrai numéro pro
- [ ] **Email** dans `src/components/layout/footer.tsx`
  - Actuellement : `hello@bagdrop.be`
  - Confirmer ou remplacer par l'email pro réel

## 💬 Témoignages

- [ ] **Avis voyageurs** dans `src/components/landing/b2c/b2c-testimonials.tsx`
  - Actuellement : 3 témoignages anonymisés fictifs (Émilie R., Sarah M., Marc & Laurence D.)
  - Remplacer par de vrais avis collectés pendant la phase bêta
- [ ] **Note 4,9/5** dans la même section
  - Actuellement : "4,9 / 5 sur 50 premières réservations"
  - Recalculer et mettre la vraie note à jour quand on aura les premières opérations

## 🎟 Code promo

- [ ] **Code BIENVENUE -20%** dans `src/components/landing/b2c/b2c-final-cta.tsx`
  - Configurer ce code dans Stripe quand tu actives les paiements
  - Ou changer pour un code différent

## 🏷 Status badge

- [ ] **"Pré-lancement · 2026"** dans les hero B2B et B2C
  - À retirer ou remplacer par "● En service" une fois le lancement effectué
  - Fichiers : `src/components/landing/b2b/b2b-hero.tsx`, `src/components/landing/b2c/b2c-hero.tsx`

## 📊 Statistiques

- [ ] **Stats marché** dans `src/components/landing/b2b/b2b-stats-bar.tsx`
  - 31M passagers, 8,5M nuitées, 62% business, +8% croissance
  - Ces chiffres sont approximatifs (basés sur visit.brussels et données 2024)
  - À mettre à jour avec les chiffres officiels les plus récents (rapport visit.brussels)

## 🔗 Réseaux sociaux

- [ ] **Liens sociaux** (à ajouter quand les comptes existeront)
  - Pas encore présents dans le footer (volontairement)
  - Quand tu créeras Instagram / LinkedIn / YouTube, les ajouter dans `src/components/layout/footer.tsx`

## 🏢 Mentions légales

- [ ] **Pages légales** (vides actuellement)
  - `/mentions-legales` → SRL, n° BCE, siège social, hébergeur
  - `/conditions-generales` → CGV opérateur de transport
  - `/confidentialite` → RGPD, sous-traitants (Stripe, Supabase, Vercel, Resend)
- [ ] **"BagDrop SRL"** dans `src/components/layout/footer.tsx`
  - Mettre à jour si la forme juridique change (SRL / SASU / SAS / etc.)

## 🌐 Domaine & branding

- [ ] **Acheter `bagdrop.be`** (ou autre TLD)
  - Actuellement servi sur `bagdrop-seven.vercel.app`
  - Configurer le DNS pour pointer vers Vercel
- [ ] **Email Resend** sur le bon domaine
  - Vérifier le sender domain dans Resend une fois `bagdrop.be` actif

## 💳 Paiements & API

- [ ] **Stripe en mode LIVE** (actuellement test)
  - `STRIPE_SECRET_KEY` et `STRIPE_PUBLISHABLE_KEY` à passer en `sk_live_...` / `pk_live_...`
  - Configurer les webhooks Stripe en production
- [ ] **Resend** : domaine vérifié pour les emails de confirmation

## 📄 Misc

- [ ] **Composant route illustration** : `src/components/landing/b2b/b2b-route-illustration.tsx`
  - Existe mais pas utilisé actuellement (retiré de la home Apple-style)
  - Soit supprimer, soit réintégrer ailleurs (page À propos ?)
- [ ] **Vraies photos** quand on aura :
  - Photo de la camionnette BagDrop
  - Photos d'opération (collecte hôtel, scellage, livraison aéroport)
  - Photos team (cofondateurs)
