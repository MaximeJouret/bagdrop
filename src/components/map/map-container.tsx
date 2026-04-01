"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Trailer } from "@/types";

// Fix default marker icons for Leaflet + webpack
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface TrailerMapProps {
  trailers: (Trailer & { availableSmall: number; availableLarge: number })[];
}

const BRUSSELS_CENTER: [number, number] = [50.8503, 4.3517];

export function TrailerMap({ trailers }: TrailerMapProps) {
  return (
    <MapContainer
      center={BRUSSELS_CENTER}
      zoom={13}
      scrollWheelZoom
      className="h-full w-full rounded-lg"
      style={{ minHeight: "500px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {trailers.map((trailer) => (
        <Marker
          key={trailer.id}
          position={[trailer.latitude, trailer.longitude]}
        >
          <Popup>
            <div className="min-w-[200px]">
              <h3 className="font-semibold text-base mb-1">{trailer.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {trailer.address}
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                {trailer.opening_time} — {trailer.closing_time}
              </p>
              <div className="flex gap-2 mb-3">
                <Badge variant="secondary">
                  {trailer.availableSmall} petit{trailer.availableSmall > 1 ? "s" : ""}
                </Badge>
                <Badge variant="secondary">
                  {trailer.availableLarge} grand{trailer.availableLarge > 1 ? "s" : ""}
                </Badge>
              </div>
              <Link
                href={`/reserver/${trailer.id}`}
                className={cn(buttonVariants({ size: "sm" }), "w-full")}
              >
                Réserver
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
