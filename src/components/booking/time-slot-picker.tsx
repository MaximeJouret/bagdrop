"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format, addHours, setHours, setMinutes, startOfHour } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useBookingFlow } from "@/hooks/use-booking-flow";
import { cn } from "@/lib/utils";

const DURATION_OPTIONS = [
  { hours: 1, label: "1 heure" },
  { hours: 2, label: "2 heures" },
  { hours: 4, label: "4 heures" },
  { hours: 8, label: "8 heures" },
  { hours: 12, label: "12 heures" },
];

export function TimeSlotPicker() {
  const router = useRouter();
  const { state, setTimeSlot } = useBookingFlow();

  const now = new Date();
  const nextHour = startOfHour(addHours(now, 1));

  const [date, setDate] = useState(format(now, "yyyy-MM-dd"));
  const [time, setTime] = useState(format(nextHour, "HH:mm"));
  const [duration, setDuration] = useState<number | null>(null);

  if (!state.lockerId || !state.pricePerHour) {
    router.push("/");
    return null;
  }

  const totalPrice = duration ? state.pricePerHour * duration : null;

  function handleContinue() {
    if (!duration) return;
    const [h, m] = time.split(":").map(Number);
    const start = setMinutes(setHours(new Date(date), h), m);
    const end = addHours(start, duration);

    setTimeSlot(start.toISOString(), end.toISOString(), duration);
    router.push("/paiement");
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-4 py-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                min={format(now, "yyyy-MM-dd")}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Heure de début</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Durée</Label>
            <div className="flex flex-wrap gap-2">
              {DURATION_OPTIONS.map((opt) => (
                <button
                  key={opt.hours}
                  onClick={() => setDuration(opt.hours)}
                  className={cn(
                    "px-4 py-2 rounded-lg border text-sm font-medium transition-colors",
                    duration === opt.hours
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:bg-muted"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      {duration && totalPrice !== null && (
        <Card className="bg-muted/50">
          <CardContent className="py-5">
            <h3 className="font-semibold mb-3">Récapitulatif</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Emplacement</span>
                <span>{state.trailerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Casier</span>
                <span>
                  {state.lockerLabel} ({state.lockerSize === "LARGE" ? "Grand" : "Petit"})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span>{format(new Date(date), "d MMMM yyyy", { locale: fr })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Horaire</span>
                <span>
                  {time} — {format(addHours(setMinutes(setHours(new Date(date), Number(time.split(":")[0])), Number(time.split(":")[1])), duration), "HH:mm")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tarif</span>
                <span>{state.pricePerHour?.toFixed(2)} € × {duration}h</span>
              </div>
              <div className="flex justify-between pt-2 border-t font-semibold text-base">
                <span>Total</span>
                <span>{totalPrice.toFixed(2)} €</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        className="w-full"
        size="lg"
        disabled={!duration}
        onClick={handleContinue}
      >
        Continuer vers le paiement
      </Button>
    </div>
  );
}
