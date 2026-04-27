export function B2CPainNarrative() {
  return (
    <section className="py-32 md:py-48 px-6 bg-[var(--brand-cream)] dark:bg-muted/20">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] text-[var(--brand-ink)] dark:text-foreground leading-[1.1] mb-10">
          Huit heures
          <br />
          <span className="text-muted-foreground">avec 25 kg sur le dos.</span>
        </h2>

        <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6 max-w-2xl mx-auto">
          Check-out à 11h. Vol à 19h. Entre les deux, vous voulez profiter
          d'un dernier café au Sablon, du musée Magritte, d'un repas dans
          le Châtelain.
        </p>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Sauf que vos valises sont sur votre dos. Et que le casier de la
          gare du Midi, vous ne lui faites pas vraiment confiance.
        </p>
      </div>
    </section>
  );
}
