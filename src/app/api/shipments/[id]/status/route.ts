import { NextRequest, NextResponse } from "next/server";
import { DICTIONARIES } from "@/i18n/dictionary";
import { updateShipmentStatus } from "@/lib/store";
import { formRateLimit, getClientIp } from "@/lib/rate-limit";
import type { Lang } from "@/lib/types";

function resolveLang(value: unknown): Lang {
  return value === "en" || value === "ru" ? value : "uk";
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!formRateLimit(getClientIp(request)).success) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: DICTIONARIES.uk.server.invalidBody }, { status: 400 });
  }

  const { status, lang: langInput } = (body as { status?: unknown; lang?: unknown }) ?? {};
  const lang = resolveLang(langInput);
  if (typeof status !== "string") {
    return NextResponse.json({ error: DICTIONARIES[lang].server.statusRequired }, { status: 400 });
  }

  const result = updateShipmentStatus(id, status, lang);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ shipment: result.shipment });
}
