import { getDriverById } from "@/lib/drivers";
import type { Shipment } from "@/lib/types";

export interface ShipmentWithDriver extends Shipment {
  driverName: string;
  driverAvatar: string;
}

const UNASSIGNED: Record<string, string> = {
  uk: "Не призначено",
  en: "Unassigned",
  ru: "Не назначено",
};

export function withDriver(shipment: Shipment, lang: string = "uk"): ShipmentWithDriver {
  const driver = getDriverById(shipment.driverId);
  return {
    ...shipment,
    driverName: driver?.name ?? UNASSIGNED[lang] ?? UNASSIGNED.uk,
    driverAvatar: driver?.avatar ?? "",
  };
}
