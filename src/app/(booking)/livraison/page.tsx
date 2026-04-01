"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Plane, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBookingFlow } from "@/hooks/use-booking-flow";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { DeliveryRun } from "@/types";

export default function LivraisonPage() {
  const router = useRouter();
  const { state, setDeliveryInfo } = useBookingFlow();
  const [runs, setRuns] = useState<DeliveryRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);

  useEffect(() => {
    if (!state.trailerId || state.bookingType !== "DELIVERY") {
      router.push("/");
      return;
    }

    async function fetchRuns() {
      const supabase = createClient();
      const { data } = await supabase
        .from("delivery_runs")
        .select("*")
        .eq("trailer_id", state.trailerId!)
        .eq("status", "SCHEDULED")
        .gte("scheduled_departure", new Date().toISOString())
        .order("scheduled_departure", { ascending: true });

      setRuns(data || []);
      setLoading(false);
    }

    fetchRuns();
  }, [state.trailerId, state.bookingType, router]);

  function handleSelect(run: DeliveryRun) {
    setSelectedRunId(run.id);
  }

  function handleContinue() {
    const run = runs.find((r) => r.id === selectedRunId);
    if (!run || !state.lockerSize) return;

    // Deposit deadline = 30 min before departure
    const departure = new Date(run.scheduled_departure);
    const deadline = new Date(departure.getTime() - 30 * 60 * 1000).toISOString();

    // Get delivery price based on locker size
    const price = state.lockerSize === "LARGE" ? 25 : 15;

    setDeliveryInfo(run.id, deadline, price, run.tracking_token);
    router.push("/paiement");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Choisissez votre livraison</h1>
        <p className="text-muted-foreground">
          Sélectionnez un créneau de livraison vers Brussels Airport
        </p>
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800 p-4">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-medium text-blue-900 dark:text-blue-100">Point de rendez-vous</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Brussels Airport (BRU) — Kiss & Ride Zone
            </p>
          </div>
        </div>
      </div>

      {runs.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <Plane className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              Aucun créneau de livraison disponible pour le moment.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {runs.map((run) => {
            const departure = new Date(run.scheduled_departure);
            const deadline = new Date(departure.getTime() - 30 * 60 * 1000);
            const isSelected = selectedRunId === run.id;

            return (
              <Card
                key={run.id}
                className={cn(
                  "transition-all cursor-pointer hover:shadow-md",
                  isSelected && "ring-2 ring-primary"
                )}
                onClick={() => handleSelect(run)}
              >
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="p-3 rounded-lg bg-muted">
                    <Plane className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">
                        {format(departure, "EEEE d MMMM", { locale: fr })}
                      </p>
                      <Badge variant="secondary">
                        {format(departure, "HH:mm")}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>
                        Déposez avant {format(deadline, "HH:mm")}
                      </span>
                    </div>
                    {run.estimated_arrival && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Arrivée estimée : {format(new Date(run.estimated_arrival), "HH:mm")}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      {state.lockerSize === "LARGE" ? "25,00" : "15,00"} €
                    </p>
                    <p className="text-xs text-muted-foreground">forfait</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Button
        className="w-full"
        size="lg"
        disabled={!selectedRunId}
        onClick={handleContinue}
      >
        Continuer vers le paiement
      </Button>
    </div>
  );
}
