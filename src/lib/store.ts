import { shipments as seedShipments } from "@/data/shipments";
import { vehicles as seedVehicles } from "@/data/vehicles";
import { DICTIONARIES } from "@/i18n/dictionary";
import type { Lang, Shipment, ShipmentStatus, Vehicle, VehicleStatus } from "@/lib/types";

declare global {
  var __atlasOpsShipments: Shipment[] | undefined;
  var __atlasOpsVehicles: Vehicle[] | undefined;
}

function store(): Shipment[] {
  if (!globalThis.__atlasOpsShipments) {
    globalThis.__atlasOpsShipments = seedShipments.map((s) => ({
      ...s,
      timeline: s.timeline.map((t) => ({ ...t })),
    }));
  }
  return globalThis.__atlasOpsShipments;
}

function vehicleStore(): Vehicle[] {
  if (!globalThis.__atlasOpsVehicles) {
    globalThis.__atlasOpsVehicles = seedVehicles.map((v) => ({ ...v }));
  }
  return globalThis.__atlasOpsVehicles;
}

export function getVehicles(): Vehicle[] {
  return vehicleStore();
}

const ALLOWED_VEHICLE_STATUSES: VehicleStatus[] = ["in-service", "available", "maintenance"];

export type UpdateVehicleStatusResult =
  | { ok: true; vehicle: Vehicle }
  | { ok: false; error: string; status: number };

export function updateVehicleStatus(id: string, status: string, lang: Lang = "uk"): UpdateVehicleStatusResult {
  const t = DICTIONARIES[lang].server;
  if (!ALLOWED_VEHICLE_STATUSES.includes(status as VehicleStatus)) {
    return { ok: false, error: t.unknownStatus(status), status: 400 };
  }

  const vehicle = vehicleStore().find((v) => v.id === id);
  if (!vehicle) {
    return { ok: false, error: t.vehicleNotFound, status: 404 };
  }
  if (vehicle.status === "in-service") {
    return { ok: false, error: t.vehicleInService, status: 400 };
  }

  vehicle.status = status as VehicleStatus;
  return { ok: true, vehicle };
}

export function getShipments(): Shipment[] {
  return store();
}

export function getShipment(id: string): Shipment | undefined {
  return store().find((s) => s.id === id);
}

const ALLOWED_STATUSES: ShipmentStatus[] = ["on-time", "delayed", "critical", "delivered"];

export type UpdateStatusResult =
  | { ok: true; shipment: Shipment }
  | { ok: false; error: string; status: number };

export function updateShipmentStatus(id: string, status: string, lang: Lang = "uk"): UpdateStatusResult {
  const t = DICTIONARIES[lang].server;
  if (!ALLOWED_STATUSES.includes(status as ShipmentStatus)) {
    return { ok: false, error: t.unknownStatus(status), status: 400 };
  }

  const shipment = store().find((s) => s.id === id);
  if (!shipment) {
    return { ok: false, error: t.shipmentNotFound, status: 404 };
  }

  shipment.status = status as ShipmentStatus;
  shipment.updatedAt = new Date().toISOString();

  if (status === "delivered") {
    shipment.progressPercent = 100;
    shipment.delayMinutes = 0;
    shipment.timeline = shipment.timeline.map((t) => ({
      ...t,
      done: true,
      time: t.time || shipment.updatedAt,
    }));
  } else if (status === "on-time") {
    shipment.delayMinutes = 0;
  }

  return { ok: true, shipment };
}
