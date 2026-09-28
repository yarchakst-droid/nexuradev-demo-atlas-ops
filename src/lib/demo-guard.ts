import { NextResponse } from "next/server";
import { DICTIONARIES } from "@/i18n/dictionary";
import type { Lang } from "@/lib/types";

/**
 * Every visitor to this public demo shares one read-only account (see `lib/auth.ts`
 * for the login gate itself, a separate concern). The existing shipment/vehicle
 * status buttons stay live — they're the demo's proof of a real backend and are
 * cheap to reset. Actions that would grow or pollute the shared seed data (adding
 * staff/assets, sending messages, scheduling trips, marking invoices paid) go
 * through this instead: the request is fully validated as if it would succeed,
 * then answered honestly with 403 rather than silently no-op'd.
 */
export function readOnlyResponse(lang: Lang = "uk") {
  return NextResponse.json({ error: DICTIONARIES[lang].server.readOnlyDemo, readOnly: true }, { status: 403 });
}
