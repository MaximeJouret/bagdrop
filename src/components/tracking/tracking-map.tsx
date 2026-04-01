"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Plane, MapPin, Clock, CheckCircle, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DynamicMap } from "@/components/map/dynamic-map";
import { createClient } from "@/lib/supabase/client";
import type { DeliveryStatus } from "@/types";

interface TrackingRunData {
  id: string;
  status: DeliveryStatus;
  currentLat: number | null;
  currentLng: number | null;
  destinationLat: number;
  destinationLng: number;
  destinationAddress: string;
  scheduledDeparture: string;
  estimatedArrival: string | null;
  actualArrival: string | null;
  gpsUpdatedAt: string | null;
  trailerName: string;
  trailerAddress: string;
}

interface Props {
  runId: string;
  initialRun: TrackingRunData;
}

const statusSteps: { status: DeliveryStatus; label: string; icon: typeof Plane }[] = [
  { status: "SCHEDULED", label: "Planifiée", icon: Clock },
  { status: "LOADING", label: "Chargement", icon: Truck },
  { status: "IN_TRANSIT", label: "En route", icon: Truck },
  { status: "ARRIVED", label: "Arrivée", icon: Plane },
  { status: "COMPLETED", label: "Terminée", icon: CheckCircle },
];

function getStatusIndex(status: DeliveryStatus): number {
  const idx = statusSteps.findIndex((s) => s.status === status);
  return idx >= 0 ? idx : 0;
}

export function TrackingView({ runId, initialRun }: Props) {
  const [run, setRun] = useState<TrackingRunData>(initialRun);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel(`delivery-${runId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "delivery_runs",
          filter: `id=eq.${runId}`,
        },
        (payload) => {
          const updated = payload.new as Record<string, unknown>;
          setRun((prev) => ({
            ...prev,
            status: updated.status as DeliveryStatus,
            currentLat: updated.current_lat as number | null,
            currentLng: updated.current_lng as number | null,
            gpsUpdatedAt: updated.gps_updated_at as string | null,
            actualArrival: updated.actual_arrival as string | null,
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [runId]);

  const currentStepIndex = getStatusIndex(run.status);
  const isCompleted = run.status === "COMPLETED";
  const isCancelled = run.status === "CANCELLED";

  const driverPosition =
    run.currentLat && run.currentLng
      ? { lat: run.currentLat, lng: run.currentLng }
      : null;

  const destination = { lat: run.destinationLat, lng: run.destinationLng };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Plane className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Suivi de livraison</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          {run.trailerName} → Brussels Airport
        </p>
      </div>

      {/* Status completed / cancelled */}
      {isCompleted && (
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
          <CardContent className="py-4 text-center">
            <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-2" />
            <h2 className="font-bold text-green-900 dark:text-green-100">Vos bagages sont arrivés !</h2>
            <p className="text-sm text-green-700 dark:text-green-300">
              Rendez-vous au point de rendez-vous pour récupérer vos affaires.
            </p>
          </CardContent>
        </Card>
      )}

      {isCancelled && (
        <Card className="border-destructive">
          <CardContent className="py-4 text-center">
            <p className="font-medium text-destructive">Cette livraison a été annulée.</p>
          </CardContent>
        </Card>
      )}

      {/* Map */}
      <div className="h-[300px] rounded-lg overflow-hidden border">
        <DynamicMap
          trailers={[]}
          driverPosition={driverPosition}
          destination={destination}
        />
      </div>

      {/* GPS info */}
      {run.gpsUpdatedAt && driverPosition && (
        <p className="text-xs text-center text-muted-foreground">
          Dernière mise à jour : {format(new Date(run.gpsUpdatedAt), "HH:mm:ss")}
        </p>
      )}

      {/* Status progress */}
      {!isCancelled && (
        <Card>
          <CardContent className="py-4">
            <div className="space-y-3">
              {statusSteps.map((step, index) => {
                const isActive = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;

                return (
                  <div key={step.status} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <step.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${isCurrent ? "font-semibold" : isActive ? "font-medium" : "text-muted-foreground"}`}>
                        {step.label}
                      </p>
                    </div>
                    {isCurrent && (
                      <Badge variant="default" className="text-xs">
                        En cours
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info */}
      <Card className="bg-muted/50">
        <CardContent className="py-4 space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
              <p className="font-medium">Point de rendez-vous</p>
              <p className="text-muted-foreground">{run.destinationAddress}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
              <p className="font-medium">Départ prévu</p>
              <p className="text-muted-foreground">
                {format(new Date(run.scheduledDeparture), "EEEE d MMMM à HH:mm", { locale: fr })}
              </p>
              {run.estimatedArrival && (
                <p className="text-muted-foreground">
                  Arrivée estimée : {format(new Date(run.estimatedArrival), "HH:mm")}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
