"use client";

import {
  FaPhone,
  FaRegCommentDots,
  FaStar,
  FaMotorcycle,
} from "react-icons/fa";

interface DriverCardProps {
  name: string;
  vehicleType: string;
  plateNumber: string;
  isOnline: boolean;
  status: string;
  rating?: number;
  phone?: string;
  imageUrl?: string;
  eta?: number;
}

export default function DriverCard({
  name,
  vehicleType,
  plateNumber,
  isOnline,
  status,
  rating = 4.9,
  phone,
  imageUrl,
  eta = 12,
}: DriverCardProps) {
  const formattedStatus = status.replace(
    /_/g,
    " "
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-border/30 bg-card shadow-sm">
      {/* Assigned driver header */}
      <div className="border-b border-border/30 bg-primary/5 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                Assigned driver
              </span>
            </div>

            <p className="mt-3 text-sm font-medium text-foreground/60">
              Estimated arrival
            </p>

            <h2 className="mt-1 text-3xl font-bold text-foreground">
              {eta} min
            </h2>

            <p className="mt-1 text-sm font-medium capitalize text-primary">
              {formattedStatus}
            </p>
          </div>

          <div
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
              isOnline
                ? "bg-green-500/10 text-green-500"
                : "bg-gray-500/10 text-gray-500"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isOnline
                  ? "bg-green-500"
                  : "bg-gray-400"
              }`}
            />

            {isOnline ? "Online" : "Offline"}
          </div>
        </div>
      </div>

      {/* Driver information */}
      <div className="p-5">
        <div className="flex items-center gap-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
              {name.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground">
              {name}
            </h3>

            <div className="mt-1 flex items-center gap-1 text-sm">
              <FaStar className="text-yellow-500" />

              <span className="font-semibold">
                {rating.toFixed(1)}
              </span>

              <span className="text-foreground/50">
                rating
              </span>
            </div>
          </div>
        </div>

        {/* Vehicle */}
        <div className="mt-5 rounded-xl bg-background/60 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FaMotorcycle />
            </div>

            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide text-foreground/50">
                Vehicle
              </p>

              <p className="mt-1 font-semibold text-foreground">
                {vehicleType}
              </p>
            </div>

            <span className="rounded-md bg-background px-3 py-1.5 font-mono text-sm font-bold">
              {plateNumber}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <a
            href={
              phone
                ? `tel:${phone}`
                : undefined
            }
            className="flex items-center justify-center gap-2 rounded-xl border border-border/40 px-4 py-3 text-sm font-semibold transition hover:bg-background"
          >
            <FaPhone />
            Call
          </a>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <FaRegCommentDots />
            Message
          </button>
        </div>
      </div>
    </div>
  );
}