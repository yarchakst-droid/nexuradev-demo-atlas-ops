import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, SESSION_VALUE } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const hasSession = request.cookies.get(SESSION_COOKIE)?.value === SESSION_VALUE;
  if (hasSession) return NextResponse.next();

  const url = new URL("/login", request.url);
  url.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!login|api/auth|_next/static|_next/image|favicon.ico|icon.svg).*)"],
};
