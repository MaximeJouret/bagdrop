"use client";

import { usePathname } from "next/navigation";
import { useBookingFlow } from "@/hooks/use-booking-flow";
import { cn } from "@/lib/utils";

const storageSteps = [
  { label: "Casier", path: "/reserver" },
  { label: "Horaires", path: "/horaires" },
  { label: "Paiement", path: "/paiement" },
  { label: "Confirmation", path: "/confirmation" },
];

const deliverySteps = [
  { label: "Casier", path: "/reserver" },
  { label: "Livraison", path: "/livraison" },
  { label: "Paiement", path: "/paiement" },
  { label: "Confirmation", path: "/confirmation" },
];

export function BookingStepper() {
  const pathname = usePathname();
  const { state } = useBookingFlow();

  const steps = state.bookingType === "DELIVERY" ? deliverySteps : storageSteps;

  function getStepIndex() {
    if (pathname.startsWith("/reserver")) return 0;
    if (pathname.startsWith("/horaires") || pathname.startsWith("/livraison")) return 1;
    if (pathname.startsWith("/paiement")) return 2;
    if (pathname.startsWith("/confirmation")) return 3;
    return 0;
  }

  const currentStep = getStepIndex();

  return (
    <div className="flex items-center justify-center gap-2 py-6">
      {steps.map((step, index) => (
        <div key={step.path} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors",
                index < currentStep
                  ? "bg-primary border-primary text-primary-foreground"
                  : index === currentStep
                    ? "border-primary text-primary"
                    : "border-muted text-muted-foreground"
              )}
            >
              {index < currentStep ? "✓" : index + 1}
            </div>
            <span
              className={cn(
                "text-sm hidden sm:inline",
                index <= currentStep ? "text-foreground font-medium" : "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "w-8 sm:w-12 h-0.5",
                index < currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
