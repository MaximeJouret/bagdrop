import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Plane } from "lucide-react";
import { cn } from "@/lib/utils";

export function PricingSection() {
  return (
    <section id="tarifs" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-4">
          Tarifs simples et transparents
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          Pas de frais caches. Payez uniquement pour la duree dont vous avez
          besoin.
        </p>

        {/* Locker tiers */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          {/* Small locker */}
          <Card className="relative">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Petit casier
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Bagage a main, sac a dos
              </p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold font-mono tracking-tight">
                  2,50
                </span>
                <span className="text-lg text-muted-foreground">EUR/h</span>
              </div>
              <Link
                href="#emplacements"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full"
                )}
              >
                Choisir un emplacement
              </Link>
            </CardContent>
          </Card>

          {/* Large locker */}
          <Card className="relative border-primary/30 shadow-md">
            <CardContent className="p-6">
              <Badge className="absolute top-4 right-4">Populaire</Badge>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Grand casier
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Valise 23 kg, poussette
              </p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold font-mono tracking-tight">
                  4,00
                </span>
                <span className="text-lg text-muted-foreground">EUR/h</span>
              </div>
              <Link
                href="#emplacements"
                className={cn(buttonVariants(), "w-full")}
              >
                Choisir un emplacement
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Airport delivery */}
        <Card className="bg-[var(--brand-cream)] dark:bg-muted/30 border-dashed">
          <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Plane className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold">Livraison aeroport</p>
                <Badge variant="secondary">Nouveau</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Deposez en ville, recuperez a Brussels Airport. Tracking GPS en
                temps reel.
              </p>
            </div>
            <div className="flex items-baseline gap-4 shrink-0">
              <div className="text-center">
                <span className="text-2xl font-bold font-mono">15</span>
                <span className="text-xs text-muted-foreground block">
                  EUR petit
                </span>
              </div>
              <div className="text-muted-foreground">/</div>
              <div className="text-center">
                <span className="text-2xl font-bold font-mono">25</span>
                <span className="text-xs text-muted-foreground block">
                  EUR grand
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
