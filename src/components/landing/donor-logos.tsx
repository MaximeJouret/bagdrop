"use client";

const placeholderLogos = [
  "Partenaire Alpha",
  "Bruxelles Mobilite",
  "Visit Brussels",
  "STIB-MIVB",
  "Brussels Airlines",
  "Federale Assurance",
  "BNP Paribas Fortis",
  "Belfius",
];

export function DonorLogos() {
  return (
    <section id="partenaires" className="py-16 px-4 bg-muted/20 overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-center mb-3">
          Ils nous font confiance
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-10">
          Nos partenaires et soutiens
        </p>

        {/* Marquee — pauses on reduced motion via CSS */}
        <div className="marquee-container relative">
          <div className="marquee-track flex gap-8 w-max">
            {/* Duplicate for seamless loop */}
            {[...placeholderLogos, ...placeholderLogos].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="shrink-0 flex items-center justify-center rounded-lg border border-border/50 bg-background px-8 py-4 grayscale hover:grayscale-0 transition-[filter] duration-300 select-none"
              >
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
