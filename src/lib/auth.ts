/**
 * Demo-only access gate — not a real account system. There is exactly one
 * account, and its credentials are shown right on the login screen on purpose:
 * this is a public portfolio demo, and the login step exists to give it the
 * shape of a real product, not to keep anyone out. See `lib/demo-guard.ts`
 * for the separate, unrelated rule that keeps *this* account read-only.
 */
export const DEMO_CREDENTIALS = {
  login: "demo",
  password: "atlasops2026",
};

export const SESSION_COOKIE = "atlas_session";
export const SESSION_VALUE = "granted";

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
};
