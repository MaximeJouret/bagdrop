import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Plane } from "lucide-react";
import { BrusselsSkyline } from "../brussels-skyline";

export function B2CHero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 px-4">
      <BrusselsSkyline />

      <div className="container mx-auto relative z-10 max-w-4xl text-center">
        <Badge
          variant="secondary"
          className="mb-6 px-4 py-1.5 text-xs font-mono tracking-widest uppercase"
        >
          <Plane className="h-3 w-3 mr-2" />
          Service voyageurs
        </Badge>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-[var(--brand-charcoal)] dark:text-foreground leading-[1.1]">
          De votre hôtel
          <br />
          <span className="text-primary">à votre porte d'embarquement.</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          Quittez votre hôtel les mains libres. On collecte vos bagages, on les
          transporte en sécurité, on les remet à l'aéroport au moment où vous
          arrivez. Profitez de votre dernière journée à Bruxelles.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <Link
            href="#reserver"
            className={cn(
              buttonVariants({ size: "lg" }),
              "text-base px-8 py-3 group"
            )}
          >
            Réserver une livraison
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#parcours"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "text-base px-8 py-3"
            )}
          >
            Voir le parcours
          </Link>
        </div>

        {/* Quick proof points */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-8 border-t border-border/50">
          <div>
            <p className="text-2xl md:text-3xl font-bold font-mono text-[var(--brand-charcoal)] dark:text-foreground">
              1 500€
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Assurance par bagage
            </p>
          </div>
          <div className="border-x border-border/50">
            <p className="text-2xl md:text-3xl font-bold font-mono text-[var(--brand-charcoal)] dark:text-foreground">
              GPS
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Suivi temps réel
            </p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold font-mono text-[var(--brand-charcoal)] dark:text-foreground">
              7j/7
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Support voyageurs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
