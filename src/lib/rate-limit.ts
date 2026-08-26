/**
 * In-memory sliding-window rate limiter for a single-instance deployment.
 * If this app is ever horizontally scaled, replace with a shared
 * (e.g. Redis-backed) store — each instance would otherwise track its own count.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const buckets = new Map<string, RateLimitEntry>();

interface RateLimitResult {
  success: boolean;
  resetTime: number;
}

/** Public write endpoints: 20 requests / 10 minutes per IP. */
export function formRateLimit(identifier: string): RateLimitResult {
  const windowMs = 10 * 60 * 1000;
  const maxRequests = 20;
  const now = Date.now();

  const entry = buckets.get(identifier);
  if (!entry || now > entry.resetTime) {
    buckets.set(identifier, { count: 1, resetTime: now + windowMs });
    return { success: true, resetTime: now + windowMs };
  }
  if (entry.count >= maxRequests) {
    return { success: false, resetTime: entry.resetTime };
  }
  entry.count += 1;
  return { success: true, resetTime: entry.resetTime };
}

function cleanup(): void {
  const now = Date.now();
  for (const [key, entry] of buckets.entries()) {
    if (now > entry.resetTime) buckets.delete(key);
  }
}

if (typeof setInterval !== "undefined") {
  setInterval(cleanup, 5 * 60 * 1000).unref?.();
}

/** Best-effort client IP from proxy headers — trustworthy only behind a reverse proxy that overwrites (not appends to) X-Forwarded-For. */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  return forwarded?.split(",")[0]?.trim() || realIp || "unknown";
}
