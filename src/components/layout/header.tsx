"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Luggage } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const b2bNav = [
  { name: "Notre service", href: "/#comment-ca-marche" },
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

  // Determine context: B2C on /voyageurs, B2B everywhere else
  const isB2C = pathname?.startsWith("/voyageurs");
  const navigation = isB2C ? b2cNav : b2bNav;
  const switchHref = isB2C ? "/" : "/voyageurs";
  const switchLabel = isB2C ? "Espace hôteliers" : "Espace voyageurs";
  const ctaHref = isB2C ? "/reserver" : "/#partenariat";
  const ctaLabel = isB2C ? "Réserver" : "Devenir partenaire";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Luggage className="h-6 w-6 text-primary" />
          <span>BagDrop</span>
          <span className="hidden sm:inline-block ml-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground border border-border/50 rounded px-1.5 py-0.5">
            {isB2C ? "Voyageurs" : "Hôtels"}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href={switchHref}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors border-l border-border/50 pl-6"
          >
            {switchLabel}
          </Link>
          <Link
            href={ctaHref}
            className={cn(buttonVariants({ size: "sm" }))}
          >
            {ctaLabel}
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <nav className="md:hidden border-t bg-background px-4 py-4 flex flex-col gap-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href={switchHref}
            className="text-base font-medium text-primary border-t border-border/50 pt-3 mt-1"
            onClick={() => setMobileOpen(false)}
          >
            → {switchLabel}
          </Link>
          <Link
            href={ctaHref}
            className={cn(buttonVariants(), "mt-2 w-full justify-center")}
            onClick={() => setMobileOpen(false)}
          >
            {ctaLabel}
          </Link>
        </nav>
      )}
    </header>
  );
}
