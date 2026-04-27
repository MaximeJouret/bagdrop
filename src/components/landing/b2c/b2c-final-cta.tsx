"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic-button";

export function B2CFinalCTA() {
  return (
    <section
      id="reserver"
      className="py-32 md:py-48 px-6 bg-[var(--brand-ink)] text-white"
    >
      <div className="container mx-auto max-w-4xl text-center">
        <Reveal>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.05] mb-8">
            Profitez de Bruxelles.
            <br />
            <span className="text-[var(--brand-yellow)]">On s'occupe du reste.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-lg md:text-xl text-white/70 max-w-xl mx-auto leading-relaxed mb-12">
            Première réservation ?{" "}
            <span className="text-[var(--brand-yellow)] font-medium">
              -20% avec le code BIENVENUE.
            </span>
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Magnetic strength={0.2} className="inline-block">
              <Link
                href="/reserver"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full text-base font-medium bg-[var(--brand-yellow)] text-[var(--brand-cobalt-deep)] hover:bg-[var(--brand-yellow-deep)] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-ink)]"
              >
                Réserver ma livraison
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>
            <Link
              href="/"
              className="inline-flex items-center justify-center h-12 px-5 rounded-full text-base text-white hover:opacity-80 transition-opacity"
            >
              Espace hôteliers
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
