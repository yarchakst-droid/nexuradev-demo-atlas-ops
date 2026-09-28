import { drivers as seedDrivers } from "@/data/drivers";
import { messages as seedMessages } from "@/data/messages";
import { scheduledTrips as seedScheduledTrips } from "@/data/scheduled-trips";
import { shipments as seedShipments } from "@/data/shipments";
import { vehicles as seedVehicles } from "@/data/vehicles";
import { DICTIONARIES } from "@/i18n/dictionary";
import type {
  ChatMessage,
  Driver,
  DriverStatus,
  Lang,
  ScheduledTrip,
  Shipment,
  ShipmentStatus,
  Vehicle,
  VehicleStatus,
} from "@/lib/types";

declare global {
  var __atlasOpsShipments: Shipment[] | undefined;
  var __atlasOpsVehicles: Vehicle[] | undefined;
  var __atlasOpsDrivers: Driver[] | undefined;
  var __atlasOpsScheduledTrips: ScheduledTrip[] | undefined;
  var __atlasOpsMessages: Record<string, ChatMessage[]> | undefined;
  var __atlasOpsPaidInvoices: Set<string> | undefined;
}

function nextId(prefix: string, existingIds: string[]): string {
  const numbers = existingIds
    .filter((id) => id.startsWith(prefix))
    .map((id) => parseInt(id.slice(prefix.length), 10))
    .filter((n) => !Number.isNaN(n));
  const max = numbers.length ? Math.max(...numbers) : 0;
  return `${prefix}${max + 1}`;
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

function driverStore(): Driver[] {
  if (!globalThis.__atlasOpsDrivers) {
    globalThis.__atlasOpsDrivers = seedDrivers.map((d) => ({ ...d }));
  }
  return globalThis.__atlasOpsDrivers;
}

function scheduledStore(): ScheduledTrip[] {
  if (!globalThis.__atlasOpsScheduledTrips) {
    globalThis.__atlasOpsScheduledTrips = seedScheduledTrips.map((t) => ({ ...t }));
  }
  return globalThis.__atlasOpsScheduledTrips;
}

function messagesStore(): Record<string, ChatMessage[]> {
  if (!globalThis.__atlasOpsMessages) {
    globalThis.__atlasOpsMessages = Object.fromEntries(
      Object.entries(seedMessages).map(([driverId, list]) => [driverId, list.map((m) => ({ ...m }))]),
    );
  }
  return globalThis.__atlasOpsMessages;
}

function paidInvoicesStore(): Set<string> {
  if (!globalThis.__atlasOpsPaidInvoices) {
    globalThis.__atlasOpsPaidInvoices = new Set();
  }
  return globalThis.__atlasOpsPaidInvoices;
}

// ── Vehicles ────────────────────────────────────────────────────────────

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

export interface NewVehicleInput {
  model: string;
  plate: string;
  type: Vehicle["type"];
  capacityKg: number;
}

export function addVehicle(input: NewVehicleInput): Vehicle {
  const list = vehicleStore();
  const vehicle: Vehicle = {
    id: nextId("v", list.map((v) => v.id)),
    model: input.model,
    plate: input.plate,
    type: input.type,
    capacityKg: input.capacityKg,
    odometerKm: 0,
    fuelPercent: 100,
    nextServiceKm: 15_000,
    status: "available",
    driverId: null,
  };
  list.unshift(vehicle);
  return vehicle;
}

// ── Shipments ───────────────────────────────────────────────────────────

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

// ── Drivers ─────────────────────────────────────────────────────────────

export function getDrivers(): Driver[] {
  return driverStore();
}

export function getDriver(id: string): Driver | undefined {
  return driverStore().find((d) => d.id === id);
}

export interface NewDriverInput {
  name: string;
  phone: string;
  vehicle: string;
  plate: string;
  yearsActive: number;
}

export function addDriver(input: NewDriverInput): Driver {
  const list = driverStore();
  const driver: Driver = {
    id: nextId("d", list.map((d) => d.id)),
    name: input.name,
    avatar: "",
    vehicle: input.vehicle,
    plate: input.plate,
    phone: input.phone,
    status: "off-duty" as DriverStatus,
    yearsActive: input.yearsActive,
    completedDeliveries: 0,
    currentShipmentId: null,
  };
  list.unshift(driver);
  return driver;
}

// ── Scheduled trips ─────────────────────────────────────────────────────

export function getScheduledTrips(): ScheduledTrip[] {
  return scheduledStore();
}

export interface NewScheduledTripInput {
  origin: string;
  destination: string;
  cargo: string;
  distanceKm: number;
  scheduledAt: string;
}

export function addScheduledTrip(input: NewScheduledTripInput): ScheduledTrip {
  const list = scheduledStore();
  const code = `AO-P${(list.length + 501).toString().padStart(4, "0")}`;
  const trip: ScheduledTrip = {
    id: nextId("sc", list.map((t) => t.id)),
    code,
    origin: { uk: input.origin, en: input.origin, ru: input.origin },
    destination: { uk: input.destination, en: input.destination, ru: input.destination },
    cargo: { uk: input.cargo, en: input.cargo, ru: input.cargo },
    distanceKm: input.distanceKm,
    scheduledAt: input.scheduledAt,
    status: "unassigned",
    driverId: null,
    vehicleId: null,
  };
  list.unshift(trip);
  return trip;
}

export type AssignTripResult =
  | { ok: true; trip: ScheduledTrip }
  | { ok: false; error: string; status: number };

export function assignScheduledTrip(id: string, driverId: string, vehicleId: string, lang: Lang = "uk"): AssignTripResult {
  const t = DICTIONARIES[lang].server;
  const trip = scheduledStore().find((tr) => tr.id === id);
  if (!trip) return { ok: false, error: t.scheduledTripNotFound, status: 404 };
  if (!driverStore().some((d) => d.id === driverId)) return { ok: false, error: t.driverNotFound, status: 404 };
  if (!vehicleStore().some((v) => v.id === vehicleId)) return { ok: false, error: t.vehicleNotFound, status: 404 };

  trip.driverId = driverId;
  trip.vehicleId = vehicleId;
  trip.status = "assigned";
  return { ok: true, trip };
}

// ── Messenger ───────────────────────────────────────────────────────────

export function getMessages(driverId: string): ChatMessage[] {
  return messagesStore()[driverId] ?? [];
}

export function addMessage(driverId: string, text: string): ChatMessage {
  const all = messagesStore();
  const thread = all[driverId] ?? (all[driverId] = []);
  const message: ChatMessage = {
    id: `${driverId}-m${thread.length + 1}`,
    driverId,
    from: "dispatcher",
    text,
    sentAt: new Date().toISOString(),
  };
  thread.push(message);
  return message;
}

// ── Billing ─────────────────────────────────────────────────────────────

export function getPaidInvoiceIds(): Set<string> {
  return paidInvoicesStore();
}

export function markInvoicePaid(shipmentId: string): boolean {
  if (!store().some((s) => s.id === shipmentId)) return false;
  paidInvoicesStore().add(shipmentId);
  return true;
}
