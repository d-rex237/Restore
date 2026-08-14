"use client";

import dynamic from "next/dynamic";

// Leaflet needs `window`, so it must never render on the server
const DriverMap = dynamic(() => import("./DriverMap"), { ssr: false });

interface DriverCardProps {
  name: string;
  vehicleType: string;
  plateNumber: string;
  isOnline: boolean;
  status: string;
  latitude: number;
  longitude: number;
}

export default function DriverCard({
  name,
  vehicleType,
  plateNumber,
  isOnline,
  status,
  latitude,
  longitude,
}: DriverCardProps) {
  return (
    <div className="bg-card/50 border border-border/30 rounded-xl shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-foreground">{name}</h3>
              <span
                className={`w-2 h-2 rounded-full ${
                  isOnline ? "bg-green-500" : "bg-gray-400"
                }`}
              />
            </div>
            <p className="text-sm text-foreground/60">
              {vehicleType} · {plateNumber}
            </p>
          </div>
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
            {status.replace(/_/g, " ")}
          </span>
        </div>
      </div>

      <DriverMap latitude={latitude} longitude={longitude} driverName={name} />
    </div>
  );
}