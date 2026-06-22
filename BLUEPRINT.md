# 🏗 BagDrop — Blueprint multi-agents

> Document généré par le système d'agents (Brief Maître + Agents 1-5).
> Source de vérité pour l'évolution du produit. À mettre à jour à chaque
> jalon majeur.

## Décisions stratégiques (résumées)

| Question | Décision retenue |
|----------|------------------|
| **Modèle métier** | Hybride : Modèle 2 (van mobile + hotel→airport) en façade marketing. Modèle 1 (trailers + lockers) maintenu en admin comme **bases logistiques internes** (où les vans parkent et trient les bagages entre tournées). |
| **Audience prioritaire** | B2B Hôtels (homepage `/`) — investisseurs et partenaires |
| **Audience secondaire** | B2C voyageurs (`/voyageurs`) — bookings transactionnels |
| **Stack** | Garder Next 16 + Tailwind v4 + Supabase + Stripe + Resend. Ajouter : Sonner, Vercel Analytics, react-hook-form, Playwright, next-intl (P2) |
| **i18n** | FR par défaut, EN + NL en P2 (audience Eurostar UK/NL) |

---

## ✓ Agent 1 — Architecte Systèmes

### Sitemap différentiel (✓ existe / ✗ manquant)

```
PUBLIC
├── /                          ✓
├── /voyageurs                 ✓
├── /a-propos                  ✗ P2 — équipe + mission
├── /presse                    ✗ P3 — press kit
├── /carrieres                 ✗ P3
├── /partenaires/[slug]        ✗ P2 — SEO local par hôtel
├── /blog                      ✗ P3 — content marketing
├── /blog/[slug]               ✗ P3
├── /mentions-legales          ✗ P1 — CRITIQUE (footer linké, 404)
├── /conditions-generales      ✗ P1 — CRITIQUE
└── /confidentialite           ✗ P1 — CRITIQUE

BOOKING
├── /reserver                  ✗ P2 — hub booking
├── /reserver/[trailerId]      ✓ (rebrand "pickup point")
├── /reserver/livraison        ✗ P1 — flow voyageur Hôtel→Aéroport
├── /horaires                  ✓ (à intégrer dans flow réel)
├── /paiement                  ✓
├── /confirmation              ✓
└── /tracking/[token]          ✓ excellent

ADMIN
├── /admin                     ✓
├── /admin/reservations        ✓
├── /admin/trailers (= bases)  ✓
├── /admin/deliveries          ✓
├── /admin/scanner             ✓
├── /admin/hotels              ✗ P1 — gestion partenaires
├── /admin/revenue             ✗ P2 — analytics + commissions
└── /admin/users               ✗ P3

AUTH
├── /login                     ✓
├── /signup                    ✗ P2 — comptes voyageurs
├── /password-reset            ✗ P2
└── /hotels/onboarding         ✗ P2 — onboarding partenaire
```

### Parcours utilisateur — 3 chemins critiques

**A — Hotel manager → Partenariat signé** (B2B)
1. Landing `/` via Google/LinkedIn ad
2. Read hero + stats + pain points + pricing
3. Click "Devenir partenaire" → scroll #partenariat
4. Submit form (5 champs)
5. Email Resend → CTA Calendly
6. Call cadrage → contrat signé → tablet livré → onboarding 72h

**B — Voyageur Eurostar → Réservation livraison** (B2C)
1. Landing `/voyageurs` via Google "luggage delivery Brussels"
2. Read hero "De votre hôtel à votre embarquement"
3. Click "Réserver une livraison" → `/reserver/livraison` ✗
4. Steps : Trip → Bags → Schedule → Pay
5. Confirmation + QR code (email + SMS)
6. Jour J : SMS rappel → tracking GPS live → remise comptoir

**C — Voyageur urgent mobile → Dépôt 1h**
1. Mobile vers `/voyageurs`
2. Click "Stockage journée" 9€
3. Geolocate → liste trailers proches (carte)
4. Choose → `/reserver/[id]` → Stripe Apple Pay → QR
5. Walk to trailer, scan QR, deposit

### Tables manquantes (Supabase)

