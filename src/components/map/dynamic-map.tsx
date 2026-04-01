"use client";

import dynamic from "next/dynamic";
import { MapSkeleton } from "./map-skeleton";
import type { Trailer } from "@/types";

const TrailerMap = dynamic(
  () => import("./map-container").then((mod) => mod.TrailerMap),
  { ssr: false, loading: () => <MapSkeleton /> }
);

interface DynamicMapProps {
  trailers: (Trailer & { availableSmall: number; availableLarge: number })[];
  driverPosition?: { lat: number; lng: number } | null;
  destination?: { lat: number; lng: number } | null;
}

export function DynamicMap({ trailers, driverPosition, destination }: DynamicMapProps) {
  return <TrailerMap trailers={trailers} driverPosition={driverPosition} destination={destination} />;
}
