"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import Avatar from "@/components/shared/Avatar";
import { ChevronRightIcon, PhoneIcon, TruckIcon } from "@/components/shared/icons";
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
    <div className="panel group rounded-2xl border border-border p-4 transition-colors duration-150 hover:border-text-muted/40">
      <Link href={`/drivers/${driver.id}`} className="flex items-start gap-3">
        <Avatar
          src={driver.avatar}
          name={driver.name}
          sizePx={56}
          className="size-14 ring-2 ring-offset-2 ring-offset-bg-panel"
          style={{ ["--tw-ring-color" as string]: ring } as CSSProperties}
        />
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="flex items-center gap-1 text-sm leading-snug font-medium text-text group-hover:text-accent">
            {driver.name}
            <ChevronRightIcon className="size-3.5 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
          </p>
          <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-text-muted">
            <TruckIcon className="size-3.5 shrink-0" />
            {driver.vehicle}
          </p>
          <span className="mt-2 inline-block">
            <DriverStatusBadge status={driver.status} />
          </span>
        </div>
      </Link>
      <div className="flex flex-col gap-4 pt-4">
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
    </div>
  );
}
