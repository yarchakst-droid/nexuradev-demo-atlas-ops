import { NextRequest, NextResponse } from "next/server";
import { readOnlyResponse } from "@/lib/demo-guard";
import { formRateLimit, getClientIp } from "@/lib/rate-limit";
import type { Lang } from "@/lib/types";

function resolveLang(value: unknown): Lang {
  return value === "en" || value === "ru" ? value : "uk";
}

// Marking an invoice paid is one of the demo's read-only actions (see
// lib/demo-guard.ts) — every visitor shares one account, so this always answers
// honestly with 403 rather than actually mutating the shared seed data.
export async function POST(request: NextRequest) {
  if (!formRateLimit(getClientIp(request)).success) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let lang: Lang = "uk";
  try {
    const body = (await request.json()) as { lang?: unknown };
    lang = resolveLang(body.lang);
  } catch {
    // missing/invalid body is fine here — lang just stays "uk"
  }

  return readOnlyResponse(lang);
}
