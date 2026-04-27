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
    <header className="sticky top-0 z-50 w-full pointer-events-none">
      <div className="container mx-auto px-4 pt-4 pointer-events-auto">
        {/* Floating Liquid Glass pill */}
        <div
          className="
            relative max-w-5xl mx-auto
            rounded-full
            bg-white/55 dark:bg-black/35
            backdrop-blur-xl backdrop-saturate-150
            border border-white/60 dark:border-white/10
            shadow-[0_8px_32px_-12px_rgba(15,26,46,0.18),0_2px_8px_-4px_rgba(15,26,46,0.08)]
            before:absolute before:inset-x-0 before:top-0 before:h-px
            before:rounded-full
            before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent
            before:pointer-events-none
            after:absolute after:inset-0 after:rounded-full
            after:bg-gradient-to-b after:from-white/40 after:to-transparent after:opacity-50
            after:pointer-events-none after:-z-10
          "
        >
          <div className="relative flex h-14 items-center justify-between px-6">
            <Link
              href="/"
              className="text-base font-semibold tracking-tight text-[var(--brand-ink)] dark:text-white hover:text-[var(--brand-cobalt)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cobalt)] rounded-md"
            >
              BagDrop
            </Link>

            <nav className="hidden md:flex items-center gap-7">
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

            <div className="hidden md:flex items-center gap-5">
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
              className="md:hidden p-3 -mr-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cobalt)]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu (drops below pill) */}
        {mobileOpen && (
          <div
            className="
              md:hidden mt-2 mx-auto max-w-5xl
              rounded-3xl
              bg-white/75 dark:bg-black/45
              backdrop-blur-xl backdrop-saturate-150
              border border-white/60 dark:border-white/10
              shadow-[0_8px_32px_-12px_rgba(15,26,46,0.18)]
              p-6 flex flex-col gap-4
            "
          >
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
          </div>
        )}
      </div>
    </header>
  );
}
