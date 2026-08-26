import { NextResponse } from "next/server";
import { getAllDrivers } from "@/lib/drivers";
import { getVehicles } from "@/lib/store";

export async function GET() {
  const drivers = getAllDrivers();
  const vehicles = getVehicles().map((vehicle) => ({
    ...vehicle,
    driverName: vehicle.driverId ? (drivers.find((d) => d.id === vehicle.driverId)?.name ?? null) : null,
  }));

  return NextResponse.json({ vehicles });
}
