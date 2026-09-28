"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import Avatar from "@/components/shared/Avatar";
import { ChatIcon, ChevronRightIcon, PhoneIcon, TruckIcon } from "@/components/shared/icons";
import { DriverStatusBadge, ShipmentStatusBadge } from "@/components/shared/StatusBadge";
import { useLang } from "@/i18n/LangContext";
import type { Driver, Shipment, Vehicle } from "@/lib/types";

const RING_COLOR: Record<Driver["status"], string> = {
  "on-route": "var(--color-delivered)",
  available: "var(--color-on-time)",
  "off-duty": "var(--color-text-muted)",
};

export default function DriverDetail({
  driver,
  history,
  vehicle,
}: {
  driver: Driver;
  history: Shipment[];
  vehicle: Vehicle | null;
}) {
  const { t, lang, locale } = useLang();
  const ring = RING_COLOR[driver.status];
  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-8 sm:py-8">
      <Link href="/drivers" className="mb-4 inline-flex items-center gap-1.5 text-sm text-text-soft hover:text-text">
        {t.driversPage.backToDrivers}
      </Link>

      <div className="panel mb-6 flex flex-col gap-5 rounded-2xl border border-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar
            src={driver.avatar}
            name={driver.name}
            sizePx={64}
            className="size-16 ring-2 ring-offset-2 ring-offset-bg-panel"
            style={{ ["--tw-ring-color" as string]: ring } as CSSProperties}
          />
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-text">{driver.name}</h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-text-muted">
              <TruckIcon className="size-3.5" />
              {driver.vehicle}
            </p>
            <span className="mt-2 inline-block">
              <DriverStatusBadge status={driver.status} />
            </span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={`/messenger?driver=${driver.id}`}
            className="pressable flex items-center justify-center gap-2 rounded-lg border border-border-soft bg-bg-elevated px-4 py-2.5 text-sm text-text-soft hover:border-accent/30 hover:text-accent"
          >
            <ChatIcon className="size-4" />
            {t.driversPage.messageDriver}
          </Link>
          <a
            href={`tel:${driver.phone.replace(/\s/g, "")}`}
            className="pressable flex items-center justify-center gap-2 rounded-lg border border-border-soft bg-bg-elevated px-4 py-2.5 text-sm text-text-soft hover:border-accent/30 hover:text-accent"
          >
            <PhoneIcon className="size-4" />
            {driver.phone}
          </a>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="panel rounded-2xl border border-border px-4 py-4">
          <p className="font-mono text-lg font-medium text-text">{driver.plate}</p>
          <p className="mt-1 text-xs text-text-soft">{t.driversPage.plateLabel}</p>
        </div>
        <div className="panel rounded-2xl border border-border px-4 py-4">
          <p className="font-mono text-lg font-medium text-text">{driver.yearsActive}</p>
          <p className="mt-1 text-xs text-text-soft">{t.driversPage.yearsAtCompany}</p>
        </div>
        <div className="panel rounded-2xl border border-border px-4 py-4">
          <p className="font-mono text-lg font-medium text-text">{driver.completedDeliveries.toLocaleString(locale)}</p>
          <p className="mt-1 text-xs text-text-soft">{t.driversPage.deliveries}</p>
        </div>
      </div>

      {vehicle && (
        <div className="panel mb-6 rounded-2xl border border-border p-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-text-muted">{t.driversPage.vehicleSection}</p>
          <Link
            href={`/fleet/${vehicle.id}`}
            className="group flex items-center justify-between rounded-lg border border-border-soft bg-bg-elevated px-3 py-2.5 text-sm text-text-soft hover:border-accent/30 hover:text-accent"
          >
            <span>
              {vehicle.model} · <span className="font-mono">{vehicle.plate}</span>
            </span>
            <ChevronRightIcon className="size-4 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
          </Link>
        </div>
      )}

      <div className="panel rounded-2xl border border-border p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-text-muted">{t.driversPage.historyTitle}</p>
        {sortedHistory.length === 0 ? (
          <p className="py-6 text-center text-sm text-text-muted">{t.driversPage.historyEmpty}</p>
        ) : (
          <div className="flex flex-col divide-y divide-border-soft">
            {sortedHistory.map((s) => (
              <Link
                key={s.id}
                href={`/shipments/${s.id}`}
                className="group flex items-center justify-between gap-3 py-3 text-sm hover:text-accent"
              >
                <div className="min-w-0">
                  <p className="font-mono text-xs text-text-muted">{s.code}</p>
                  <p className="truncate text-text group-hover:text-accent">
                    {s.origin[lang]} <span className="text-text-muted">→</span> {s.destination[lang]}
                  </p>
                </div>
                <ShipmentStatusBadge status={s.status} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
