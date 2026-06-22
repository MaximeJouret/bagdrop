export const metadata = {
  title: "Mentions légales — BagDrop",
  description: "Informations légales relatives à BagDrop SRL.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <p className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--brand-cobalt)] mb-4">
        Légal
      </p>
      <h1>Mentions légales</h1>
      <p className="text-sm italic mt-2 mb-12">
        Dernière mise à jour : juin 2026.
      </p>

      <h2>Éditeur du site</h2>
      <p>
        <strong>BagDrop SRL</strong>
        <br />
        [Adresse du siège social — À COMPLÉTER]
        <br />
        1000 Bruxelles, Belgique
      </p>
      <ul>
        <li>
          Numéro d'entreprise (BCE) : <strong>[BE 0XXX.XXX.XXX]</strong>
        </li>
        <li>
          Numéro de TVA : <strong>BE 0XXX.XXX.XXX</strong>
        </li>
        <li>
          Capital social : <strong>[XX XXX] EUR</strong>
        </li>
        <li>
          Représentant légal : <strong>[Nom du gérant]</strong>
        </li>
      </ul>

      <h2>Directeur de la publication</h2>
      <p>
        [Nom du directeur de la publication]
        <br />
        Contact :{" "}
        <a href="mailto:hello@bagdrop.be">hello@bagdrop.be</a>
      </p>

      <h2>Hébergement</h2>
      <p>
        Vercel Inc.
        <br />
        440 N Barranca Ave #4133
        <br />
        Covina, CA 91723, États-Unis
        <br />
        <a href="mailto:support@vercel.com">support@vercel.com</a>
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus présents sur ce site (textes, images, vidéos,
        logos, structure, code) est la propriété exclusive de BagDrop SRL ou
        de ses partenaires, et est protégé par les lois belges et
        internationales relatives à la propriété intellectuelle. Toute
        reproduction, représentation, modification, publication, adaptation
        de tout ou partie des éléments du site, quel que soit le moyen ou le
        procédé utilisé, est interdite sans autorisation écrite préalable.
      </p>

      <h2>Crédits</h2>
      <p>
        Cartographie : © OpenStreetMap contributors, © CARTO.
        <br />
        Polices : Geist (Vercel), DM Serif Display, Caveat (Google Fonts).
        <br />
        Icônes : Lucide.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative au site ou à nos services :{" "}
        <a href="mailto:hello@bagdrop.be">hello@bagdrop.be</a>
      </p>
    </>
  );
}
