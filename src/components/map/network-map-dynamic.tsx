"use client";

import dynamic from "next/dynamic";

const NetworkMapImpl = dynamic(
  () => import("./network-map").then((mod) => mod.NetworkMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full h-[560px] bg-[var(--brand-cream)] animate-pulse rounded-3xl flex items-center justify-center"
        aria-label="Chargement de la carte"
      >
        <div className="text-sm text-muted-foreground">
          Chargement de la carte…
        </div>
      </div>
    ),
  }
);

export function NetworkMapDynamic() {
  return <NetworkMapImpl />;
}
