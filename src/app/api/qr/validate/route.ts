import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { valid: false, error: "Token manquant" },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  const { data: booking } = await supabase
    .from("bookings")
    .select("*, lockers(label, size, trailer_id, trailers(name, address))")
    .eq("qr_code", token)
    .single();

  if (!booking) {
    return NextResponse.json(
      { valid: false, error: "Réservation introuvable" },
      { status: 404 }
    );
  }

  const now = new Date();
  const start = new Date(booking.start_time);
  const end = new Date(booking.end_time);

  // Check time window (allow 30 min early and 30 min late)
  const windowStart = new Date(start.getTime() - 30 * 60 * 1000);
  const windowEnd = new Date(end.getTime() + 30 * 60 * 1000);

  if (now < windowStart || now > windowEnd) {
    return NextResponse.json({
      valid: false,
      error: "Hors du créneau de réservation",
      booking: {
        id: booking.id,
        status: booking.status,
        start_time: booking.start_time,
        end_time: booking.end_time,
      },
    });
  }

  // State transitions
  if (booking.status === "CONFIRMED") {
    // First scan: deposit bag
    await supabase
      .from("bookings")
      .update({ status: "ACTIVE" })
      .eq("id", booking.id);

    return NextResponse.json({
      valid: true,
      action: "deposit",
      message: "Bagage déposé avec succès",
      booking: {
        id: booking.id,
        locker: (booking as Record<string, unknown>).lockers,
        start_time: booking.start_time,
        end_time: booking.end_time,
      },
    });
  }

  if (booking.status === "ACTIVE") {
    // Second scan: retrieve bag
    await supabase
      .from("bookings")
      .update({ status: "COMPLETED" })
      .eq("id", booking.id);

    // Free up the locker
    await supabase
      .from("lockers")
      .update({ status: "AVAILABLE" })
      .eq("id", booking.locker_id);

    return NextResponse.json({
      valid: true,
      action: "retrieve",
      message: "Bagage récupéré. Merci d'avoir utilisé BagDrop !",
      booking: {
        id: booking.id,
        locker: (booking as Record<string, unknown>).lockers,
      },
    });
  }

  // Already completed or cancelled
  return NextResponse.json({
    valid: false,
    error:
      booking.status === "COMPLETED"
        ? "Réservation déjà terminée"
        : "Réservation annulée",
    booking: { id: booking.id, status: booking.status },
  });
}