```sql
-- P1
CREATE TABLE hotels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  address text NOT NULL,
  city text NOT NULL DEFAULT 'Brussels',
  zone text,
  latitude float8 NOT NULL,
  longitude float8 NOT NULL,
  tier text CHECK (tier IN ('BOUTIQUE','PREMIUM','GROUPE')),
  commission_rate decimal(4,3) NOT NULL,
  contact_name text,
  contact_email text,
  contact_phone text,
  pms_provider text,
  signed_at timestamptz,
  active boolean DEFAULT false,
  monthly_volume_target int,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE hotel_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  hotel_name text NOT NULL,
  role text,
  rooms int,
  email text NOT NULL,
  message text,
  status text DEFAULT 'NEW' CHECK (status IN ('NEW','CONTACTED','MEETING','NEGOTIATING','WON','LOST')),
  source text,
  created_at timestamptz DEFAULT now(),
  contacted_at timestamptz
);

ALTER TABLE bookings
  ADD COLUMN hotel_id uuid REFERENCES hotels(id),
  ADD COLUMN flight_number text,
  ADD COLUMN flight_time timestamptz,
  ADD COLUMN airport text CHECK (airport IN ('BRU','CRL')),
  ADD COLUMN pickup_window tstzrange;

-- P2
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) NOT NULL,
  user_id uuid REFERENCES profiles(id),
  hotel_id uuid REFERENCES hotels(id),
  rating int CHECK (rating BETWEEN 1 AND 5),
  comment text,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE hotel_commissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id uuid REFERENCES hotels(id) NOT NULL,
  period_month date NOT NULL,
  bookings_count int NOT NULL,
  gross_revenue decimal(10,2) NOT NULL,
  commission_amount decimal(10,2) NOT NULL,
  paid_at timestamptz,
  invoice_url text,
  UNIQUE(hotel_id, period_month)
);
```

### Endpoints API manquants

| Endpoint | Priorité | Description |
|----------|----------|-------------|
| `POST /api/hotels/lead` | P1 | Soumission formulaire partenaire (créé en DB + email notif) |
| `GET /api/hotels` | P1 | Liste publique des partenaires (autocomplete booking flow) |
| `POST /api/bookings/delivery` | P1 | Créer une livraison hôtel→aéroport |
| `GET /api/bookings/[id]/availability` | P1 | Check disponibilité créneau (avec Realtime) |
| `POST /api/reviews` | P2 | Avis post-service |
| `GET /api/sitemap.xml` | P1 | Sitemap dynamique |
| `POST /api/admin/commissions/calculate` | P2 | Calcul mensuel commissions |

### Composants manquants (P1) — 15

1. `<HotelAutocomplete>` — combobox typeahead
2. `<FlightTimePicker>` — validation T-3h/-4h
3. `<BookingStep>` — wrapper générique d'étape
4. `<EmptyState>` — partout absent
5. `<ErrorState>` — cohérent
6. `<Loading>` (spinner + skeleton) — centralisé
7. `<Toast>` — aucun système, **CRITIQUE**
8. `<PriceBreakdown>` — décomposition tarif
9. `<QRCodeDisplay>` — wrapper download/share
10. `<CommissionWidget>` — KPIs B2B portal
11. `<ReviewStars>` interactif
12. `<AirportPicker>` — toggle BRU/CRL
13. `<HotelPartnerCard>` — pour page partenaires
14. `<BlogPostCard>` + `<BlogList>` — content marketing
15. `<CTABanner>` — bandeau bottom réutilisable

### Stack additions

| Lib | Priorité | Pourquoi |
|-----|----------|----------|
| **Sonner** | P1 | Toasts manquants partout |
| **Vercel Analytics** | P1 | Gratuit, Speed Insights inclus |
| **react-hook-form** | P1 | Forms non typés actuellement, validation manuelle |
| **next-intl** | P2 | FR/EN/NL pour audience Eurostar |
| **Playwright** | P2 | Zéro test = risqué |

### SEO local — patterns

URLs :
- `/partenaires/[hotel-slug]` (ex: `/partenaires/hotel-metropole-bruxelles`)
- `/quartier/[zone-slug]` (ex: `/quartier/sablon`)

Schemas à ajouter :
- `LocalBusiness` sur `/` + `/voyageurs`
- `Service` par tier pricing
- `Review` sur testimonials
- `FAQPage` sur sections FAQ
- `BreadcrumbList` global

Sitemap : `app/sitemap.ts` dynamique avec routes statiques + partenaires + quartiers + blog.

---

## ✓ Agent 2 — Architecte Visuel

### Tokens manquants

```css
/* À ajouter dans :root (universel à tous les thèmes) */
--semantic-success: oklch(0.65 0.18 145);
--semantic-success-bg: oklch(0.95 0.05 145);
--semantic-warning: oklch(0.78 0.18 80);
--semantic-warning-bg: oklch(0.96 0.06 80);
--semantic-error: oklch(0.6 0.22 25);
--semantic-error-bg: oklch(0.96 0.06 25);
--semantic-info: oklch(0.6 0.18 230);
--semantic-info-bg: oklch(0.95 0.05 230);
```

### Échelle typographique (9 niveaux)

