import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { generateQRCodeDataURL } from "@/lib/qr";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CheckCircle, MapPin, Clock, QrCode, Plane, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function ConfirmationPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  if (!session_id) redirect("/");

  // Verify session with Stripe
  const session = await stripe.checkout.sessions.retrieve(session_id);
  if (session.status !== "complete") redirect("/");

  const bookingId = session.metadata?.bookingId;
  if (!bookingId) redirect("/");

  const supabase = await createClient();

  // Fetch booking with locker and trailer info
  const { data: booking } = await supabase
    .from("bookings")
    .select("*, lockers(*, trailers(*))")
    .eq("id", bookingId)
    .single();

  if (!booking) redirect("/");

  const locker = (booking as Record<string, unknown>).lockers as Record<string, unknown>;
  const trailer = locker?.trailers as Record<string, unknown>;
  const isDelivery = booking.booking_type === "DELIVERY";

  // Fetch delivery run info if delivery booking
  let deliveryRun = null;
  if (isDelivery && booking.delivery_run_id) {
    const { data } = await supabase
      .from("delivery_runs")
      .select("*")
      .eq("id", booking.delivery_run_id)
      .single();
    deliveryRun = data;
  }

  // Generate QR code image
  const qrDataUrl = await generateQRCodeDataURL(booking.qr_code);

  return (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center gap-3">
        <CheckCircle className="h-16 w-16 text-green-500" />
        <h1 className="text-2xl font-bold">
          {isDelivery ? "Livraison confirmée !" : "Réservation confirmée !"}
        </h1>
        <p className="text-muted-foreground">
          {isDelivery
            ? "Votre bagage sera livré à Brussels Airport. Présentez le QR code pour déposer votre bagage."
            : "Votre casier est réservé. Présentez le QR code ci-dessous à votre arrivée."}
        </p>
      </div>

      {/* QR Code */}
      <Card className="max-w-sm mx-auto">
        <CardContent className="flex flex-col items-center py-6">
          <QrCode className="h-6 w-6 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-4">Votre QR code d&apos;accès</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrDataUrl}
            alt="QR Code de réservation"
            width={250}
            height={250}
            className="rounded-lg"
          />
        </CardContent>
      </Card>

      {/* Booking details */}
      <Card className="max-w-sm mx-auto bg-muted/50">
        <CardContent className="py-5 text-left">
          <h3 className="font-semibold mb-3">Détails de la réservation</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium">{trailer?.name as string}</p>
                <p className="text-muted-foreground">{trailer?.address as string}</p>
              </div>
            </div>

            {isDelivery && deliveryRun ? (
              <>
                <div className="flex items-start gap-2">
                  <Plane className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Livraison aéroport</p>
                    <p className="text-muted-foreground">{deliveryRun.destination_address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p>
                      Départ : {format(new Date(deliveryRun.scheduled_departure), "d MMMM yyyy à HH:mm", { locale: fr })}
                    </p>
                    {booking.deposit_deadline && (
                      <p className="text-amber-600 font-medium">
                        Déposez avant {format(new Date(booking.deposit_deadline), "HH:mm")}
                      </p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p>
                    {format(new Date(booking.start_time), "d MMMM yyyy", { locale: fr })}
                  </p>
                  <p className="text-muted-foreground">
                    {format(new Date(booking.start_time), "HH:mm")} —{" "}
                    {format(new Date(booking.end_time), "HH:mm")}
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-2 border-t">
              <span>Casier {locker?.label as string} ({(locker?.size as string) === "LARGE" ? "Grand" : "Petit"})</span>
              <span className="font-semibold">{Number(booking.total_price).toFixed(2)} €</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tracking link for delivery bookings */}
      {isDelivery && deliveryRun && (
        <Card className="max-w-sm mx-auto border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
          <CardContent className="py-4">
            <div className="flex items-center gap-2 mb-2">
              <Plane className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">Suivi en temps réel</h3>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
              Suivez votre bagage en direct pendant le transport vers l&apos;aéroport.
            </p>
            <Link
              href={`/tracking/${deliveryRun.tracking_token}`}
              className={cn(buttonVariants({ size: "sm" }), "gap-2")}
            >
              <ExternalLink className="h-4 w-4" />
              Suivre ma livraison
            </Link>
          </CardContent>
        </Card>
      )}

      <p className="text-sm text-muted-foreground">
        Un email de confirmation {isDelivery ? "avec le lien de suivi " : ""}vous a été envoyé.
      </p>

      <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
