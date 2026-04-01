"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { updateDeliveryStatus } from "@/actions/delivery";
import type { DeliveryStatus } from "@/types";

interface Props {
  runId: string;
  currentStatus: DeliveryStatus;
}

const statusFlow: { from: DeliveryStatus; to: DeliveryStatus; label: string; variant: "default" | "destructive" | "outline" }[] = [
  { from: "SCHEDULED", to: "LOADING", label: "Commencer le chargement", variant: "default" },
  { from: "LOADING", to: "IN_TRANSIT", label: "Départ — En route", variant: "default" },
  { from: "IN_TRANSIT", to: "ARRIVED", label: "Arrivé à l'aéroport", variant: "default" },
  { from: "ARRIVED", to: "COMPLETED", label: "Terminer la livraison", variant: "default" },
  { from: "SCHEDULED", to: "CANCELLED", label: "Annuler", variant: "destructive" },
];

export function DeliveryStatusActions({ runId, currentStatus }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const availableActions = statusFlow.filter((s) => s.from === currentStatus);

  if (availableActions.length === 0) return null;

  async function handleAction(to: DeliveryStatus) {
    setLoading(true);
    try {
      await updateDeliveryStatus({ runId, status: to });
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="py-4">
        <p className="text-sm font-medium mb-3">Actions</p>
        <div className="flex flex-wrap gap-2">
          {availableActions.map((action) => (
            <Button
              key={action.to}
              variant={action.variant}
              size="sm"
              disabled={loading}
              onClick={() => handleAction(action.to)}
            >
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {action.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
