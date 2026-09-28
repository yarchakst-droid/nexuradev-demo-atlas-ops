export type Lang = "uk" | "en" | "ru";

export type LocalizedText = Record<Lang, string>;

export type ShipmentStatus = "on-time" | "delayed" | "critical" | "delivered";

export type DriverStatus = "on-route" | "available" | "off-duty";

export interface TimelineEvent {
  label: LocalizedText;
  time: string;
  done: boolean;
}

export interface RouteGeometry {
  origin: { x: number; y: number };
  destination: { x: number; y: number };
  control: { x: number; y: number };
}

export interface Shipment {
  id: string;
  code: string;
  origin: LocalizedText;
  destination: LocalizedText;
  driverId: string;
  status: ShipmentStatus;
  eta: string;
  distanceKm: number;
  cargo: LocalizedText;
  progressPercent: number;
  delayMinutes: number;
  updatedAt: string;
  route: RouteGeometry;
  timeline: TimelineEvent[];
  /** Client company being billed for this shipment — powers the Billing tab. */
  client: string;
  /** Freight revenue in UAH — powers the dashboard's finance charts and Billing tab. */
  revenue: number;
}

export interface Driver {
  id: string;
  name: string;
  /** Unsplash portrait URL, or "" for a newly added driver — falls back to an initials avatar. */
  avatar: string;
  vehicle: string;
  plate: string;
  phone: string;
  status: DriverStatus;
  yearsActive: number;
  completedDeliveries: number;
  currentShipmentId: string | null;
}

export type VehicleType = "truck" | "van";

export type VehicleStatus = "in-service" | "available" | "maintenance";

export interface Vehicle {
  id: string;
  model: string;
  plate: string;
  type: VehicleType;
  capacityKg: number;
  odometerKm: number;
  fuelPercent: number;
  nextServiceKm: number;
  status: VehicleStatus;
  driverId: string | null;
}

export type ScheduledTripStatus = "unassigned" | "assigned";

export interface ScheduledTrip {
  id: string;
  code: string;
  origin: LocalizedText;
  destination: LocalizedText;
  cargo: LocalizedText;
  distanceKm: number;
  scheduledAt: string;
  status: ScheduledTripStatus;
  driverId: string | null;
  vehicleId: string | null;
}

export type MessageSender = "dispatcher" | "driver";

export interface ChatMessage {
  id: string;
  driverId: string;
  from: MessageSender;
  text: string;
  sentAt: string;
}

export type InvoiceStatus = "paid" | "pending" | "overdue";

export interface Invoice {
  shipmentId: string;
  code: string;
  client: string;
  destination: LocalizedText;
  amount: number;
  status: InvoiceStatus;
  issuedAt: string;
}
