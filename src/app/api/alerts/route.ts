import { NextResponse } from "next/server";
import { computeAlerts } from "@/lib/alerts";
import { getShipments, getVehicles } from "@/lib/store";

export async function GET() {
  const alerts = computeAlerts(getShipments(), getVehicles());
  return NextResponse.json({ alerts });
}
