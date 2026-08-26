"use client";

import Image from "next/image";
import Link from "next/link";
import { PhoneIcon, TruckIcon } from "@/components/shared/icons";
import { DriverStatusBadge } from "@/components/shared/StatusBadge";
import { useLang } from "@/i18n/LangContext";
import type { Driver } from "@/lib/types";
import type { Shipment } from "@/lib/types";

const RING_COLOR: Record<Driver["status"], string> = {
  "on-route": "var(--color-delivered)",
  available: "var(--color-on-time)",
  "off-duty": "var(--color-text-muted)",
};

export default function DriverCard({
  driver,
  shipment,
}: {
  driver: Driver;
  shipment?: Shipment;
}) {
  const { t, lang, locale } = useLang();
  const ring = RING_COLOR[driver.status];

  return (
    <div className="panel flex flex-col gap-4 rounded-xl border border-border p-4 transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex items-start gap-3">
        <span
          className="relative block size-14 shrink-0 overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-bg-panel"
          style={{ ["--tw-ring-color" as string]: ring }}
        >
          <Image src={driver.avatar} alt={driver.name} fill sizes="56px" className="object-cover" />
        </span>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-sm leading-snug font-medium text-text">{driver.name}</p>
          <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-text-muted">
            <TruckIcon className="size-3.5 shrink-0" />
            {driver.vehicle}
          </p>
          <span className="mt-2 inline-block">
            <DriverStatusBadge status={driver.status} />
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border-soft pt-3 text-xs text-text-soft">
        <span className="font-mono">{driver.plate}</span>
        <a href={`tel:${driver.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-accent">
          <PhoneIcon className="size-3.5" />
          {driver.phone}
        </a>
      </div>

      <div className="flex items-center gap-4 text-xs text-text-muted">
        <span>
          {driver.yearsActive} {t.driversPage.yearsAtCompany}
        </span>
        <span>
          {driver.completedDeliveries.toLocaleString(locale)} {t.driversPage.deliveries}
        </span>
      </div>

      {shipment && (
        <Link
          href={`/shipments/${shipment.id}`}
          className="rounded-md border border-border-soft bg-bg-elevated px-3 py-2 text-xs text-text-soft transition-colors hover:border-accent/30 hover:text-accent"
        >
          {driver.status === "on-route" ? t.driversPage.onRouteNow : t.driversPage.lastRoute}
          <span className="font-mono">{shipment.code}</span> · {shipment.origin[lang]} → {shipment.destination[lang]}
        </Link>
      )}
    </div>
  );
}
