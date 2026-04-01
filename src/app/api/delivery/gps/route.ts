import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  // Verify admin role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "ADMIN") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const body = await request.json();
  const { runId, lat, lng } = body;

  if (!runId || typeof lat !== "number" || typeof lng !== "number") {
    return NextResponse.json({ error: "Paramètres invalides" }, { status: 400 });
  }

  const { error } = await supabase
    .from("delivery_runs")
    .update({
      current_lat: lat,
      current_lng: lng,
      gps_updated_at: new Date().toISOString(),
    })
    .eq("id", runId);

  if (error) {
    return NextResponse.json({ error: "Erreur mise à jour GPS" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
