"use client";

import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/text-reveal";

export function B2BStatsBar() {
  return (
    <section className="bg-background pt-12 pb-24 md:pt-16 md:pb-32 px-6">
      <div className="container mx-auto max-w-5xl text-center">
        <Reveal>
          <p className="text-sm md:text-base text-muted-foreground mb-6">
            Le marché bruxellois
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-semibold tracking-[-0.045em] leading-none text-[var(--brand-ink)] dark:text-foreground mb-8">
            <Counter value={31} duration={1.8} />
            <span className="text-[var(--brand-cobalt)]">M</span>
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="text-lg md:text-xl text-foreground max-w-xl mx-auto leading-relaxed">
            de passagers transitent chaque année par les aéroports
            belges. Et chacun d'eux a passé une nuit quelque part.
          </p>
        </Reveal>

        <StaggerContainer className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12 border-t border-border" stagger={0.12}>
          <StaggerItem>
            <p className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--brand-ink)] dark:text-foreground mb-2">
              <Counter value={8.5} decimals={1} suffix="M" duration={1.6} />
            </p>
            <p className="text-sm text-muted-foreground">Nuitées hôtelières</p>
          </StaggerItem>
          <StaggerItem>
            <p className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--brand-ink)] dark:text-foreground mb-2">
              <Counter value={62} suffix="%" duration={1.6} />
            </p>
            <p className="text-sm text-muted-foreground">Voyageurs business</p>
          </StaggerItem>
          <StaggerItem>
            <p className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--brand-ink)] dark:text-foreground mb-2">
              <Counter value={8} prefix="+" suffix="%" duration={1.6} />
            </p>
            <p className="text-sm text-muted-foreground">Croissance annuelle</p>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