```
text-3xs   10px   micro caption
text-2xs   12px   caption / overline
text-xs    13px   small body
text-sm    14px   secondary
text-base  16px   body
text-lg    18px   lead
text-xl    22px   h3
text-2xl   28px   h2 small
text-3xl   40px   h2 large
text-display  clamp(3rem, 6vw, 6.5rem)  h1 fluid
```

### Composants — états manquants

| Composant | Manque |
|-----------|--------|
| Button | loading state |
| Input | error / success / disabled / focus / with-icon |
| Card | hover / selected / dragging |
| Forms | server-error / async-validating |

### A11y gaps

- ❌ Pas de `aria-live` regions pour toasts/errors
- ❌ Form errors pas reliés via `aria-describedby`
- ❌ Pas de scope sur tables admin
- ❌ Pas de test screen reader

---

## ✓ Agent 3 — Copywriting de conversion

> Le copy actuel est solide (poli en session précédente). Focus sur le manquant.

### Pages légales (templates fournis ci-dessous, à compléter avec données SRL réelles)

**`/mentions-legales`** — voir code généré dans `src/app/(legal)/mentions-legales/page.tsx`
**`/conditions-generales`** — voir code généré
**`/confidentialite`** — voir code généré

### Error states (à intégrer via toast)

```
Generic       → "Quelque chose n'a pas fonctionné. Réessayez ou contactez-nous : hello@bagdrop.be"
Payment       → "Le paiement n'a pas pu être traité. Votre carte n'a pas été débitée."
Network       → "Connexion instable. Vérifiez votre réseau et réessayez."
Auth required → "Connectez-vous pour continuer."
404           → "Cette page a disparu. Comme certains bagages avant nous. → Retour à l'accueil"
```

### Loading copy

```
"Recherche des créneaux disponibles…"
"Préparation de votre QR code…"
"Confirmation auprès de votre hôtel…"
"Calcul du tarif optimal…"
```

### Empty states

```
/admin/reservations → "Aucune réservation pour cette période."
/admin/hotels       → "Aucun hôtel partenaire encore. Importez votre première signature."
/dashboard          → "Vous n'avez encore aucune réservation. -20% avec BIENVENUE."
```

---

## ✓ Agent 4 — Interactions

### Module CRITIQUE — `/reserver/livraison` (P1)

État machine :
```
trip       → bags       → schedule    → checkout    → done
           validate     validate      pay-success
                                      → confirming → done
                                      → error
```

Context (localStorage backup à chaque step) :
```ts
interface BookingContext {
  direction: 'h2a' | 'a2h';
  hotel?: HotelPartner | { name; address; lat; lng };
  airport: 'BRU' | 'CRL';
  flightTime: string;       // ISO
  bagCount: 1|2|3|4|5|6;
  specialItems: string[];
  pickupWindow: { start: string; end: string };
  paymentIntent?: string;
  bookingId?: string;
}
```

Real-time disponibilité créneaux via Supabase Realtime subscribe sur `bookings`.

### Modules à compléter

- Cycle auth : ajouter `/signup` voyageur + `/password-reset` + Google/Apple OAuth
- Dashboard utilisateur : P2 (email + tracking suffisent pour MVP)

---

## ✓ Agent 5 — Prompts Figma Make

Les 5 prompts complets pour Figma Make sont en annexe (FIGMA_PROMPTS.md).

---

## 🚀 Roadmap priorisée (post-blueprint)

### P1 — Cette semaine (CRITIQUE avant pitch investisseur)

1. ✅ **Pages légales** (3 stubs FR-BE) — implémentées dans ce commit
2. ✅ **Toast system** (Sonner) — implémenté dans ce commit
3. ✅ **Semantic tokens** CSS — implémentés dans ce commit
4. **Migration Supabase** : tables `hotels` + `hotel_leads`
5. **`POST /api/hotels/lead`** : connecter form partenaire à DB + Resend
6. **`/reserver/livraison`** : flow 4-step booking voyageur

### P2 — Mois prochain

7. Vercel Analytics + Speed Insights
8. react-hook-form sur tous les forms (Zod schemas)
9. Sitemap dynamique + schema.org LocalBusiness/Service/FAQPage
10. `/partenaires/[slug]` pages SEO par hôtel
11. `/admin/hotels` CRUD
12. `/signup` + password reset + OAuth Google

### P3 — Trimestre

13. next-intl FR/EN/NL
14. `/blog` + `/a-propos` + `/carrieres`
15. `/admin/revenue` analytics
16. Reviews system
17. Playwright e2e tests sur booking flow critique

---

*Document vivant — dernière mise à jour : 2026-06-09*
