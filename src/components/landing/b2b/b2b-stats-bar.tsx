export function B2BStatsBar() {
  return (
    <section className="bg-background pt-12 pb-24 md:pt-16 md:pb-32 px-6">
      <div className="container mx-auto max-w-5xl text-center">
        <p className="text-sm md:text-base text-muted-foreground mb-6">
          Le marché bruxellois
        </p>
        <p className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-semibold tracking-[-0.045em] leading-none text-[var(--brand-ink)] dark:text-foreground mb-8">
          31<span className="text-[var(--brand-cobalt)]">M</span>
        </p>
        <p className="text-lg md:text-xl text-foreground max-w-xl mx-auto leading-relaxed">
          de passagers transitent chaque année par les aéroports
          belges. Et chacun d'eux a passé une nuit quelque part.
        </p>
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12 border-t border-border">
          <Stat value="8,5M" label="Nuitées hôtelières" />
          <Stat value="62%" label="Voyageurs business" />
          <Stat value="+8%" label="Croissance annuelle" />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--brand-ink)] dark:text-foreground mb-2">
        {value}
      </p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
