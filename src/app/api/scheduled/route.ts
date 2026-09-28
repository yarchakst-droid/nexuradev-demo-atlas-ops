import { NextRequest, NextResponse } from "next/server";
import { readOnlyResponse } from "@/lib/demo-guard";
import { formRateLimit, getClientIp } from "@/lib/rate-limit";
import { getDrivers, getScheduledTrips, getVehicles } from "@/lib/store";
import type { Lang } from "@/lib/types";

function resolveLang(value: unknown): Lang {
  return value === "en" || value === "ru" ? value : "uk";
}

export async function GET() {
  const drivers = getDrivers();
  const vehicles = getVehicles();
  const trips = getScheduledTrips().map((trip) => ({
    ...trip,
    driverName: trip.driverId ? (drivers.find((d) => d.id === trip.driverId)?.name ?? null) : null,
    vehiclePlate: trip.vehicleId ? (vehicles.find((v) => v.id === trip.vehicleId)?.plate ?? null) : null,
  }));
  return NextResponse.json({ trips });
}

// Scheduling a new trip is one of the demo's read-only actions (see lib/demo-guard.ts).
export async function POST(request: NextRequest) {
  if (!formRateLimit(getClientIp(request)).success) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let lang: Lang = "uk";
  try {
    const body = (await request.json()) as { lang?: unknown };
    lang = resolveLang(body.lang);
  } catch {
    // missing/invalid body is fine here
  }

  return readOnlyResponse(lang);
}
