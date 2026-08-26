"use client";

import { DRIVER_STATUS_LABELS, SHIPMENT_STATUS_LABELS, VEHICLE_STATUS_LABELS } from "@/i18n/dictionary";
import { useLang } from "@/i18n/LangContext";
import type { DriverStatus, ShipmentStatus, VehicleStatus } from "@/lib/types";

const SHIPMENT_COLOR: Record<ShipmentStatus, string> = {
  "on-time": "var(--color-on-time)",
  delayed: "var(--color-delayed)",
  critical: "var(--color-critical)",
  delivered: "var(--color-delivered)",
};

const DRIVER_COLOR: Record<DriverStatus, string> = {
  "on-route": "var(--color-delivered)",
  available: "var(--color-on-time)",
  "off-duty": "var(--color-text-muted)",
};

const VEHICLE_COLOR: Record<VehicleStatus, string> = {
  "in-service": "var(--color-delivered)",
  available: "var(--color-on-time)",
  maintenance: "var(--color-delayed)",
};

export function ShipmentStatusBadge({ status }: { status: ShipmentStatus }) {
  const { lang } = useLang();
  const color = SHIPMENT_COLOR[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ color, backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)` }}
    >
      <span className="size-1.5 rounded-full" style={{ backgroundColor: color }} />
      {SHIPMENT_STATUS_LABELS[status][lang]}
    </span>
  );
}

export function DriverStatusBadge({ status }: { status: DriverStatus }) {
  const { lang } = useLang();
  const color = DRIVER_COLOR[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ color, backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)` }}
    >
      <span className="size-1.5 rounded-full" style={{ backgroundColor: color }} />
      {DRIVER_STATUS_LABELS[status][lang]}
    </span>
  );
}

export function VehicleStatusBadge({ status }: { status: VehicleStatus }) {
  const { lang } = useLang();
  const color = VEHICLE_COLOR[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ color, backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)` }}
    >
      <span className="size-1.5 rounded-full" style={{ backgroundColor: color }} />
      {VEHICLE_STATUS_LABELS[status][lang]}
    </span>
  );
}
