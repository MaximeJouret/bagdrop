import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { ArrowRight, Phone } from "lucide-react";

export function B2BFinalCTA() {
  return (
    <section className="py-20 md:py-24 px-4 bg-[var(--brand-charcoal)] text-[var(--brand-cream)] relative overflow-hidden">
      {/* Decorative element */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[var(--brand-gold)]/10 blur-3xl -translate-y-1/2 translate-x-1/2"
      />

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <p className="text-xs font-mono tracking-widest uppercase text-[var(--brand-gold)] mb-4">
          Vous êtes hôtelier à Bruxelles ?
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
          Vos concurrents
          <br />
          <span className="text-[var(--brand-gold)]">y pensent déjà.</span>
        </h2>
        <p className="text-lg text-[var(--brand-cream)]/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Le marché des services hôteliers premium se structure en ce moment à
          Bruxelles. Soyez parmi les premiers partenaires officiels.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#partenariat"
            className={cn(
              buttonVariants({ size: "lg" }),
              "text-base px-8 py-3 group bg-[var(--brand-gold)] text-[var(--brand-charcoal)] hover:bg-[var(--brand-gold)]/90"
            )}
          >
            Devenir hôtel partenaire
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="tel:+32483000000"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "text-base px-8 py-3 border-[var(--brand-cream)]/30 text-[var(--brand-cream)] hover:bg-[var(--brand-cream)]/10 hover:text-[var(--brand-cream)]"
            )}
          >
            <Phone className="mr-2 h-4 w-4" />
            +32 483 00 00 00
          </a>
        </div>

        <p className="text-xs text-[var(--brand-cream)]/50 mt-8">
          Numéro fictif pour la démo — sera remplacé en production.
        </p>
      </div>
    </section>
  );
}
