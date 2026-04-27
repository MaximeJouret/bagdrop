"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const b2bNav = [
  { name: "Processus", href: "/#processus" },
  { name: "Couverture", href: "/#couverture" },
  { name: "Tarifs", href: "/#tarifs" },
  { name: "FAQ", href: "/#faq" },
];

const b2cNav = [
  { name: "Le parcours", href: "/voyageurs#parcours" },
  { name: "Tarifs", href: "/voyageurs#tarifs" },
  { name: "FAQ", href: "/voyageurs#faq" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isB2C = pathname?.startsWith("/voyageurs");
  const navigation = isB2C ? b2cNav : b2bNav;
  const switchHref = isB2C ? "/" : "/voyageurs";
  const switchLabel = isB2C ? "Espace hôteliers" : "Espace voyageurs";
  const ctaHref = isB2C ? "/reserver" : "/#partenariat";
  const ctaLabel = isB2C ? "Réserver" : "Devenir partenaire";

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/40">
      <div className="container mx-auto flex h-14 items-center justify-between px-6">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-[var(--brand-ink)] dark:text-foreground hover:text-[var(--brand-cobalt)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cobalt)] rounded-md"
        >
          BagDrop
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href={switchHref}
            className="text-sm text-foreground/60 hover:text-foreground transition-colors"
          >
            {switchLabel}
          </Link>
          <Link
            href={ctaHref}
            className="inline-flex items-center h-9 px-4 rounded-full text-sm font-medium bg-[var(--brand-cobalt)] text-white hover:bg-[var(--brand-cobalt-deep)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cobalt)] focus-visible:ring-offset-2"
          >
            {ctaLabel}
          </Link>
        </div>

        <button
          className="md:hidden p-3 -mr-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cobalt)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-border/40 bg-background px-6 py-6 flex flex-col gap-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-base text-foreground hover:text-[var(--brand-cobalt)] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href={switchHref}
            className="text-sm text-[var(--brand-cobalt)] border-t border-border/40 pt-4 mt-2"
            onClick={() => setMobileOpen(false)}
          >
            {switchLabel}
          </Link>
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center h-11 px-5 rounded-full text-sm font-medium bg-[var(--brand-cobalt)] text-white mt-2"
            onClick={() => setMobileOpen(false)}
          >
            {ctaLabel}
          </Link>
        </nav>
      )}
    </header>
  );
}
