import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { TrackingView } from "@/components/tracking/tracking-map";

interface Props {
  params: Promise<{ token: string }>;
}

export default async function TrackingPage({ params }: Props) {
  const { token } = await params;
  const supabase = await createClient();

  const { data: run } = await supabase
    .from("delivery_runs")
    .select("*, trailers(name, address)")
    .eq("tracking_token", token)
    .single();

  if (!run) notFound();

  const trailer = (run as Record<string, unknown>).trailers as Record<string, unknown>;

  return (
    <div className="min-h-screen bg-background">
      <TrackingView
        runId={run.id}
        initialRun={{
          id: run.id,
          status: run.status,
          currentLat: run.current_lat,
          currentLng: run.current_lng,
          destinationLat: run.destination_lat,
          destinationLng: run.destination_lng,
          destinationAddress: run.destination_address,
          scheduledDeparture: run.scheduled_departure,
          estimatedArrival: run.estimated_arrival,
          actualArrival: run.actual_arrival,
          gpsUpdatedAt: run.gps_updated_at,
          trailerName: trailer?.name as string,
          trailerAddress: trailer?.address as string,
        }}
      />
    </div>
  );
}
