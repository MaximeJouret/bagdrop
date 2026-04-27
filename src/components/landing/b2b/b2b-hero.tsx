import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function B2BHero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Top utility bar */}
      <div className="border-b border-border/60">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between text-xs font-mono tracking-widest uppercase text-muted-foreground">
          <span>BagDrop · Brussels</span>
          <span className="hidden sm:inline">Hospitality Logistics · Est. 2026</span>
          <span className="text-[var(--brand-cobalt)] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-cobalt)] animate-pulse" />
            Available now
          </span>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-20 pb-24 md:pt-32 md:pb-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          {/* Left — main statement */}
          <div className="lg:col-span-8 fade-up">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--brand-cobalt)] mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--brand-cobalt)]" />
              Pour les hôtels bruxellois
            </p>
            <h1 className="text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[0.92] tracking-[-0.045em] text-[var(--brand-ink)] dark:text-foreground mb-8">
              Le concierge
              <br />
              <span className="highlight text-[var(--brand-ink)] dark:text-foreground">
                bagages
              </span>{" "}
              de votre
              <br />
              hôtel.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10 fade-up-delay-1">
              Nous collectons les bagages de vos clients en fin de séjour
              et les livrons directement à l'aéroport. Vous libérez votre
              conciergerie. Vos guests gagnent leur dernière journée à
              Bruxelles.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 fade-up-delay-2">
              <Link
                href="#partenariat"
                className="inline-flex items-center justify-center h-12 px-7 rounded-full text-base font-semibold bg-[var(--brand-cobalt)] text-white hover:bg-[var(--brand-cobalt-deep)] transition-colors group"
              >
                Devenir hôtel partenaire
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#processus"
                className="inline-flex items-center justify-center h-12 px-5 text-base font-semibold text-foreground hover:text-[var(--brand-cobalt)] transition-colors group"
              >
                Voir le processus
                <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Right — proof points */}
          <div className="lg:col-span-4 fade-up-delay-3">
            <div className="space-y-6 lg:border-l lg:border-border/60 lg:pl-10">
              <ProofPoint num="0€" label="Coût d'installation" detail="Tablette, formation et onboarding inclus." />
              <div className="border-t border-border/60" />
              <ProofPoint num="15%" label="Commission reversée" detail="Sur chaque réservation initiée par votre établissement." />
              <div className="border-t border-border/60" />
              <ProofPoint num="72h" label="Mise en service" detail="De la signature à la première collecte effective." />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofPoint({
  num,
  label,
  detail,
}: {
  num: string;
  label: string;
  detail: string;
}) {
  return (
    <div>
      <p className="text-4xl md:text-5xl font-extrabold font-mono text-[var(--brand-ink)] dark:text-foreground tracking-[-0.04em] mb-1">
        {num}
      </p>
      <p className="text-sm font-semibold text-foreground mb-1">{label}</p>
      <p className="text-xs text-muted-foreground leading-relaxed max-w-[20rem]">
        {detail}
      </p>
    </div>
  );
}
