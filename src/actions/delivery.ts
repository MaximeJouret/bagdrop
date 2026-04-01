"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const CreateDeliveryRunSchema = z.object({
  trailerId: z.string().uuid(),
  scheduledDeparture: z.string().datetime(),
});

export async function createDeliveryRun(input: z.infer<typeof CreateDeliveryRunSchema>) {
  const parsed = CreateDeliveryRunSchema.parse(input);
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Non authentifié");

  // Verify admin role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "ADMIN") throw new Error("Accès refusé");

  // Deposit deadline = 30 minutes before departure
  const departure = new Date(parsed.scheduledDeparture);
  const depositDeadline = new Date(departure.getTime() - 30 * 60 * 1000);

  const { data, error } = await supabase
    .from("delivery_runs")
    .insert({
      trailer_id: parsed.trailerId,
      scheduled_departure: parsed.scheduledDeparture,
      estimated_arrival: new Date(departure.getTime() + 45 * 60 * 1000).toISOString(),
    })
    .select()
    .single();

  if (error) throw new Error("Erreur lors de la création de la livraison");

  return { deliveryRun: data, depositDeadline: depositDeadline.toISOString() };
}

const UpdateDeliveryStatusSchema = z.object({
  runId: z.string().uuid(),
  status: z.enum(["SCHEDULED", "LOADING", "IN_TRANSIT", "ARRIVED", "COMPLETED", "CANCELLED"]),
});

export async function updateDeliveryStatus(input: z.infer<typeof UpdateDeliveryStatusSchema>) {
  const parsed = UpdateDeliveryStatusSchema.parse(input);
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Non authentifié");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "ADMIN") throw new Error("Accès refusé");

  const updateData: Record<string, unknown> = { status: parsed.status };

  if (parsed.status === "IN_TRANSIT") {
    updateData.actual_departure = new Date().toISOString();
  } else if (parsed.status === "ARRIVED") {
    updateData.actual_arrival = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("delivery_runs")
    .update(updateData)
    .eq("id", parsed.runId)
    .select()
    .single();

  if (error) throw new Error("Erreur lors de la mise à jour du statut");

  return data;
}
