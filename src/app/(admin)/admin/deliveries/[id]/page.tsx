import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Plane, MapPin, Clock, Navigation, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { DeliveryStatusActions } from "./delivery-status-actions";

interface Props {
  params: Promise<{ id: string }>;
}

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  SCHEDULED: { label: "Planifiée", variant: "secondary" },
  LOADING: { label: "Chargement", variant: "outline" },
  IN_TRANSIT: { label: "En route", variant: "default" },
  ARRIVED: { label: "Arrivée", variant: "default" },
  COMPLETED: { label: "Terminée", variant: "secondary" },
  CANCELLED: { label: "Annulée", variant: "destructive" },
};

export default async function DeliveryDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: run } = await supabase
    .from("delivery_runs")
    .select("*, trailers(name, address)")
    .eq("id", id)
    .single();

  if (!run) notFound();

  const trailer = (run as Record<string, unknown>).trailers as Record<string, unknown>;

  // Fetch bookings linked to this delivery run
  const { data: bookings } = await supabase
    .from("bookings")
    .select("*, lockers(label, size), profiles(email, name)")
    .eq("delivery_run_id", id)
    .order("created_at", { ascending: false });

  const status = statusLabels[run.status] || { label: run.status, variant: "outline" as const };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold">Livraison</h1>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
          <p className="text-muted-foreground">{trailer?.name as string}</p>
        </div>
        {(run.status === "SCHEDULED" || run.status === "LOADING" || run.status === "IN_TRANSIT") && (
          <Link
            href={`/admin/deliveries/${run.id}/drive`}
            className={cn(buttonVariants(), "gap-2")}
          >
            <Navigation className="h-4 w-4" />
            Mode chauffeur
          </Link>
        )}
      </div>

      {/* Delivery info */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Départ</p>
                <p className="font-medium">{trailer?.name as string}</p>
                <p className="text-sm text-muted-foreground">{trailer?.address as string}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <Plane className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Destination</p>
                <p className="font-medium">Brussels Airport</p>
                <p className="text-sm text-muted-foreground">{run.destination_address}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Départ prévu</p>
                <p className="font-medium">
                  {format(new Date(run.scheduled_departure), "EEEE d MMMM yyyy à HH:mm", { locale: fr })}
                </p>
                {run.actual_departure && (
                  <p className="text-xs text-muted-foreground">
                    Départ réel : {format(new Date(run.actual_departure), "HH:mm")}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Bagages</p>
                <p className="font-medium">{bookings?.length || 0} réservation(s)</p>
                <p className="text-xs text-muted-foreground">
                  Tracking : /tracking/{run.tracking_token}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status actions */}
      <DeliveryStatusActions runId={run.id} currentStatus={run.status} />

      {/* Bookings list */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Réservations liées</CardTitle>
        </CardHeader>
        <CardContent>
          {(!bookings || bookings.length === 0) ? (
            <p className="text-muted-foreground text-sm">Aucune réservation pour cette livraison.</p>
          ) : (
            <div className="space-y-2">
              {bookings.map((booking) => {
                const locker = (booking as Record<string, unknown>).lockers as Record<string, unknown>;
                const profile = (booking as Record<string, unknown>).profiles as Record<string, unknown>;

                return (
                  <div key={booking.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="text-sm font-medium">
                        {profile?.email as string}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Casier {locker?.label as string} ({(locker?.size as string) === "LARGE" ? "Grand" : "Petit"})
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={booking.status === "CONFIRMED" ? "default" : "secondary"}>
                        {booking.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {Number(booking.total_price).toFixed(2)} €
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
