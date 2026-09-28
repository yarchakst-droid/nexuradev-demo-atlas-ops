export interface RevenueDay {
  date: string;
  revenue: number;
}

// Deterministic 30-day revenue series (weekday pattern + slow growth + small jitter
// from a seeded LCG) so the dashboard's revenue chart has a real trend to draw
// instead of a single static number. Regenerating this file always yields the
// same series — nothing here depends on wall-clock randomness.
function seededJitter(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function buildRevenueHistory(days: number): RevenueDay[] {
  const out: RevenueDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today.getTime() - i * 86_400_000);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const base = 52_000;
    const growth = (days - i) * 480;
    const weekendDip = isWeekend ? 0.55 : 1;
    const jitter = 0.85 + seededJitter(i + 1) * 0.3;
    const revenue = Math.round(((base + growth) * weekendDip * jitter) / 100) * 100;
    out.push({ date: date.toISOString().slice(0, 10), revenue });
  }
  return out;
}

// 60 days total: the dashboard charts the most recent 30 and compares them
// against the 30 before that for a real "vs previous period" delta.
export const revenueHistory: RevenueDay[] = buildRevenueHistory(60);
