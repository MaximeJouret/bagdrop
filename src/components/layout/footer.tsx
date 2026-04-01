import Link from "next/link";
import { Luggage } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-semibold">
            <Luggage className="h-5 w-5" />
            <span>BagDrop</span>
          </div>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/#how-it-works" className="hover:text-foreground transition-colors">
              Comment ça marche
            </Link>
            <Link href="/#pricing" className="hover:text-foreground transition-colors">
              Tarifs
            </Link>
            <Link href="/mentions-legales" className="hover:text-foreground transition-colors">
              Mentions légales
            </Link>
          </nav>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BagDrop. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
