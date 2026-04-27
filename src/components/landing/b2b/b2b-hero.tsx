"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TextReveal } from "@/components/motion/text-reveal";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic-button";

export function B2BHero() {
  return (
    <section className="relative bg-background pt-24 md:pt-40 pb-24 md:pb-40 px-6 overflow-hidden">
      <div className="container mx-auto max-w-5xl text-center">
        <Reveal>
          <p className="text-sm font-medium text-[var(--brand-cobalt)] mb-8 tracking-wide">
            Pour les hôtels bruxellois
          </p>
        </Reveal>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--brand-ink)] dark:text-foreground mb-8 max-w-4xl mx-auto">
          <TextReveal as="span" className="block" delay={0.1}>
            Le concierge bagages
          </TextReveal>
          <TextReveal
            as="span"
            className="block text-[var(--brand-cobalt)]"
            delay={0.35}
          >
            de votre hôtel.
          </TextReveal>
        </h1>

        <Reveal delay={0.7}>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-[1.4] mb-12">
            On collecte les bagages de vos clients en fin de séjour
            et on les livre directement à l'aéroport.
          </p>
        </Reveal>

        <Reveal delay={0.85}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Magnetic strength={0.2}>
              <Link
                href="#partenariat"
                className="inline-flex items-center justify-center h-12 px-7 rounded-full text-base font-medium bg-[var(--brand-cobalt)] text-white hover:bg-[var(--brand-cobalt-deep)] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cobalt)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Devenir partenaire
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>
            <Link
              href="#processus"
              className="inline-flex items-center text-base text-[var(--brand-cobalt)] hover:opacity-80 transition-opacity group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cobalt)] focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full px-3 h-12"
            >
              Voir comment ça marche
              <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
