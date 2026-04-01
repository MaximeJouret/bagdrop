export function MapSkeleton() {
  return (
    <div className="h-full w-full rounded-lg bg-muted animate-pulse flex items-center justify-center" style={{ minHeight: "500px" }}>
      <p className="text-muted-foreground">Chargement de la carte...</p>
    </div>
  );
}
