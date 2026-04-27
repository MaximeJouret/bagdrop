import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function B2CFinalCTA() {
  return (
    <section
      id="reserver"
      className="py-20 md:py-28 px-4 bg-[var(--brand-charcoal)] text-[var(--brand-cream)] relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/15 blur-3xl -translate-y-1/2 -translate-x-1/2"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[var(--brand-gold)]/10 blur-3xl translate-y-1/2 translate-x-1/2"
      />

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <p className="text-xs font-mono tracking-widest uppercase text-[var(--brand-gold)] mb-4">
          Prêt à voyager léger ?
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
          Profitez de Bruxelles.
          <br />
          <span className="text-[var(--brand-gold)]">
            On s'occupe du reste.
          </span>
        </h2>
        <p className="text-lg text-[var(--brand-cream)]/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Première réservation ?{" "}
          <span className="text-[var(--brand-gold)] font-semibold">
            -20% avec le code BIENVENUE
          </span>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/reserver"
            className={cn(
              buttonVariants({ size: "lg" }),
              "text-base px-8 py-3 group bg-[var(--brand-gold)] text-[var(--brand-charcoal)] hover:bg-[var(--brand-gold)]/90"
            )}
          >
            Réserver ma livraison
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "text-base px-8 py-3 border-[var(--brand-cream)]/30 text-[var(--brand-cream)] hover:bg-[var(--brand-cream)]/10 hover:text-[var(--brand-cream)]"
            )}
          >
            Espace hôteliers
          </Link>
        </div>
      </div>
    </section>
  );
}
