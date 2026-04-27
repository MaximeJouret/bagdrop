import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const hotelLinks = [
  { name: "Notre service", href: "/#processus" },
  { name: "Couverture", href: "/#couverture" },
  { name: "Tarifs", href: "/#tarifs" },
  { name: "Devenir partenaire", href: "/#partenariat" },
];

const travelerLinks = [
  { name: "Le parcours", href: "/voyageurs#parcours" },
  { name: "Tarifs", href: "/voyageurs#tarifs" },
  { name: "FAQ", href: "/voyageurs#faq" },
  { name: "Réserver", href: "/reserver" },
];

const legalLinks = [
  { name: "Mentions légales", href: "/mentions-legales" },
  { name: "Conditions générales", href: "/conditions-generales" },
  { name: "Politique de confidentialité", href: "/confidentialite" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--brand-ink)] text-white">
      <div className="container mx-auto px-6 py-20 md:py-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
          {/* Brand block */}
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-extrabold tracking-[-0.04em] text-white">
                BagDrop
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
                Brussels · 2026
              </span>
            </Link>
            <p className="text-base text-white/60 leading-relaxed max-w-md mb-8">
              Logistique bagages premium pour les hôtels et voyageurs
              bruxellois. De votre chambre à votre porte d'embarquement.
            </p>
            <a
              href="mailto:hello@bagdrop.be"
              className="inline-flex items-center text-sm font-semibold text-[var(--brand-yellow)] hover:text-white transition-colors group"
            >
              hello@bagdrop.be
              <ArrowUpRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-10">
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--brand-yellow)] mb-5 font-bold">
                Hôteliers
              </h3>
              <nav className="flex flex-col gap-3">
                {hotelLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--brand-yellow)] mb-5 font-bold">
                Voyageurs
              </h3>
              <nav className="flex flex-col gap-3">
                {travelerLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--brand-yellow)] mb-5 font-bold">
                Légal
              </h3>
              <nav className="flex flex-col gap-3">
                {legalLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs font-mono text-white/40">
            © {new Date().getFullYear()} BagDrop SRL · Bruxelles, Belgique
          </p>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">
            Bêta · Q2 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
