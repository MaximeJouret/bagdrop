import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export default async function AdminTrailersPage() {
  const supabase = await createClient();

  const { data: trailers } = await supabase
    .from("trailers")
    .select("*, lockers(id, size, status)")
    .order("name");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Remorques</h1>
      </div>

      <div className="grid gap-4">
        {trailers?.map((trailer) => {
          const lockers = (trailer as Record<string, unknown>).lockers as Array<{
            id: string;
            size: string;
            status: string;
          }>;
          const available = lockers?.filter((l) => l.status === "AVAILABLE").length || 0;
          const total = lockers?.length || 0;

          return (
            <Card key={trailer.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-semibold">{trailer.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {trailer.address}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {trailer.opening_time} — {trailer.closing_time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={trailer.active ? "secondary" : "destructive"}>
                    {trailer.active ? "Actif" : "Inactif"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {available}/{total} dispo
                  </span>
                  <Link
                    href={`/admin/trailers/${trailer.id}`}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                  >
                    Gérer
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
