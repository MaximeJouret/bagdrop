import { TimeSlotPicker } from "@/components/booking/time-slot-picker";

export default function HorairesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Choisissez vos horaires</h1>
        <p className="text-muted-foreground">
          Sélectionnez la date, l&apos;heure de début et la durée de votre réservation.
        </p>
      </div>

      <TimeSlotPicker />
    </div>
  );
}
