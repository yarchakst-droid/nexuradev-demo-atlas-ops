import { NextResponse } from "next/server";
import { getAllDrivers } from "@/lib/drivers";
import { computeReports } from "@/lib/reports";
import { getShipments, getVehicles } from "@/lib/store";

export async function GET() {
  const data = computeReports(getShipments(), getAllDrivers(), getVehicles());
  return NextResponse.json(data);
}
