"use client";

import { useEffect, useState } from "react";
import RevenueChart from "@/components/dashboard/RevenueChart";
import { GaugeIcon, TrendDownIcon, TrendUpIcon, WalletIcon } from "@/components/shared/icons";
import { useLang } from "@/i18n/LangContext";
import type { FinanceStats } from "@/lib/finance";

export default function FinanceSection() {
  const { t, locale } = useLang();
  const [stats, setStats] = useState<FinanceStats | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/finance")
      .then((res) => res.json())
      .then((data: FinanceStats) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!stats) {
    return (
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl border border-border bg-bg-panel" />
        ))}
        <div className="h-64 animate-pulse rounded-2xl border border-border bg-bg-panel lg:col-span-3" />
      </div>
    );
  }

  const improving = stats.changePercent >= 0;
  const TrendIcon = improving ? TrendUpIcon : TrendDownIcon;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">{t.dashboardPage.financeTitle}</p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="panel rounded-2xl border border-border px-4 py-4">
          <div className="flex items-center justify-between">
            <span className="flex size-7 items-center justify-center rounded-md bg-accent-soft text-accent">
              <WalletIcon className="size-3.5" />
            </span>
            {stats.changePercent !== 0 && (
              <span className={`flex items-center gap-0.5 text-[11px] font-medium ${improving ? "text-on-time" : "text-critical"}`}>
                <TrendIcon className="size-3" />
                {Math.abs(stats.changePercent)}%
              </span>
            )}
          </div>
          <p className="mt-3 font-mono text-xl font-medium text-text">
            {stats.last30Revenue.toLocaleString(locale)} {t.dashboardPage.currencyUnit}
          </p>
          <p className="mt-1.5 text-xs text-text-soft">{t.dashboardPage.monthRevenue}</p>
        </div>

        <div className="panel rounded-2xl border border-border px-4 py-4">
          <span className="flex size-7 items-center justify-center rounded-md bg-accent-soft text-accent">
            <WalletIcon className="size-3.5" />
          </span>
          <p className="mt-3 font-mono text-xl font-medium text-text">
            {stats.avgShipmentValue.toLocaleString(locale)} {t.dashboardPage.currencyUnit}
          </p>
          <p className="mt-1.5 text-xs text-text-soft">{t.dashboardPage.avgShipmentValue}</p>
        </div>

        <div className="panel rounded-2xl border border-border px-4 py-4">
          <span className="flex size-7 items-center justify-center rounded-md bg-accent-soft text-accent">
            <GaugeIcon className="size-3.5" />
          </span>
          <div className="mt-3 flex items-center gap-3">
            <p className="font-mono text-xl font-medium text-text">{stats.fleetUtilizationPercent}%</p>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-bg-elevated">
              <div className="h-full rounded-full bg-accent" style={{ width: `${stats.fleetUtilizationPercent}%` }} />
            </div>
          </div>
          <p className="mt-1.5 text-xs text-text-soft">{t.dashboardPage.fleetUtilization}</p>
        </div>
      </div>

      <div className="panel rounded-2xl border border-border p-4">
        <p className="text-sm font-medium text-text">{t.dashboardPage.revenueChartTitle}</p>
        <p className="text-xs text-text-muted">{t.dashboardPage.revenueChartSubtitle}</p>
        <div className="mt-3">
          <RevenueChart data={stats.revenueTrend} />
        </div>
      </div>
    </div>
  );
}
