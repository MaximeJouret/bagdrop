"use client";

import { Plane } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/text-reveal";

const airports = [
  {
    code: "BRU",
    name: "Brussels Airport",
    city: "Zaventem",
    duration: "20-35 min",
    primary: true,
  },
  {
    code: "CRL",
    name: "Brussels South",
    city: "Charleroi",
    duration: "55-70 min",
    primary: false,
  },
];

export function B2BCoverage() {
  return (
    <section
      id="couverture"
      className="py-32 md:py-48 px-6 bg-[var(--brand-cream)] dark:bg-muted/20"
    >
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <div className="text-center mb-20 md:mb-28 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] text-[var(--brand-ink)] dark:text-foreground leading-[1.1]">
              Tout Bruxelles,
              <br />
              <span className="text-[var(--brand-cobalt)]">deux aéroports.</span>
            </h2>
          </div>
        </Reveal>

        <StaggerContainer className="grid md:grid-cols-2 gap-12 md:gap-16 max-w-3xl mx-auto" stagger={0.15}>
          {airports.map((airport) => (
            <StaggerItem key={airport.code}>
              <div className="text-center">
                <Plane
                  strokeWidth={1.25}
                  className={`h-9 w-9 mx-auto mb-6 ${
                    airport.primary
                      ? "text-[var(--brand-cobalt)]"
                      : "text-muted-foreground"
                  }`}
                />
                <p className="font-mono text-sm tracking-widest text-muted-foreground mb-2">
                  {airport.code}
                </p>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--brand-ink)] dark:text-foreground mb-2">
                  {airport.name}
                </h3>
                <p className="text-base text-muted-foreground mb-1">{airport.city}</p>
                <p className="text-base text-foreground font-medium">
                  {airport.duration} de trajet
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal delay={0.3}>
          <p className="text-center text-sm text-muted-foreground mt-20 max-w-2xl mx-auto">
            Couverture complète du centre de Bruxelles, du quartier européen,
            de Louise, du Sablon, et des principaux quartiers hôteliers.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
