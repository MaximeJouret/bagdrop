"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Luggage } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Comment ça marche", href: "/#how-it-works" },
  { name: "Tarifs", href: "/#pricing" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Luggage className="h-6 w-6 text-primary" />
          <span>BagDrop</span>
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
          <Link href="/login" className={cn(buttonVariants())}>
            Connexion
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            href="/login"
            className={cn(buttonVariants(), "mt-2 w-full justify-center")}
            onClick={() => setMobileOpen(false)}
          >
            Connexion
          </Link>
        </nav>
      )}
    </header>
  );
}
