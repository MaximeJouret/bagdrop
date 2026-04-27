import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export function B2BFinalCTA() {
  return (
    <section className="py-24 md:py-36 px-6 bg-[var(--brand-ink)] text-white relative overflow-hidden grain">
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[var(--brand-cobalt)]/30 blur-[120px] -translate-y-1/3 translate-x-1/3"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[var(--brand-yellow)]/15 blur-[120px] translate-y-1/3 -translate-x-1/3"
      />

      <div className="container mx-auto max-w-5xl relative z-10">
        <p className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--brand-yellow)] mb-8 flex items-center gap-3">
          <span className="w-8 h-px bg-[var(--brand-yellow)]" />
          Vous êtes hôtelier à Bruxelles ?
        </p>

        <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-[-0.045em] mb-10 leading-[0.95] max-w-4xl">
          Soyez le premier
          <br />
          <span className="text-[var(--brand-yellow)]">à l'offrir.</span>
        </h2>

        <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl leading-relaxed">
          Le marché des services hôteliers premium se structure en ce moment à
          Bruxelles. Soyez parmi les premiers partenaires officiels.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 items-start">
          <Link
            href="#partenariat"
            className="inline-flex items-center h-12 px-7 rounded-full text-base font-semibold bg-[var(--brand-yellow)] text-[var(--brand-cobalt-deep)] hover:bg-[var(--brand-yellow-deep)] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-ink)]"
          >
            Devenir hôtel partenaire
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="tel:+32483000000"
            className="inline-flex items-center h-12 px-5 rounded-full text-base font-semibold text-white hover:bg-white/10 transition-colors"
          >
            <Phone className="mr-2 h-4 w-4" />
            +32 483 00 00 00
          </a>
        </div>

        <p className="text-xs font-mono text-white/40 mt-12 pt-12 border-t border-white/15">
          Numéro de démo — sera remplacé en production.
        </p>
      </div>
    </section>
  );
}
