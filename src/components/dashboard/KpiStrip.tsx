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

export default function KpiStrip({ stats }: { stats: DashboardStats }) {
  const { t } = useLang();
  const tiles = [
    {
      label: t.kpi.active,
      value: stats.active,
      suffix: "",
      accent: "var(--color-text)",
      icon: GaugeIcon,
      trend: { value: 2, up: true },
    },
    {
      label: t.kpi.onTime,
      value: stats.onTimePercent,
      suffix: "%",
      accent: "var(--color-on-time)",
      icon: CheckIcon,
      trend: { value: 4, up: true },
    },
    {
      label: t.kpi.delayed,
      value: stats.delayed,
      suffix: "",
      accent: "var(--color-delayed)",
      icon: ClockIcon,
      trend: { value: 1, up: false },
    },
    {
      label: t.kpi.critical,
      value: stats.critical,
      suffix: "",
      accent: "var(--color-critical)",
      icon: AlertTriangleIcon,
      trend: { value: 1, up: true },
    },
    {
      label: t.kpi.deliveredToday,
      value: stats.deliveredToday,
      suffix: "",
      accent: "var(--color-delivered)",
      icon: CheckIcon,
      trend: { value: 3, up: true },
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {tiles.map((tile) => {
        const TrendIcon = tile.trend.up ? TrendUpIcon : TrendDownIcon;
        return (
          <div
            key={tile.label}
            className="panel rounded-xl border border-border px-4 py-4 transition-transform duration-200 hover:-translate-y-0.5"
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
              <span
                className={`flex items-center gap-0.5 text-[11px] font-medium ${
                  tile.trend.up ? "text-on-time" : "text-text-muted"
                }`}
              >
                <TrendIcon className="size-3" />
                {tile.trend.value}
              </span>
            </div>
            <p className="mt-3 font-mono text-[1.75rem] leading-none font-medium tabular-nums" style={{ color: tile.accent }}>
              <CountUp value={tile.value} suffix={tile.suffix} />
            </p>
            <p className="mt-1.5 text-xs text-text-soft">{tile.label}</p>
          </div>
        );
      })}
    </div>
  );
}
