import { createReadOnlyClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { MapPin, Clock } from "lucide-react";
import { LockerPicker } from "@/components/booking/locker-picker";

interface Props {
  params: Promise<{ trailerId: string }>;
}

export default async function ReserverPage({ params }: Props) {
  const { trailerId } = await params;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Ensure Supabase is configured
  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Configuration en cours</h1>
        <p className="text-muted-foreground">
          Le service de réservation sera bientôt disponible.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          URL: {supabaseUrl ? "set" : "missing"} | Key: {supabaseKey ? "set" : "missing"}
        </p>
      </div>
    );
  }

  try {
    const supabase = createReadOnlyClient();

    const { data: trailer, error: trailerError } = await supabase
      .from("trailers")
      .select("*")
      .eq("id", trailerId)
      .eq("active", true)
      .single();

    if (trailerError) {
      console.error("Trailer query error:", JSON.stringify(trailerError));
      return (
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Erreur de chargement</h1>
          <p className="text-muted-foreground">
            Impossible de charger cet emplacement. Code: {trailerError.code}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {trailerError.message}
          </p>
        </div>
      );
    }

    if (!trailer) notFound();

    const { data: lockers } = await supabase
      .from("lockers")
      .select("*")
      .eq("trailer_id", trailerId)
      .order("label");

    // Fetch delivery prices
    const { data: deliveryPrices } = await supabase
      .from("delivery_prices")
      .select("*")
      .eq("active", true);

    // Check if there are upcoming scheduled deliveries for this trailer
    const { data: upcomingDeliveries } = await supabase
      .from("delivery_runs")
      .select("id")
      .eq("trailer_id", trailerId)
      .eq("status", "SCHEDULED")
      .gte("scheduled_departure", new Date().toISOString())
      .limit(1);

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Choisissez votre casier</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {trailer.name} — {trailer.address}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {trailer.opening_time} — {trailer.closing_time}
            </span>
          </div>
        </div>

        <LockerPicker
          lockers={lockers || []}
          trailerName={trailer.name}
          trailerAddress={trailer.address}
          trailerId={trailer.id}
          deliveryPrices={deliveryPrices || []}
          hasUpcomingDeliveries={(upcomingDeliveries?.length ?? 0) > 0}
        />
      </div>
    );
  } catch (error) {
    console.error("ReserverPage error:", error);
    const errMsg = error instanceof Error ? error.message : String(error);
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Erreur</h1>
        <p className="text-muted-foreground">{errMsg}</p>
      </div>
    );
  }
}
