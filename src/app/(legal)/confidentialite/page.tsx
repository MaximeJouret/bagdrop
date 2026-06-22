export const metadata = {
  title: "Politique de confidentialité — BagDrop",
  description:
    "Politique de protection des données personnelles, conforme au RGPD.",
};

export default function PrivacyPage() {
  return (
    <>
      <p className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--brand-cobalt)] mb-4">
        Légal
      </p>
      <h1>Politique de confidentialité</h1>
      <p className="text-sm italic mt-2 mb-12">
        Dernière mise à jour : juin 2026. Conforme au Règlement (UE) 2016/679
        (RGPD).
      </p>

      <h2>1. Responsable de traitement</h2>
      <p>
        <strong>BagDrop SRL</strong>
        <br />
        [Adresse — À COMPLÉTER], 1000 Bruxelles, Belgique
        <br />
        Délégué à la protection des données (DPO) :{" "}
        <a href="mailto:dpo@bagdrop.be">dpo@bagdrop.be</a>
      </p>

      <h2>2. Données collectées</h2>
      <ul>
        <li>
          <strong>Identité</strong> : prénom, nom, fonction (pour les
          formulaires partenaires)
        </li>
        <li>
          <strong>Contact</strong> : email, numéro de téléphone
        </li>
        <li>
          <strong>Localisation</strong> : adresse de collecte, aéroport de
          destination
        </li>
        <li>
          <strong>Voyage</strong> : numéro de vol, heure, nombre de bagages
        </li>
        <li>
          <strong>Paiement</strong> : traité directement par Stripe (nous ne
          stockons aucune donnée carte)
        </li>
        <li>
          <strong>Navigation</strong> : adresse IP, type de navigateur,
          pages visitées (à des fins analytiques)
        </li>
      </ul>

      <h2>3. Finalités et bases légales</h2>
      <ul>
        <li>
          <strong>Exécution du contrat</strong> (Art. 6.1.b RGPD) : prise en
          charge, transport et livraison des bagages, gestion du compte
          client, facturation.
        </li>
        <li>
          <strong>Obligation légale</strong> (Art. 6.1.c) : conservation des
          factures pendant 7 ans (Code TVA belge).
        </li>
        <li>
          <strong>Intérêt légitime</strong> (Art. 6.1.f) : sécurité du
          service, prévention de la fraude, statistiques agrégées
          d'utilisation.
        </li>
        <li>
          <strong>Consentement</strong> (Art. 6.1.a) : communications
          marketing, cookies non essentiels.
        </li>
      </ul>

      <h2>4. Destinataires</h2>
      <p>Vos données peuvent être transmises à nos sous-traitants :</p>
      <ul>
        <li>
          <strong>Stripe Inc.</strong> (paiement) — certifié PCI-DSS,
          transferts UE/US encadrés par les Clauses Contractuelles Types
        </li>
        <li>
          <strong>Resend</strong> (envoi d'emails transactionnels)
        </li>
        <li>
          <strong>Supabase Inc.</strong> (base de données, hébergée dans
          l'UE pour les utilisateurs européens)
        </li>
        <li>
          <strong>Vercel Inc.</strong> (hébergement web, transferts UE/US
          encadrés par les CCT)
        </li>
      </ul>

      <h2>5. Durée de conservation</h2>
      <ul>
        <li>
          <strong>Données de compte client</strong> : pendant la durée de la
          relation contractuelle, puis 5 ans (prescription)
        </li>
        <li>
          <strong>Factures et données comptables</strong> : 7 ans
          (obligation légale belge)
        </li>
        <li>
          <strong>Données prospects (formulaire partenaire)</strong> : 3 ans
          à compter du dernier contact
        </li>
        <li>
          <strong>Cookies analytiques</strong> : 13 mois maximum
        </li>
      </ul>

      <h2>6. Vos droits</h2>
      <p>Conformément au RGPD, vous disposez des droits suivants :</p>
      <ul>
        <li>Droit d'accès à vos données</li>
        <li>Droit de rectification</li>
        <li>Droit à l'effacement (« droit à l'oubli »)</li>
        <li>Droit à la limitation du traitement</li>
        <li>Droit à la portabilité</li>
        <li>Droit d'opposition au traitement</li>
        <li>Droit de retirer votre consentement à tout moment</li>
        <li>Droit d'introduire une réclamation auprès de l'APD belge</li>
      </ul>
      <p>
        Pour exercer ces droits, contactez notre DPO :{" "}
        <a href="mailto:dpo@bagdrop.be">dpo@bagdrop.be</a>
      </p>
      <p>
        Autorité de contrôle :{" "}
        <a
          href="https://www.autoriteprotectiondonnees.be"
          target="_blank"
          rel="noopener noreferrer"
        >
          Autorité de protection des données (APD)
        </a>{" "}
        — rue de la Presse 35, 1000 Bruxelles.
      </p>

      <h2>7. Cookies</h2>
      <p>
        Notre site utilise uniquement des cookies strictement nécessaires au
        fonctionnement du service (session, préférence de thème). Nous
        n'utilisons pas de cookies tiers de tracking marketing sans votre
        consentement explicite.
      </p>

      <h2>8. Sécurité</h2>
      <p>
        Vos données sont chiffrées en transit (TLS 1.3) et au repos. Les
        accès internes sont restreints au strict nécessaire (principe de
        moindre privilège) et journalisés.
      </p>

      <h2>9. Modifications</h2>
      <p>
        Cette politique peut évoluer. Les modifications substantielles vous
        seront notifiées par email.
      </p>

      <h2>Contact DPO</h2>
      <p>
        <a href="mailto:dpo@bagdrop.be">dpo@bagdrop.be</a>
      </p>
    </>
  );
}
