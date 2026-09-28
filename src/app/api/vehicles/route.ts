import { NextRequest, NextResponse } from "next/server";
import { readOnlyResponse } from "@/lib/demo-guard";
import { getAllDrivers } from "@/lib/drivers";
import { formRateLimit, getClientIp } from "@/lib/rate-limit";
import { getVehicles } from "@/lib/store";
import type { Lang } from "@/lib/types";

function resolveLang(value: unknown): Lang {
  return value === "en" || value === "ru" ? value : "uk";
}

export async function GET() {
  const drivers = getAllDrivers();
  const vehicles = getVehicles().map((vehicle) => ({
    ...vehicle,
    driverName: vehicle.driverId ? (drivers.find((d) => d.id === vehicle.driverId)?.name ?? null) : null,
  }));

  return NextResponse.json({ vehicles });
}

// Adding a vehicle is one of the demo's read-only actions (see lib/demo-guard.ts).
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
