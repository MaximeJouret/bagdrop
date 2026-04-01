"use client";

import { useRouter } from "next/navigation";
import { Briefcase, Luggage, Plane } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBookingFlow } from "@/hooks/use-booking-flow";
import { cn } from "@/lib/utils";
import type { Locker, DeliveryPrice } from "@/types";

interface LockerPickerProps {
  lockers: Locker[];
  trailerName: string;
  trailerAddress: string;
  trailerId: string;
  deliveryPrices?: DeliveryPrice[];
  hasUpcomingDeliveries?: boolean;
}

export function LockerPicker({
  lockers,
  trailerName,
  trailerAddress,
  trailerId,
  deliveryPrices = [],
  hasUpcomingDeliveries = false,
}: LockerPickerProps) {
  const router = useRouter();
  const { state, setTrailer, setLocker, setBookingType } = useBookingFlow();

  const isDelivery = state.bookingType === "DELIVERY";

  // Group available lockers by size
  const smallLockers = lockers.filter((l) => l.size === "SMALL" && l.status === "AVAILABLE");
  const largeLockers = lockers.filter((l) => l.size === "LARGE" && l.status === "AVAILABLE");

  const smallDeliveryPrice = deliveryPrices.find((p) => p.locker_size === "SMALL");
  const largeDeliveryPrice = deliveryPrices.find((p) => p.locker_size === "LARGE");

  function handleSelect(locker: Locker) {
    setTrailer(trailerId, trailerName, trailerAddress);
    setLocker(locker.id, locker.label, locker.size, Number(locker.price_per_hour));
    if (isDelivery) {
      router.push("/livraison");
    } else {
      router.push("/horaires");
    }
  }

  const sizes = [
    {
      type: "SMALL" as const,
      label: "Petit casier",
      description: "Bagage à main, sac à dos",
      dimensions: "40 × 30 × 60 cm",
      icon: Briefcase,
      lockers: smallLockers,
      price: smallLockers[0]?.price_per_hour,
      deliveryPrice: smallDeliveryPrice ? Number(smallDeliveryPrice.price) : null,
    },
    {
      type: "LARGE" as const,
      label: "Grand casier",
      description: "Valise 23 kg, sac de voyage",
      dimensions: "60 × 35 × 85 cm",
      icon: Luggage,
      lockers: largeLockers,
      price: largeLockers[0]?.price_per_hour,
      deliveryPrice: largeDeliveryPrice ? Number(largeDeliveryPrice.price) : null,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Booking type toggle */}
      <div className="flex rounded-lg border p-1 bg-muted/50">
        <button
          onClick={() => setBookingType("STORAGE")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-colors",
            !isDelivery
              ? "bg-background shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Luggage className="h-4 w-4" />
          Consigne en ville
        </button>
        <button
          onClick={() => setBookingType("DELIVERY")}
          disabled={!hasUpcomingDeliveries}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-colors",
            isDelivery
              ? "bg-background shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground",
            !hasUpcomingDeliveries && "opacity-50 cursor-not-allowed"
          )}
        >
          <Plane className="h-4 w-4" />
          Livraison aéroport
        </button>
      </div>

      {isDelivery && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800 p-3">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Déposez votre bagage en ville, nous le livrons à Brussels Airport (Zaventem). Prix fixe par bagage.
          </p>
        </div>
      )}

      {!hasUpcomingDeliveries && state.bookingType === "STORAGE" && deliveryPrices.length > 0 && (
        <div className="rounded-lg border border-muted p-3">
          <p className="text-sm text-muted-foreground">
            Aucune livraison aéroport planifiée pour cet emplacement. Consultez un autre emplacement ou revenez plus tard.
          </p>
        </div>
      )}

      {sizes.map((size) => {
        const available = size.lockers.length;
        const isSelected = state.lockerSize === size.type;
        const displayPrice = isDelivery
          ? size.deliveryPrice
          : Number(size.price);

        return (
          <Card
            key={size.type}
            className={cn(
              "transition-all cursor-pointer",
              available === 0 && "opacity-50 cursor-not-allowed",
              isSelected && "ring-2 ring-primary"
            )}
          >
            <CardContent className="flex items-center gap-4 py-5">
              <div className="p-3 rounded-lg bg-muted">
                <size.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg">{size.label}</h3>
                  <Badge variant={available > 0 ? "secondary" : "destructive"}>
                    {available > 0 ? `${available} disponible${available > 1 ? "s" : ""}` : "Complet"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{size.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{size.dimensions}</p>
              </div>
              <div className="text-right">
                {displayPrice != null && (
                  <>
                    <p className="text-2xl font-bold">{displayPrice.toFixed(2)} €</p>
                    <p className="text-xs text-muted-foreground">
                      {isDelivery ? "forfait" : "/heure"}
                    </p>
                  </>
                )}
                {available > 0 && (
                  <Button
                    size="sm"
                    className="mt-2"
                    onClick={() => handleSelect(size.lockers[0])}
                  >
                    Choisir
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
