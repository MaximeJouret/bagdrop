import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function B2BFinalCTA() {
  return (
    <section className="py-32 md:py-48 px-6 bg-[var(--brand-ink)] text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.05] mb-8">
          Soyez le premier
          <br />
          <span className="text-[var(--brand-yellow)]">à l'offrir.</span>
        </h2>

        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-12">
          Le marché des services hôteliers premium se structure en ce moment
          à Bruxelles. Soyez parmi les premiers partenaires officiels.
        </p>

        <Link
          href="#partenariat"
          className="inline-flex items-center justify-center h-12 px-8 rounded-full text-base font-medium bg-[var(--brand-yellow)] text-[var(--brand-cobalt-deep)] hover:bg-[var(--brand-yellow-deep)] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-ink)]"
        >
          Devenir hôtel partenaire
          <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
