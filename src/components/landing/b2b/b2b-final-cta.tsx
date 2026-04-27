import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export function B2BFinalCTA() {
  return (
    <section className="py-24 md:py-36 px-6 bg-[var(--brand-ink)] text-[var(--brand-ivory)] relative overflow-hidden grain">
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[var(--brand-emerald)]/15 blur-[120px] -translate-y-1/3 translate-x-1/3"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[var(--brand-coral)]/10 blur-[120px] translate-y-1/3 -translate-x-1/3"
      />

      <div className="container mx-auto max-w-5xl relative z-10">
        <p className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--brand-coral)] mb-8">
          ◇ Vous êtes hôtelier à Bruxelles ?
        </p>

        <h2 className="text-5xl md:text-6xl lg:text-8xl font-semibold tracking-tighter mb-10 leading-[0.95] max-w-4xl">
          Vos concurrents
          <br />
          <span className="italic font-light text-[var(--brand-coral)]">
            y pensent déjà.
          </span>
        </h2>

        <p className="text-lg md:text-xl text-[var(--brand-ivory)]/70 mb-12 max-w-2xl leading-relaxed">
          Le marché des services hôteliers premium se structure en ce moment à
          Bruxelles. Soyez parmi les premiers partenaires officiels.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 items-start">
          <Link
            href="#partenariat"
            className="inline-flex items-center h-12 px-7 rounded-full text-base font-medium bg-[var(--brand-coral)] text-[var(--brand-ivory)] hover:bg-[var(--brand-coral)]/90 transition-colors group"
          >
            Devenir hôtel partenaire
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="tel:+32483000000"
            className="inline-flex items-center h-12 px-5 rounded-full text-base font-medium text-[var(--brand-ivory)] hover:bg-[var(--brand-ivory)]/10 transition-colors"
          >
            <Phone className="mr-2 h-4 w-4" />
            +32 483 00 00 00
          </a>
        </div>

        <p className="text-xs font-mono text-[var(--brand-ivory)]/40 mt-12 pt-12 border-t border-[var(--brand-ivory)]/15">
          Numéro fictif pour la démonstration — sera remplacé en production.
        </p>
      </div>
    </section>
  );
}
