"use client";

import { useRouter } from "next/navigation";
import { Briefcase, Luggage } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBookingFlow } from "@/hooks/use-booking-flow";
import { cn } from "@/lib/utils";
import type { Locker } from "@/types";

interface LockerPickerProps {
  lockers: Locker[];
  trailerName: string;
  trailerAddress: string;
  trailerId: string;
}

export function LockerPicker({ lockers, trailerName, trailerAddress, trailerId }: LockerPickerProps) {
  const router = useRouter();
  const { state, setTrailer, setLocker } = useBookingFlow();

  // Group available lockers by size
  const smallLockers = lockers.filter((l) => l.size === "SMALL" && l.status === "AVAILABLE");
  const largeLockers = lockers.filter((l) => l.size === "LARGE" && l.status === "AVAILABLE");

  function handleSelect(locker: Locker) {
    setTrailer(trailerId, trailerName, trailerAddress);
    setLocker(locker.id, locker.label, locker.size, Number(locker.price_per_hour));
    router.push("/horaires");
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
    },
    {
      type: "LARGE" as const,
      label: "Grand casier",
      description: "Valise 23 kg, sac de voyage",
      dimensions: "60 × 35 × 85 cm",
      icon: Luggage,
      lockers: largeLockers,
      price: largeLockers[0]?.price_per_hour,
    },
  ];

  return (
    <div className="space-y-4">
      {sizes.map((size) => {
        const available = size.lockers.length;
        const isSelected = state.lockerSize === size.type;

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
                <p className="text-2xl font-bold">{Number(size.price).toFixed(2)} €</p>
                <p className="text-xs text-muted-foreground">/heure</p>
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
