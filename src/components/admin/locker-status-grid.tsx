"use client";

import { cn } from "@/lib/utils";
import type { Locker } from "@/types";

interface LockerStatusGridProps {
  lockers: Locker[];
}

const statusConfig = {
  AVAILABLE: { label: "Disponible", color: "bg-green-100 text-green-800 border-green-200" },
  OCCUPIED: { label: "Occupé", color: "bg-red-100 text-red-800 border-red-200" },
  MAINTENANCE: { label: "Maintenance", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
};

export function LockerStatusGrid({ lockers }: LockerStatusGridProps) {
  return (
    <div>
      {/* Legend */}
      <div className="flex gap-4 mb-4 text-xs">
        {Object.entries(statusConfig).map(([key, config]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className={cn("w-3 h-3 rounded border", config.color)} />
            <span>{config.label}</span>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {lockers.map((locker) => {
          const config = statusConfig[locker.status];
          return (
            <div
              key={locker.id}
              className={cn(
                "rounded-lg border p-3 text-center transition-colors",
                config.color
              )}
            >
              <p className="font-bold text-lg">{locker.label}</p>
              <p className="text-xs mt-1">
                {locker.size === "LARGE" ? "Grand" : "Petit"}
              </p>
              <p className="text-xs mt-0.5">{config.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
