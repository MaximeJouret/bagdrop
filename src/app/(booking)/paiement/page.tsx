"use client";

import { useState, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useBookingFlow } from "@/hooks/use-booking-flow";
import { createCheckoutSession } from "@/actions/payment";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function PaiementPage() {
  const router = useRouter();
  const { state } = useBookingFlow();
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    if (
      !state.lockerId ||
      !state.trailerId ||
      !state.totalPrice ||
      !state.lockerLabel ||
      !state.lockerSize ||
      !state.trailerName
    ) {
      throw new Error("Données de réservation manquantes");
    }

    // For delivery bookings, use deposit deadline as start and departure as end
    const isDelivery = state.bookingType === "DELIVERY";
    if (!isDelivery && (!state.startTime || !state.endTime)) {
      throw new Error("Données de réservation manquantes");
    }

    const startTime = isDelivery
      ? (state.depositDeadline || new Date().toISOString())
      : state.startTime!;
    const endTime = isDelivery
      ? (state.depositDeadline || new Date().toISOString())
      : state.endTime!;

    try {
      const result = await createCheckoutSession({
        lockerId: state.lockerId,
        trailerId: state.trailerId,
        startTime,
        endTime,
        totalPrice: state.totalPrice,
        lockerLabel: state.lockerLabel,
        lockerSize: state.lockerSize,
        trailerName: state.trailerName,
        bookingType: state.bookingType,
        deliveryRunId: state.deliveryRunId,
        depositDeadline: state.depositDeadline,
      });

      return result.clientSecret!;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur inconnue";
      setError(message);
      throw err;
    }
  }, [state]);

  // Redirect if no booking state
  if (!state.lockerId || !state.totalPrice) {
    router.push("/");
    return null;
  }

  if (error) {
    return (
      <div className="space-y-4 text-center py-8">
        <p className="text-destructive font-medium">{error}</p>
        <button
          onClick={() => router.back()}
          className="text-sm text-muted-foreground hover:text-foreground underline"
        >
          Retour
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Paiement</h1>
        <p className="text-muted-foreground">
          Finalisez votre réservation en toute sécurité.
        </p>
      </div>

      <div id="checkout">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ fetchClientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}
