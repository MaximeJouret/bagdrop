import Link from "next/link";
import { Luggage, Play, Camera, Briefcase, Music } from "lucide-react";

const navLinks = [
  { name: "Emplacements", href: "/#emplacements" },
  { name: "Comment ca marche", href: "/#comment-ca-marche" },
  { name: "Tarifs", href: "/#tarifs" },
];

const legalLinks = [
  { name: "Mentions legales", href: "/mentions-legales" },
  { name: "Conditions generales", href: "/conditions-generales" },
  { name: "Politique de confidentialite", href: "/confidentialite" },
];

const socialLinks = [
  { icon: Play, href: "#", label: "YouTube" },
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: Music, href: "#", label: "TikTok" },
  { icon: Briefcase, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <Luggage className="h-5 w-5 text-primary" />
              <span>BagDrop</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Consigne de bagages connectee aux meilleurs emplacements
              touristiques de Bruxelles.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Navigation</h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Legal</h3>
            <nav className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Suivez-nous</h3>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} BagDrop. Tous droits reserves.
          </p>
        </div>
      </div>
    </footer>
  );
}
