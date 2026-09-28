import { NextRequest, NextResponse } from "next/server";
import { DICTIONARIES } from "@/i18n/dictionary";
import { DEMO_CREDENTIALS, SESSION_COOKIE, SESSION_COOKIE_OPTIONS, SESSION_VALUE } from "@/lib/auth";
import { formRateLimit, getClientIp } from "@/lib/rate-limit";
import type { Lang } from "@/lib/types";

function resolveLang(value: unknown): Lang {
  return value === "en" || value === "ru" ? value : "uk";
}

export async function POST(request: NextRequest) {
  if (!formRateLimit(getClientIp(request)).success) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: DICTIONARIES.uk.server.invalidBody }, { status: 400 });
  }

  const { login, password, lang: langInput } = (body as { login?: unknown; password?: unknown; lang?: unknown }) ?? {};
  const lang = resolveLang(langInput);
  const t = DICTIONARIES[lang].server;

  if (login !== DEMO_CREDENTIALS.login || password !== DEMO_CREDENTIALS.password) {
    return NextResponse.json({ error: t.invalidCredentials }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, SESSION_VALUE, SESSION_COOKIE_OPTIONS);
  return response;
}
