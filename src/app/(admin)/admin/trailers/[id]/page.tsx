import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LockerStatusGrid } from "@/components/admin/locker-status-grid";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminTrailerDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: trailer } = await supabase
    .from("trailers")
    .select("*")
    .eq("id", id)
    .single();

  if (!trailer) notFound();

  const { data: lockers } = await supabase
    .from("lockers")
    .select("*")
    .eq("trailer_id", id)
    .order("label");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{trailer.name}</h1>
        <p className="text-muted-foreground">{trailer.address}</p>
        <div className="flex gap-2 mt-2">
          <Badge variant={trailer.active ? "secondary" : "destructive"}>
            {trailer.active ? "Actif" : "Inactif"}
          </Badge>
          <Badge variant="outline">
            {trailer.opening_time} — {trailer.closing_time}
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Casiers</CardTitle>
        </CardHeader>
        <CardContent>
          <LockerStatusGrid lockers={lockers || []} />
        </CardContent>
      </Card>
    </div>
  );
}
