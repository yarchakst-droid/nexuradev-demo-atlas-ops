"use client";

import Image from "next/image";
import Link from "next/link";
import { ShipmentStatusBadge } from "@/components/shared/StatusBadge";
import { ChevronRightIcon } from "@/components/shared/icons";
import { useLang } from "@/i18n/LangContext";
import type { Dictionary } from "@/i18n/dictionary";
import type { ShipmentWithDriver } from "@/lib/shipments";

const STATUS_COLOR: Record<string, string> = {
  "on-time": "var(--color-on-time)",
  delayed: "var(--color-delayed)",
  critical: "var(--color-critical)",
  delivered: "var(--color-delivered)",
};

function formatEta(eta: string, status: string, t: Dictionary["table"]): string {
  const diffMs = new Date(eta).getTime() - Date.now();
  const diffMin = Math.round(diffMs / 60_000);
  if (status === "delivered") return t.etaDelivered;
  if (diffMin < 0) return t.etaOverdue(Math.abs(diffMin));
  if (diffMin < 60) return t.etaInMinutes(diffMin);
  const h = Math.floor(diffMin / 60);
  const m = diffMin % 60;
  return t.etaInHours(h, m);
}

export default function ShipmentsTable({
  shipments,
  emptyMessage,
}: {
  shipments: ShipmentWithDriver[];
  emptyMessage?: string;
}) {
  const { t, lang } = useLang();

  if (shipments.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border px-6 py-10 text-center text-sm text-text-muted">
        {emptyMessage ?? t.dashboardPage.emptyFiltered}
      </p>
    );
  }

  return (
    <div className="panel overflow-hidden rounded-xl border border-border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-bg-elevated/60 text-left text-[11px] uppercase tracking-wider text-text-muted">
            <th className="px-4 py-3 font-medium">{t.table.code}</th>
            <th className="px-4 py-3 font-medium">{t.table.route}</th>
            <th className="px-4 py-3 font-medium">{t.table.driver}</th>
            <th className="px-4 py-3 font-medium">{t.table.eta}</th>
            <th className="px-4 py-3 font-medium">{t.table.progress}</th>
            <th className="px-4 py-3 font-medium">{t.table.status}</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {shipments.map((s, i) => {
            const color = STATUS_COLOR[s.status];
            return (
              <tr
                key={s.id}
                className="row-in group border-b border-border-soft transition-colors last:border-0 hover:bg-bg-hover"
                style={{ animationDelay: `${Math.min(i, 10) * 0.035}s` }}
              >
                <td className="px-4 py-3">
                  <Link href={`/shipments/${s.id}`} className="font-mono text-xs text-text-soft group-hover:text-accent">
                    {s.code}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/shipments/${s.id}`} className="text-text group-hover:text-accent">
                    {s.origin[lang]} <span className="text-text-muted">→</span> {s.destination[lang]}
                  </Link>
                  <p className="text-xs text-text-muted">
                    {s.distanceKm} {t.table.km}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {s.driverAvatar && (
                      <span
                        className="relative block size-6 shrink-0 overflow-hidden rounded-full ring-1"
                        style={{ boxShadow: `0 0 0 1px color-mix(in srgb, ${color} 45%, transparent)` }}
                      >
                        <Image src={s.driverAvatar} alt={s.driverName} fill sizes="24px" className="object-cover" />
                      </span>
                    )}
                    <span className="text-text-soft">{s.driverName}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-text-soft">{formatEta(s.eta, s.status, t.table)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-bg-elevated">
                      <div
                        className="h-full rounded-full transition-[width] duration-700"
                        style={{ width: `${s.progressPercent}%`, backgroundColor: color }}
                      />
                    </div>
                    <span className="font-mono text-xs text-text-muted">{s.progressPercent}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <ShipmentStatusBadge status={s.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/shipments/${s.id}`}
                    className="inline-flex text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-text"
                  >
                    <ChevronRightIcon className="size-4" />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
