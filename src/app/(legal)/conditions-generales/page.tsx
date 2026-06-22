export const metadata = {
  title: "Conditions générales — BagDrop",
  description:
    "Conditions générales de service applicables aux clients de BagDrop SRL.",
};

export default function CGVPage() {
  return (
    <>
      <p className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--brand-cobalt)] mb-4">
        Légal
      </p>
      <h1>Conditions générales de service</h1>
      <p className="text-sm italic mt-2 mb-12">
        Dernière mise à jour : juin 2026.
      </p>

      <h2>1. Objet</h2>
      <p>
        Les présentes Conditions Générales de Service (« CGS ») régissent les
        relations entre <strong>BagDrop SRL</strong> (ci-après « BagDrop »),
        société de droit belge, et toute personne physique ou morale
        (ci-après le « Client ») utilisant les services proposés sur le site
        bagdrop.be.
      </p>

      <h2>2. Service</h2>
      <p>
        BagDrop propose un service de logistique bagages incluant la
        collecte, le transport, le stockage temporaire et la livraison
        sécurisée de bagages entre établissements hôteliers, aéroports et
        autres points convenus en région bruxelloise.
      </p>

      <h2>3. Réservation et paiement</h2>
      <p>
        Toute réservation est ferme dès paiement intégral. Le Client reçoit
        un email de confirmation et un QR code de récupération. Les moyens
        de paiement acceptés sont : carte bancaire (Visa, Mastercard, Amex),
        Apple Pay, Google Pay, Bancontact.
      </p>

      <h2>4. Tarification</h2>
      <p>
        Les prix affichés sur le site sont susceptibles d'ajustement selon
        zone géographique, volume et saisonnalité. Le prix final est
        confirmé avant validation du paiement. Tous les prix sont TVAC
        (TVA belge 21% incluse).
      </p>

      <h2>5. Annulation</h2>
      <p>
        Annulation gratuite jusqu'à <strong>6 heures</strong> avant le
        créneau de collecte programmé. Au-delà de ce délai, 50% du montant
        est conservé à titre de frais de service. Aucun remboursement n'est
        dû en cas de non-présentation du Client au point de collecte.
      </p>

      <h2>6. Responsabilité et assurance</h2>
      <p>
        Chaque bagage confié à BagDrop est assuré jusqu'à{" "}
        <strong>1 500 € par bagage</strong> via la police RC professionnelle
        de BagDrop dédiée au transport de marchandises. En cas de perte ou
        dommage avéré, le Client est indemnisé sous 15 jours sur
        présentation de justificatifs (facture d'achat, photos).
      </p>
      <p>Le Client garantit que les bagages remis ne contiennent pas :</p>
      <ul>
        <li>Espèces, bijoux, objets précieux au-delà du raisonnable</li>
        <li>
          Documents officiels uniques (passeport, titre de séjour, etc.)
        </li>
        <li>Matières dangereuses ou interdites au transport aérien IATA</li>
        <li>Animaux vivants ou denrées périssables non emballées</li>
        <li>Produits illégaux</li>
      </ul>

      <h2>7. Force majeure</h2>
      <p>
        BagDrop ne pourra être tenu responsable en cas d'événement de force
        majeure tel que défini par le droit belge : grève des transports,
        manifestation, météo extrême, sinistre matériel non imputable, acte
        de terrorisme, intervention des autorités.
      </p>

      <h2>8. Données personnelles</h2>
      <p>
        Le traitement des données personnelles est régi par notre{" "}
        <a href="/confidentialite">Politique de confidentialité</a>,
        conforme au Règlement (UE) 2016/679 (RGPD).
      </p>

      <h2>9. Litiges et médiation</h2>
      <p>
        Tout litige sera, à défaut de résolution amiable, soumis aux
        tribunaux de Bruxelles, droit belge applicable.
      </p>
      <p>
        Conformément au Code de droit économique belge, le Client
        consommateur peut saisir gratuitement le Service de Médiation pour
        le Consommateur :{" "}
        <a
          href="https://mediationconsommateur.be"
          target="_blank"
          rel="noopener noreferrer"
        >
          mediationconsommateur.be
        </a>
        .
      </p>

      <h2>10. Modification des CGS</h2>
      <p>
        BagDrop se réserve le droit de modifier les présentes CGS à tout
        moment. La version applicable est celle en vigueur à la date de la
        réservation.
      </p>

      <h2>Contact</h2>
      <p>
        BagDrop SRL — <a href="mailto:hello@bagdrop.be">hello@bagdrop.be</a>
      </p>
    </>
  );
}
