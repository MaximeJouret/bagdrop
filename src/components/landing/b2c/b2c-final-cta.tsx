import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function B2CFinalCTA() {
  return (
    <section
      id="reserver"
      className="py-24 md:py-36 px-6 bg-[var(--brand-ink)] text-white relative overflow-hidden grain"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[var(--brand-cobalt)]/30 blur-[120px] -translate-y-1/2 -translate-x-1/2"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[var(--brand-yellow)]/15 blur-[120px] translate-y-1/2 translate-x-1/2"
      />

      <div className="container mx-auto max-w-5xl relative z-10">
        <p className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--brand-yellow)] mb-8 flex items-center gap-3">
          <span className="w-8 h-px bg-[var(--brand-yellow)]" />
          Prêt à voyager léger ?
        </p>

        <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-[-0.045em] mb-10 leading-[0.95] max-w-4xl">
          Profitez de Bruxelles.
          <br />
          <span className="text-[var(--brand-yellow)]">On s'occupe du reste.</span>
        </h2>

        <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl leading-relaxed">
          Première réservation ?{" "}
          <span className="text-[var(--brand-yellow)] font-bold">
            -20% avec le code BIENVENUE
          </span>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-3 items-start">
          <Link
            href="/reserver"
            className="inline-flex items-center h-12 px-7 rounded-full text-base font-semibold bg-[var(--brand-yellow)] text-[var(--brand-cobalt-deep)] hover:bg-[var(--brand-yellow-deep)] transition-colors group"
          >
            Réserver ma livraison
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center h-12 px-5 rounded-full text-base font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Espace hôteliers
          </Link>
        </div>
      </div>
    </section>
  );
}
