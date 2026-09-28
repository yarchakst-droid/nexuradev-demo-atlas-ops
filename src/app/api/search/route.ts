import { NextRequest, NextResponse } from "next/server";
import { getAllDrivers } from "@/lib/drivers";
import { matchDriver, matchShipment, matchVehicle } from "@/lib/search";
import { withDriver } from "@/lib/shipments";
import { getShipments, getVehicles } from "@/lib/store";
import type { Lang } from "@/lib/types";

const LIMIT = 5;

function resolveLang(value: unknown): Lang {
  return value === "en" || value === "ru" ? value : "uk";
}

export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get("q") ?? "").trim();
  const lang = resolveLang(request.nextUrl.searchParams.get("lang"));

  if (!q) {
    return NextResponse.json({ shipments: [], drivers: [], vehicles: [] });
  }

  const drivers = getAllDrivers();

  const shipments = getShipments()
    .filter((s) => matchShipment(s, drivers.find((d) => d.id === s.driverId)?.name ?? "", q))
    .slice(0, LIMIT)
    .map((s) => withDriver(s, lang));

  const matchedDrivers = drivers.filter((d) => matchDriver(d, q)).slice(0, LIMIT);

  const vehicles = getVehicles()
    .filter((v) => matchVehicle(v, q))
    .slice(0, LIMIT)
    .map((v) => ({
      ...v,
      driverName: v.driverId ? (drivers.find((d) => d.id === v.driverId)?.name ?? null) : null,
    }));

  return NextResponse.json({ shipments, drivers: matchedDrivers, vehicles });
}
