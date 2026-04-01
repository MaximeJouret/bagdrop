import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  PENDING: { label: "En attente", variant: "outline" },
  CONFIRMED: { label: "Confirmée", variant: "secondary" },
  ACTIVE: { label: "Active", variant: "default" },
  COMPLETED: { label: "Terminée", variant: "secondary" },
  CANCELLED: { label: "Annulée", variant: "destructive" },
};

export default async function AdminReservationsPage() {
  const supabase = await createClient();

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*, lockers(label, size, trailers(name)), profiles(email, name)")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Réservations</h1>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Emplacement</TableHead>
              <TableHead>Casier</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings?.map((booking) => {
              const locker = (booking as Record<string, unknown>).lockers as Record<string, unknown>;
              const trailer = locker?.trailers as Record<string, unknown>;
              const profile = (booking as Record<string, unknown>).profiles as Record<string, unknown>;
              const status = statusLabels[booking.status] || statusLabels.PENDING;

              return (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{(profile?.name as string) || "—"}</p>
                      <p className="text-xs text-muted-foreground">
                        {profile?.email as string}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{trailer?.name as string}</TableCell>
                  <TableCell>
                    {locker?.label as string}{" "}
                    <span className="text-muted-foreground">
                      ({(locker?.size as string) === "LARGE" ? "G" : "P"})
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>
                        {format(new Date(booking.start_time), "d MMM HH:mm", {
                          locale: fr,
                        })}
                      </p>
                      <p className="text-muted-foreground">
                        → {format(new Date(booking.end_time), "HH:mm")}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {Number(booking.total_price).toFixed(2)} €
                  </TableCell>
                  <TableCell>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
            {(!bookings || bookings.length === 0) && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  Aucune réservation
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
