"use server";

import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { generateQRToken } from "@/lib/qr";

const CreateCheckoutSchema = z.object({
  lockerId: z.string().uuid(),
  trailerId: z.string().uuid(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  totalPrice: z.number().positive(),
  lockerLabel: z.string(),
  lockerSize: z.enum(["SMALL", "LARGE"]),
  trailerName: z.string(),
});

export async function createCheckoutSession(input: z.infer<typeof CreateCheckoutSchema>) {
  const parsed = CreateCheckoutSchema.parse(input);
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Non authentifié");
  }

  // Generate unique QR code token
  const qrCode = generateQRToken();

  // Create booking in PENDING state
  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .insert({
      locker_id: parsed.lockerId,
      user_id: user.id,
      start_time: parsed.startTime,
      end_time: parsed.endTime,
      total_price: parsed.totalPrice,
      qr_code: qrCode,
      status: "PENDING",
      payment_status: "PENDING",
    })
    .select()
    .single();

  if (bookingError) {
    if (bookingError.code === "23P01") {
      // Exclusion constraint violation — locker already booked
      throw new Error("Ce casier n'est plus disponible pour ce créneau. Veuillez en choisir un autre.");
    }
    throw new Error("Erreur lors de la création de la réservation.");
  }

  // Create Stripe Checkout Session
  const sizeLabel = parsed.lockerSize === "LARGE" ? "Grand casier" : "Petit casier";
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    ui_mode: "embedded_page",
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: `BagDrop — ${sizeLabel} (${parsed.lockerLabel})`,
            description: `${parsed.trailerName}`,
          },
          unit_amount: Math.round(parsed.totalPrice * 100),
        },
        quantity: 1,
      },
    ],
    metadata: {
      bookingId: booking.id,
      userId: user.id,
    },
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
  });

  // Store session ID on booking
  await supabase
    .from("bookings")
    .update({ stripe_session_id: session.id })
    .eq("id", booking.id);

  return { clientSecret: session.client_secret };
}
