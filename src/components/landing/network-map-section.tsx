"use client";

import { Reveal } from "@/components/motion/reveal";
import { NetworkMapDynamic } from "@/components/map/network-map-dynamic";

type NetworkMapSectionProps = {
  variant?: "b2b" | "b2c";
};

export function NetworkMapSection({ variant = "b2b" }: NetworkMapSectionProps) {
  const heading =
    variant === "b2b" ? "Notre réseau" : "Là où on opère";
  const subheading =
    variant === "b2b" ? "à Bruxelles." : "à Bruxelles.";
  const description =
    variant === "b2b"
      ? "Nous opérons dans les principaux quartiers hôteliers de Bruxelles. Chaque hôtel partenaire est connecté à nos deux aéroports en moins d'une heure."
      : "Nous collectons dans tout le centre de Bruxelles et livrons aux deux aéroports belges. Trajet moyen 35 minutes vers Zaventem.";

  return (
    <section className="py-32 md:py-48 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <Reveal>
          <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] text-[var(--brand-ink)] dark:text-foreground leading-[1.1]">
              {heading}
              <br />
              <span className="text-muted-foreground">{subheading}</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-8 leading-relaxed">
              {description}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative rounded-3xl overflow-hidden border border-border/60 shadow-[0_24px_48px_-24px_rgba(15,26,46,0.18)] bg-[var(--brand-cream)]">
            <NetworkMapDynamic />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-10 text-sm text-muted-foreground">
            <div className="flex items-center gap-2.5">
              <span
                className="w-3 h-3 rounded-full bg-[var(--brand-cobalt)] border-2 border-white"
                style={{
                  boxShadow:
                    "0 1px 3px rgba(15,26,46,0.2), 0 2px 6px rgba(30,58,138,0.15)",
                }}
                aria-hidden="true"
              />
              Hôtels partenaires
            </div>
            <div className="flex items-center gap-2.5">
              <span
                className="w-4 h-4 rounded-full bg-[var(--brand-cobalt)] border-[3px] border-[var(--brand-yellow)]"
                aria-hidden="true"
              />
              Aéroports
            </div>
            <div className="flex items-center gap-2.5">
              <svg
                width="32"
                height="2"
                viewBox="0 0 32 2"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="opacity-50"
              >
                <line
                  x1="0"
                  y1="1"
                  x2="32"
                  y2="1"
                  stroke="var(--brand-cobalt)"
                  strokeWidth="1.25"
                  strokeDasharray="4 6"
                />
              </svg>
              Itinéraires opérés
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
