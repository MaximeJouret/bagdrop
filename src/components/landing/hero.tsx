import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { BrusselsSkyline } from "./brussels-skyline";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 px-4">
      <BrusselsSkyline />
      <div className="container mx-auto text-center max-w-3xl relative z-10">
        <p className="text-sm font-medium tracking-widest uppercase text-[var(--brand-copper)] mb-4">
          Consigne de bagages a Bruxelles
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-[var(--brand-charcoal)] dark:text-foreground">
          Deposez vos bagages,{" "}
          <span className="text-primary">explorez librement</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          Casiers connectes et securises aux meilleurs emplacements touristiques
          de Bruxelles. Reservez en ligne, deposez vos bagages, profitez de
          votre journee.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#emplacements"
            className={cn(
              buttonVariants({ size: "lg" }),
              "text-base px-8 py-3"
            )}
          >
            Trouver un point de depot
          </Link>
          <Link
            href="#comment-ca-marche"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "text-base px-8 py-3"
            )}
          >
            Comment ca marche
          </Link>
        </div>
      </div>
    </section>
  );
}
