"use client";

import { useEffect, useMemo, useState } from "react";
import FinanceSection from "@/components/dashboard/FinanceSection";
import KpiStrip from "@/components/dashboard/KpiStrip";
import ShipmentsTable from "@/components/dashboard/ShipmentsTable";
import StatusFilterTabs from "@/components/dashboard/StatusFilterTabs";
import { useLang } from "@/i18n/LangContext";
import type { ShipmentWithDriver } from "@/lib/shipments";
import type { DashboardStats } from "@/lib/stats";
import { useSearch } from "@/lib/search-context";

const POLL_MS = 20_000;

export default function DashboardView() {
  const { t, lang } = useLang();
  const { query } = useSearch();
  const [shipments, setShipments] = useState<ShipmentWithDriver[] | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [previousStats, setPreviousStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let cancelled = false;

    // Re-polls the same endpoint on an interval so the dispatcher sees changes made
    // from another tab/device (e.g. a status update on a shipment's route page)
    // without a manual refresh, and so the KPI trend arrows reflect a real delta
    // between two live snapshots instead of hardcoded numbers.
    function load() {
      fetch("/api/shipments")
        .then((res) => {
          if (!res.ok) throw new Error(t.dashboardPage.loadError);
          return res.json();
        })
        .then((data: { shipments: ShipmentWithDriver[]; stats: DashboardStats }) => {
          if (cancelled) return;
          setShipments(data.shipments);
          setStats((prev) => {
            if (prev) setPreviousStats(prev);
            return data.stats;
          });
        })
        .catch((err: Error) => {
          if (!cancelled) setError(err.message);
        });
    }

    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const counts = useMemo<Record<string, number>>(() => {
    if (!shipments) return {} as Record<string, number>;
    return {
      all: shipments.length,
      "on-time": shipments.filter((s) => s.status === "on-time").length,
      delayed: shipments.filter((s) => s.status === "delayed").length,
      critical: shipments.filter((s) => s.status === "critical").length,
      delivered: shipments.filter((s) => s.status === "delivered").length,
    };
  }, [shipments]);

  const filtered = useMemo(() => {
    if (!shipments) return [];
    const byStatus = filter === "all" ? shipments : shipments.filter((s) => s.status === filter);
    const q = query.trim().toLowerCase();
    if (!q) return byStatus;
    return byStatus.filter((s) =>
      [s.code, s.origin[lang], s.destination[lang], s.driverName].some((field) =>
        field.toLowerCase().includes(q),
      ),
    );
  }, [shipments, filter, query, lang]);

  if (error) {
    return (
      <p className="rounded-2xl border border-critical/30 bg-critical/5 px-4 py-3 text-sm text-critical">
        {error}
      </p>
    );
  }

  if (!shipments || !stats) {
    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-[6.5rem] animate-pulse rounded-2xl border border-border bg-bg-panel" />
          ))}
        </div>
        <div className="h-96 animate-pulse rounded-2xl border border-border bg-bg-panel" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
        <span className="pulse-dot size-1.5 rounded-full bg-on-time" />
        {t.dashboardPage.liveLabel}
      </div>
      <KpiStrip stats={stats} previousStats={previousStats} />
      <FinanceSection />
      <div className="flex flex-col gap-4">
        <StatusFilterTabs active={filter} onChange={setFilter} counts={counts} />
        <ShipmentsTable
          shipments={filtered}
          emptyMessage={query.trim() ? t.dashboardPage.emptySearch(query.trim()) : undefined}
        />
      </div>
    </div>
  );
}
