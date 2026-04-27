import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";

export function B2BHero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 px-4 bg-gradient-to-b from-[var(--brand-cream)] to-background">
      {/* Decorative gradient blobs */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 -left-32 w-96 h-96 rounded-full bg-[var(--brand-gold)]/10 blur-3xl"
      />

      <div className="container mx-auto relative z-10 max-w-5xl">
        <div className="text-center">
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-1.5 text-xs font-mono tracking-widest uppercase"
          >
            <Sparkles className="h-3 w-3 mr-2" />
            Partenariat hôteliers
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-[var(--brand-charcoal)] dark:text-foreground leading-[1.1]">
            Le concierge bagages
            <br />
            <span className="text-primary">de votre hôtel.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            BagDrop collecte les bagages de vos clients en fin de séjour
            et les livre directement à l'aéroport. Vous libérez votre
            conciergerie. Vos clients gagnent leur dernière journée à Bruxelles.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="#partenariat"
              className={cn(
                buttonVariants({ size: "lg" }),
                "text-base px-8 py-3 group"
              )}
            >
              Devenir hôtel partenaire
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#comment-ca-marche"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "text-base px-8 py-3"
              )}
            >
              Voir comment ça marche
            </Link>
          </div>

          {/* Quick proof points */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-8 border-t border-border/50">
            <div>
              <p className="text-2xl md:text-3xl font-bold font-mono text-[var(--brand-charcoal)] dark:text-foreground">
                0€
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Coût d'installation
              </p>
            </div>
            <div className="border-x border-border/50">
              <p className="text-2xl md:text-3xl font-bold font-mono text-[var(--brand-charcoal)] dark:text-foreground">
                15%
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Commission reversée
              </p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold font-mono text-[var(--brand-charcoal)] dark:text-foreground">
                72h
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Mise en service
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
