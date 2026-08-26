import type { Shipment } from "@/lib/types";

export interface DashboardStats {
  active: number;
  onTimePercent: number;
  delayed: number;
  critical: number;
  deliveredToday: number;
}

export function computeStats(shipments: Shipment[]): DashboardStats {
  const active = shipments.filter((s) => s.status !== "delivered");
  const onTime = active.filter((s) => s.status === "on-time");
  const delayed = shipments.filter((s) => s.status === "delayed");
  const critical = shipments.filter((s) => s.status === "critical");
  const delivered = shipments.filter((s) => s.status === "delivered");

  return {
    active: active.length,
    onTimePercent: active.length > 0 ? Math.round((onTime.length / active.length) * 100) : 100,
    delayed: delayed.length,
    critical: critical.length,
    deliveredToday: delivered.length,
  };
}
