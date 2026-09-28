import CountUp from "@/components/dashboard/CountUp";
import {
  AlertTriangleIcon,
  CheckIcon,
  ClockIcon,
  GaugeIcon,
  TrendDownIcon,
  TrendUpIcon,
} from "@/components/shared/icons";
import { useLang } from "@/i18n/LangContext";
import type { DashboardStats } from "@/lib/stats";

type MetricKey = keyof DashboardStats;

/** Whether an increase in this metric is good, bad, or neither — used to color a real delta, not to fabricate one. */
const GOOD_DIRECTION: Record<MetricKey, "up" | "down" | null> = {
  active: null,
  onTimePercent: "up",
  delayed: "down",
  critical: "down",
  deliveredToday: "up",
};

export default function KpiStrip({
  stats,
  previousStats,
}: {
  stats: DashboardStats;
  previousStats: DashboardStats | null;
}) {
  const { t } = useLang();
  const tiles: { key: MetricKey; label: string; suffix: string; accent: string; icon: typeof GaugeIcon }[] = [
    { key: "active", label: t.kpi.active, suffix: "", accent: "var(--color-text)", icon: GaugeIcon },
    { key: "onTimePercent", label: t.kpi.onTime, suffix: "%", accent: "var(--color-on-time)", icon: CheckIcon },
    { key: "delayed", label: t.kpi.delayed, suffix: "", accent: "var(--color-delayed)", icon: ClockIcon },
    { key: "critical", label: t.kpi.critical, suffix: "", accent: "var(--color-critical)", icon: AlertTriangleIcon },
    { key: "deliveredToday", label: t.kpi.deliveredToday, suffix: "", accent: "var(--color-delivered)", icon: CheckIcon },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {tiles.map((tile) => {
        const value = stats[tile.key];
        const delta = previousStats ? value - previousStats[tile.key] : 0;
        const goodDirection = GOOD_DIRECTION[tile.key];
        const improving = goodDirection === null ? null : goodDirection === "up" ? delta > 0 : delta < 0;
        const TrendIcon = delta > 0 ? TrendUpIcon : TrendDownIcon;

        return (
          <div
            key={tile.key}
            className="panel rounded-2xl border border-border px-4 py-4 transition-colors duration-150 hover:border-text-muted/40"
          >
            <div className="flex items-center justify-between">
              <span
                className="flex size-7 items-center justify-center rounded-md"
                style={{
                  color: tile.accent,
                  backgroundColor: `color-mix(in srgb, ${tile.accent} 14%, transparent)`,
                }}
              >
                <tile.icon className="size-3.5" />
              </span>
              {delta !== 0 && (
                <span
                  className={`flex items-center gap-0.5 text-[11px] font-medium ${
                    improving === null ? "text-text-muted" : improving ? "text-on-time" : "text-critical"
                  }`}
                >
                  <TrendIcon className="size-3" />
                  {Math.abs(delta)}
                </span>
              )}
            </div>
            <p className="mt-3 font-mono text-[1.75rem] leading-none font-medium tabular-nums" style={{ color: tile.accent }}>
              <CountUp value={value} suffix={tile.suffix} />
            </p>
            <p className="mt-1.5 text-xs text-text-soft">{tile.label}</p>
          </div>
        );
      })}
    </div>
  );
}
