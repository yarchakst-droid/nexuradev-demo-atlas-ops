"use client";

import Image from "next/image";
import Link from "next/link";
import { PhoneIcon } from "@/components/shared/icons";
import { DriverStatusBadge } from "@/components/shared/StatusBadge";
import { useLang } from "@/i18n/LangContext";
import type { Driver } from "@/lib/types";

export default function DriverMiniCard({ driver }: { driver: Driver }) {
  const { t } = useLang();
  return (
    <div className="panel rounded-2xl border border-border p-4">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-text-muted">{t.routeDetail.driverLabel}</p>
      <div className="flex items-center gap-3">
        <span className="relative block size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/25 ring-offset-2 ring-offset-bg-panel">
          <Image src={driver.avatar} alt={driver.name} fill sizes="48px" className="object-cover" />
        </span>
        <div className="min-w-0">
          <Link href="/drivers" className="block truncate text-sm font-medium text-text hover:text-accent">
            {driver.name}
          </Link>
          <p className="truncate text-xs text-text-muted">{driver.vehicle}</p>
        </div>
      </div>
      <div className="mt-3">
        <DriverStatusBadge status={driver.status} />
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-border-soft pt-3 text-xs text-text-soft">
        <span className="font-mono">{driver.plate}</span>
        <a href={`tel:${driver.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-accent">
          <PhoneIcon className="size-3.5" />
          {driver.phone}
        </a>
      </div>
    </div>
  );
}
