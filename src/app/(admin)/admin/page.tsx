import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Box, CalendarRange, CircleDollarSign } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: trailerCount },
    { count: lockerCount },
    { count: activeBookings },
    { data: recentBookings },
  ] = await Promise.all([
    supabase.from("trailers").select("*", { count: "exact", head: true }),
    supabase.from("lockers").select("*", { count: "exact", head: true }),
    supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .in("status", ["CONFIRMED", "ACTIVE"]),
    supabase
      .from("bookings")
      .select("total_price")
      .eq("payment_status", "PAID")
      .limit(1000),
  ]);

  const totalRevenue =
    recentBookings?.reduce((sum, b) => sum + Number(b.total_price), 0) || 0;

  const stats = [
    {
      title: "Remorques",
      value: trailerCount || 0,
      icon: Truck,
    },
    {
      title: "Casiers",
      value: lockerCount || 0,
      icon: Box,
    },
    {
      title: "Réservations actives",
      value: activeBookings || 0,
      icon: CalendarRange,
    },
    {
      title: "Revenus totaux",
      value: `${totalRevenue.toFixed(2)} €`,
      icon: CircleDollarSign,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Admin</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
