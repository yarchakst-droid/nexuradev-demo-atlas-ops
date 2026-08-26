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
}

export interface Driver {
  id: string;
  name: string;
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
