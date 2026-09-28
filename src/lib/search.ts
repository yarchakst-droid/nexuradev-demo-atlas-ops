import type { Driver, Shipment, Vehicle } from "@/lib/types";

function includesQuery(fields: string[], query: string): boolean {
  const needle = query.toLowerCase();
  return fields.some((f) => f.toLowerCase().includes(needle));
}

export function matchShipment(s: Shipment, driverName: string, query: string): boolean {
  return includesQuery(
    [s.code, s.origin.uk, s.origin.en, s.origin.ru, s.destination.uk, s.destination.en, s.destination.ru, driverName],
    query,
  );
}

export function matchDriver(d: Driver, query: string): boolean {
  return includesQuery([d.name, d.plate, d.vehicle], query);
}

export function matchVehicle(v: Vehicle, query: string): boolean {
  return includesQuery([v.model, v.plate], query);
}
