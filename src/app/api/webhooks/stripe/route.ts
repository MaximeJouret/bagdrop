import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateQRCodeDataURL } from "@/lib/qr";
import { sendBookingConfirmation } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const bookingId = session.metadata?.bookingId;

      if (!bookingId) break;

      // Idempotency check — skip if already confirmed
      const { data: existing } = await supabase
        .from("bookings")
        .select("status")
        .eq("id", bookingId)
        .single();

      if (existing?.status === "CONFIRMED" || existing?.status === "ACTIVE") {
        break;
      }

      // Update booking to CONFIRMED
      const { data: booking } = await supabase
        .from("bookings")
        .update({
          status: "CONFIRMED",
          payment_status: "PAID",
          stripe_payment_intent_id:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : null,
        })
        .eq("id", bookingId)
        .select("*, lockers(*, trailers(*)), profiles(*)")
        .single();

      if (!booking) break;

      // Update locker status to OCCUPIED
      await supabase
        .from("lockers")
        .update({ status: "OCCUPIED" })
        .eq("id", booking.locker_id);

      // Send confirmation email
      try {
        const locker = (booking as Record<string, unknown>).lockers as Record<string, unknown>;
        const trailer = locker?.trailers as Record<string, unknown>;
        const profile = (booking as Record<string, unknown>).profiles as Record<string, unknown>;

        if (profile?.email) {
          const qrDataUrl = await generateQRCodeDataURL(booking.qr_code);

          await sendBookingConfirmation({
            to: profile.email as string,
            bookingId: booking.id,
            trailerName: trailer?.name as string,
            trailerAddress: trailer?.address as string,
            lockerLabel: locker?.label as string,
            lockerSize: locker?.size as string,
            startTime: new Date(booking.start_time).toLocaleString("fr-BE"),
            endTime: new Date(booking.end_time).toLocaleString("fr-BE"),
            totalPrice: Number(booking.total_price),
            qrCodeDataUrl: qrDataUrl,
          });
        }
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
      }

      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object;
      const bookingId = session.metadata?.bookingId;

      if (!bookingId) break;

      await supabase
        .from("bookings")
        .update({ status: "CANCELLED", payment_status: "FAILED" })
        .eq("id", bookingId);

      break;
    }
  }

  return NextResponse.json({ received: true });
}
