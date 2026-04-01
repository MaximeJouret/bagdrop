import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Plane, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { CreateDeliveryForm } from "./create-delivery-form";

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  SCHEDULED: { label: "Planifiée", variant: "secondary" },
  LOADING: { label: "Chargement", variant: "outline" },
  IN_TRANSIT: { label: "En route", variant: "default" },
  ARRIVED: { label: "Arrivée", variant: "default" },
  COMPLETED: { label: "Terminée", variant: "secondary" },
  CANCELLED: { label: "Annulée", variant: "destructive" },
};

export default async function AdminDeliveriesPage() {
  const supabase = await createClient();

  const { data: deliveryRuns } = await supabase
    .from("delivery_runs")
    .select("*, trailers(name)")
    .order("scheduled_departure", { ascending: false })
    .limit(50);

  const { data: trailers } = await supabase
    .from("trailers")
    .select("id, name")
    .eq("active", true)
    .order("name");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Livraisons aéroport</h1>
          <p className="text-muted-foreground">Gérez les courses vers Brussels Airport</p>
        </div>
      </div>

      {/* Create new delivery run form */}
      <CreateDeliveryForm trailers={trailers || []} />

      {/* Delivery runs list */}
      <div className="space-y-3">
        {(!deliveryRuns || deliveryRuns.length === 0) ? (
          <Card>
            <CardContent className="py-8 text-center">
              <Plane className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Aucune livraison planifiée</p>
            </CardContent>
          </Card>
        ) : (
          deliveryRuns.map((run) => {
            const trailer = (run as Record<string, unknown>).trailers as Record<string, unknown> | null;
            const status = statusLabels[run.status] || { label: run.status, variant: "outline" as const };

            return (
              <Link key={run.id} href={`/admin/deliveries/${run.id}`}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="flex items-center gap-4 py-4">
                    <div className="p-2 rounded-lg bg-muted">
                      <Plane className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">{trailer?.name as string}</p>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(run.scheduled_departure), "EEEE d MMMM yyyy à HH:mm", { locale: fr })}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {run.destination_address}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
