const stats = [
  { value: "31M", label: "passagers / an", sub: "Zaventem + Charleroi" },
  { value: "8,5M", label: "nuitées hôtelières", sub: "Bruxelles, 2024" },
  { value: "62%", label: "voyageurs business", sub: "Premier marché européen" },
  { value: "+8%", label: "croissance annuelle", sub: "Tourisme 2025-2030" },
];

export function B2BStatsBar() {
  return (
    <section className="bg-[var(--brand-emerald-deep)] text-[var(--brand-ivory)] py-16 md:py-20 px-6 grain">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-baseline justify-between mb-12 flex-wrap gap-4">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--brand-coral)]">
            ◇ Le marché bruxellois
          </p>
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--brand-ivory)]/40">
            Sources : visit.brussels, Brussels Airport Co.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`${
                i < stats.length - 1 ? "lg:border-r border-[var(--brand-ivory)]/15 lg:pr-6" : ""
              }`}
            >
              <p className="text-5xl md:text-6xl lg:text-7xl font-semibold font-mono tracking-tighter mb-3 leading-none">
                {s.value}
              </p>
              <p className="text-base font-medium leading-tight">{s.label}</p>
              <p className="text-xs text-[var(--brand-ivory)]/50 mt-1">
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
