// components/orders/order-status-select.tsx
"use client";

import { Loader2 } from "lucide-react";

export type StatusOption = { value: string; label: string };

export const PROVIDER_STATUS_OPTIONS: StatusOption[] = [
  { value: "ACCEPTED", label: "Accepted" },
  { value: "PREPARING", label: "Preparing" },
  { value: "READY_FOR_PICKUP", label: "Ready for pickup" },
  { value: "REJECTED", label: "Rejected" },
  { value: "CANCELLED", label: "Cancelled" },
];

export const DRIVER_STATUS_OPTIONS: StatusOption[] = [
  { value: "OUT_FOR_DELIVERY", label: "Out for delivery" },
  { value: "DELIVERED", label: "Delivered" },
];

export const ADMIN_STATUS_OPTIONS: StatusOption[] = [
  { value: "PENDING", label: "Pending" },
  { value: "ACCEPTED", label: "Accepted" },
  { value: "PREPARING", label: "Preparing" },
  { value: "READY_FOR_PICKUP", label: "Ready for pickup" },
  { value: "OUT_FOR_DELIVERY", label: "Out for delivery" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "REJECTED", label: "Rejected" },
  { value: "CANCELLED", label: "Cancelled" },
];

export function OrderStatusSelect({
  currentStatus, // lowercase, as stored on MappedOrder
  options,
  disabled,
  onChange,
}: {
  currentStatus: string;
  options: StatusOption[];
  disabled?: boolean;
  onChange: (status: string) => void;
}) {
  return (
    <div className="relative inline-flex items-center">
      <select
        value={currentStatus.toUpperCase()}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs capitalize disabled:opacity-50"
        aria-label="Update order status"
      >
        {/* Always show the current status even if it's not one of the
            role's allowed targets (e.g. driver viewing a PENDING order),
            so the select doesn't silently jump to the first option. */}
        {!options.some((o) => o.value === currentStatus.toUpperCase()) && (
          <option value={currentStatus.toUpperCase()} disabled>
            {currentStatus.replaceAll("_", " ")}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {disabled && (
        <Loader2 size={14} className="ml-2 animate-spin text-gray-400" />
      )}
    </div>
  );
}
