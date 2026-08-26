import type { Driver, LocalizedText, Shipment, ShipmentStatus, Vehicle } from "@/lib/types";

export interface ReportsData {
  statusBreakdown: { status: ShipmentStatus; count: number }[];
  topDrivers: { driverId: string; name: string; completedDeliveries: number }[];
  topDestinations: { destination: LocalizedText; count: number }[];
  fleetSummary: { inService: number; available: number; maintenance: number };
}

const STATUS_ORDER: ShipmentStatus[] = ["on-time", "delayed", "critical", "delivered"];

export function computeReports(shipments: Shipment[], drivers: Driver[], vehicles: Vehicle[]): ReportsData {
  const statusBreakdown = STATUS_ORDER.map((status) => ({
    status,
    count: shipments.filter((s) => s.status === status).length,
  }));

  const topDrivers = [...drivers]
    .sort((a, b) => b.completedDeliveries - a.completedDeliveries)
    .slice(0, 5)
    .map((d) => ({ driverId: d.id, name: d.name, completedDeliveries: d.completedDeliveries }));

  const destinationCounts = new Map<string, { destination: LocalizedText; count: number }>();
  for (const s of shipments) {
    const key = s.destination.uk;
    const existing = destinationCounts.get(key);
    if (existing) existing.count += 1;
    else destinationCounts.set(key, { destination: s.destination, count: 1 });
  }
  const topDestinations = [...destinationCounts.values()].sort((a, b) => b.count - a.count).slice(0, 5);

  const fleetSummary = {
    inService: vehicles.filter((v) => v.status === "in-service").length,
    available: vehicles.filter((v) => v.status === "available").length,
    maintenance: vehicles.filter((v) => v.status === "maintenance").length,
  };

  return { statusBreakdown, topDrivers, topDestinations, fleetSummary };
}
