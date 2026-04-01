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
}

export function DynamicMap({ trailers }: DynamicMapProps) {
  return <TrailerMap trailers={trailers} />;
}
