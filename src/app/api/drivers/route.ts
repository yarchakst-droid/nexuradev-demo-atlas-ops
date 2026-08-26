import { NextResponse } from "next/server";
import { getAllDrivers } from "@/lib/drivers";
import { getShipment } from "@/lib/store";

export async function GET() {
  const drivers = getAllDrivers().map((driver) => ({
    ...driver,
    shipment: driver.currentShipmentId ? (getShipment(driver.currentShipmentId) ?? null) : null,
  }));

  return NextResponse.json({ drivers });
}
