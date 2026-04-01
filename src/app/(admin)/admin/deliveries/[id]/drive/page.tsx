"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navigation, Square, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { updateDeliveryStatus } from "@/actions/delivery";
import type { DeliveryRun } from "@/types";
import { DynamicMap } from "@/components/map/dynamic-map";

export default function DriverPage() {
  const params = useParams();
  const router = useRouter();
  const runId = params.id as string;

  const [run, setRun] = useState<DeliveryRun | null>(null);
  const [tracking, setTracking] = useState(false);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const watchIdRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    async function fetchRun() {
      const supabase = createClient();
      const { data } = await supabase
        .from("delivery_runs")
        .select("*")
        .eq("id", runId)
        .single();
      setRun(data);
      setLoading(false);
    }
    fetchRun();
  }, [runId]);

  const sendGPS = useCallback(async (lat: number, lng: number) => {
    try {
      await fetch("/api/delivery/gps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ runId, lat, lng }),
      });
    } catch (err) {
      console.error("GPS send error:", err);
    }
  }, [runId]);

  function startTracking() {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
      return;
    }

    setTracking(true);

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => {
        console.error("Geolocation error:", err);
      },
      { enableHighAccuracy: true, maximumAge: 5000 }
    );

    // Send GPS every 5 seconds
    intervalRef.current = setInterval(() => {
      if (position) {
        sendGPS(position.lat, position.lng);
      }
    }, 5000);
  }

  function stopTracking() {
    setTracking(false);
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  // Send GPS immediately when position changes while tracking
  useEffect(() => {
    if (tracking && position) {
      sendGPS(position.lat, position.lng);
    }
  }, [position, tracking, sendGPS]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  async function handleStatusChange(status: "IN_TRANSIT" | "ARRIVED" | "COMPLETED") {
    setStatusLoading(true);
    try {
      await updateDeliveryStatus({ runId, status });
      const supabase = createClient();
      const { data } = await supabase
        .from("delivery_runs")
        .select("*")
        .eq("id", runId)
        .single();
      setRun(data);

      if (status === "COMPLETED") {
        stopTracking();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setStatusLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!run) {
    return <p className="text-center text-muted-foreground py-8">Livraison introuvable</p>;
  }

  const statusLabel: Record<string, string> = {
    SCHEDULED: "Planifiée",
    LOADING: "Chargement",
    IN_TRANSIT: "En route",
    ARRIVED: "Arrivée",
    COMPLETED: "Terminée",
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="text-center">
        <h1 className="text-xl font-bold">Mode chauffeur</h1>
        <Badge className="mt-1">{statusLabel[run.status] || run.status}</Badge>
      </div>

      {/* Map showing position + destination */}
      <div className="h-[300px] rounded-lg overflow-hidden border">
        {position ? (
          <DynamicMap
            trailers={[]}
            driverPosition={position}
            destination={{ lat: run.destination_lat, lng: run.destination_lng }}
          />
        ) : (
          <div className="h-full flex items-center justify-center bg-muted">
            <p className="text-muted-foreground text-sm">
              {tracking ? "Acquisition GPS..." : "Démarrez le tracking pour voir la carte"}
            </p>
          </div>
        )}
      </div>

      {/* GPS info */}
      {position && (
        <Card>
          <CardContent className="py-3 text-center">
            <p className="text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 inline mr-1" />
              {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Tracking toggle */}
      <div className="flex justify-center">
        {!tracking ? (
          <Button size="lg" className="gap-2 w-full" onClick={startTracking}>
            <Navigation className="h-5 w-5" />
            Démarrer le tracking GPS
          </Button>
        ) : (
          <Button size="lg" variant="destructive" className="gap-2 w-full" onClick={stopTracking}>
            <Square className="h-5 w-5" />
            Arrêter le tracking
          </Button>
        )}
      </div>

      {/* Status actions */}
      <div className="space-y-2">
        {run.status === "LOADING" && (
          <Button
            className="w-full"
            disabled={statusLoading}
            onClick={() => handleStatusChange("IN_TRANSIT")}
          >
            {statusLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Départ — En route vers l&apos;aéroport
          </Button>
        )}
        {run.status === "IN_TRANSIT" && (
          <Button
            className="w-full"
            disabled={statusLoading}
            onClick={() => handleStatusChange("ARRIVED")}
          >
            {statusLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Arrivé à l&apos;aéroport
          </Button>
        )}
        {run.status === "ARRIVED" && (
          <Button
            className="w-full"
            disabled={statusLoading}
            onClick={() => handleStatusChange("COMPLETED")}
          >
            {statusLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Terminer la livraison
          </Button>
        )}
      </div>
    </div>
  );
}
