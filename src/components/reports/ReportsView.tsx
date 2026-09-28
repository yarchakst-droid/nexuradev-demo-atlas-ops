"use client";

import { useEffect, useState } from "react";
import { SHIPMENT_STATUS_LABELS } from "@/i18n/dictionary";
import { useLang } from "@/i18n/LangContext";
import type { ReportsData } from "@/lib/reports";
import type { ShipmentStatus } from "@/lib/types";

const STATUS_COLOR: Record<ShipmentStatus, string> = {
  "on-time": "var(--color-on-time)",
  delayed: "var(--color-delayed)",
  critical: "var(--color-critical)",
  delivered: "var(--color-delivered)",
};

export default function ReportsView() {
  const { t, lang, locale } = useLang();
  const [data, setData] = useState<ReportsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/reports")
      .then((res) => {
        if (!res.ok) throw new Error(t.reportsPage.loadError);
        return res.json();
      })
      .then((json: ReportsData) => {
        if (!cancelled) setData(json);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <p className="rounded-2xl border border-critical/30 bg-critical/5 px-4 py-3 text-sm text-critical">{error}</p>
    );
  }

  if (!data) {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-56 animate-pulse rounded-2xl border border-border bg-bg-panel" />
        ))}
      </div>
    );
  }

  const statusTotal = data.statusBreakdown.reduce((sum, s) => sum + s.count, 0) || 1;
  const maxDriverDeliveries = Math.max(...data.topDrivers.map((d) => d.completedDeliveries), 1);
  const maxDestinationCount = Math.max(...data.topDestinations.map((d) => d.count), 1);
  const fleetTotal = data.fleetSummary.inService + data.fleetSummary.available + data.fleetSummary.maintenance || 1;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {(
          [
            { label: t.reportsPage.inService, value: data.fleetSummary.inService, color: "var(--color-delivered)" },
            { label: t.reportsPage.available, value: data.fleetSummary.available, color: "var(--color-on-time)" },
            { label: t.reportsPage.maintenance, value: data.fleetSummary.maintenance, color: "var(--color-delayed)" },
          ] as const
        ).map((tile) => (
          <div key={tile.label} className="panel rounded-2xl border border-border px-4 py-4">
            <p className="font-mono text-[1.75rem] leading-none font-medium tabular-nums" style={{ color: tile.color }}>
              {tile.value}
            </p>
            <p className="mt-1.5 text-xs text-text-soft">{tile.label}</p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-bg-elevated">
              <div
                className="h-full rounded-full"
                style={{ width: `${(tile.value / fleetTotal) * 100}%`, backgroundColor: tile.color }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="panel rounded-2xl border border-border p-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-text-muted">
            {t.reportsPage.statusBreakdown}
          </p>
          <div className="flex flex-col gap-3">
            {data.statusBreakdown.map((row) => (
              <div key={row.status} className="flex items-center gap-3 text-xs">
                <span className="w-20 shrink-0 text-text-soft">{SHIPMENT_STATUS_LABELS[row.status][lang]}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-bg-elevated">
                  <div
                    className="h-full rounded-full transition-[width]"
                    style={{
                      width: `${(row.count / statusTotal) * 100}%`,
                      backgroundColor: STATUS_COLOR[row.status],
                    }}
                  />
                </div>
                <span className="w-6 shrink-0 text-right font-mono text-text-soft">{row.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel rounded-2xl border border-border p-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-text-muted">
            {t.reportsPage.topDrivers}
          </p>
          <div className="flex flex-col gap-3">
            {data.topDrivers.map((driver) => (
              <div key={driver.driverId} className="flex items-center gap-3 text-xs">
                <span className="w-28 shrink-0 truncate text-text-soft">{driver.name}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-bg-elevated">
                  <div
                    className="h-full rounded-full bg-accent transition-[width]"
                    style={{ width: `${(driver.completedDeliveries / maxDriverDeliveries) * 100}%` }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right font-mono text-text-soft">
                  {driver.completedDeliveries.toLocaleString(locale)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel rounded-2xl border border-border p-5 lg:col-span-2">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-text-muted">
            {t.reportsPage.topDestinations}
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {data.topDestinations.map((dest) => (
              <div key={dest.destination.uk} className="flex items-center gap-3 text-xs">
                <span className="w-28 shrink-0 truncate text-text-soft">{dest.destination[lang]}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-bg-elevated">
                  <div
                    className="h-full rounded-full bg-accent transition-[width]"
                    style={{ width: `${(dest.count / maxDestinationCount) * 100}%` }}
                  />
                </div>
                <span className="w-16 shrink-0 text-right font-mono text-text-soft">
                  {dest.count} {t.reportsPage.shipmentsUnit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
