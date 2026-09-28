import type { RevenueDay } from "@/data/revenue-history";
import type { Shipment, Vehicle } from "@/lib/types";

export interface FinanceStats {
  last30Revenue: number;
  changePercent: number;
  avgShipmentValue: number;
  fleetUtilizationPercent: number;
  revenueTrend: RevenueDay[];
}

export function computeFinanceStats(shipments: Shipment[], vehicles: Vehicle[], history: RevenueDay[]): FinanceStats {
  const last30 = history.slice(-30);
  const prev30 = history.slice(-60, -30);
  const last30Revenue = last30.reduce((sum, d) => sum + d.revenue, 0);
  const prev30Revenue = prev30.reduce((sum, d) => sum + d.revenue, 0);
  const changePercent = prev30Revenue > 0 ? Math.round(((last30Revenue - prev30Revenue) / prev30Revenue) * 100) : 0;

  const avgShipmentValue = shipments.length
    ? Math.round(shipments.reduce((sum, s) => sum + s.revenue, 0) / shipments.length)
    : 0;

  const inService = vehicles.filter((v) => v.status === "in-service").length;
  const fleetUtilizationPercent = vehicles.length ? Math.round((inService / vehicles.length) * 100) : 0;

  return { last30Revenue, changePercent, avgShipmentValue, fleetUtilizationPercent, revenueTrend: last30 };
}
