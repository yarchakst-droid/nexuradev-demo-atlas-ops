import { NextResponse } from "next/server";
import { revenueHistory } from "@/data/revenue-history";
import { computeFinanceStats } from "@/lib/finance";
import { getShipments, getVehicles } from "@/lib/store";

export async function GET() {
  const stats = computeFinanceStats(getShipments(), getVehicles(), revenueHistory);
  return NextResponse.json(stats);
}
