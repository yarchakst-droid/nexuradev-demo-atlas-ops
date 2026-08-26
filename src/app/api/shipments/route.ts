import { NextRequest, NextResponse } from "next/server";
import { DICTIONARIES } from "@/i18n/dictionary";
import { withDriver } from "@/lib/shipments";
import { getShipments } from "@/lib/store";
import { computeStats } from "@/lib/stats";
import type { Lang, ShipmentStatus } from "@/lib/types";

const VALID_STATUSES: ShipmentStatus[] = ["on-time", "delayed", "critical", "delivered"];

function resolveLang(value: unknown): Lang {
  return value === "en" || value === "ru" ? value : "uk";
}

export async function GET(request: NextRequest) {
  const statusParam = request.nextUrl.searchParams.get("status");
  const lang = resolveLang(request.nextUrl.searchParams.get("lang"));

  if (statusParam && !VALID_STATUSES.includes(statusParam as ShipmentStatus)) {
    return NextResponse.json({ error: DICTIONARIES[lang].server.unknownStatus(statusParam) }, { status: 400 });
  }

  const all = getShipments();
  const stats = computeStats(all);
  const filtered = statusParam ? all.filter((s) => s.status === statusParam) : all;
  const shipments = filtered.map((s) => withDriver(s, lang));

  return NextResponse.json({ shipments, stats });
}
