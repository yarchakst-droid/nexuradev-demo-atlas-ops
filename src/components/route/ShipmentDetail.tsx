"use client";

import Link from "next/link";
import { useState } from "react";
import { ClockIcon, PackageIcon } from "@/components/shared/icons";
import { ShipmentStatusBadge } from "@/components/shared/StatusBadge";
import DriverMiniCard from "@/components/route/DriverMiniCard";
import RouteMap from "@/components/route/RouteMap";
import ShipmentTimeline from "@/components/route/ShipmentTimeline";
import StatusActionBar from "@/components/route/StatusActionBar";
import { useLang } from "@/i18n/LangContext";
import type { Dictionary } from "@/i18n/dictionary";
import type { Driver, Shipment, ShipmentStatus } from "@/lib/types";

function formatEta(eta: string, status: ShipmentStatus, t: Dictionary["routeDetail"]): string {
  if (status === "delivered") return t.etaDelivered;
  const diffMin = Math.round((new Date(eta).getTime() - Date.now()) / 60_000);
  if (diffMin < 0) return t.etaOverdue(Math.abs(diffMin));
  const h = Math.floor(diffMin / 60);
  const m = diffMin % 60;
  return t.etaIn(h, m);
}

export default function ShipmentDetail({
  shipment: initialShipment,
  driver,
}: {
  shipment: Shipment;
  driver: Driver;
}) {
  const { t, lang } = useLang();
  const [shipment, setShipment] = useState(initialShipment);

  async function handleUpdateStatus(status: ShipmentStatus) {
    const res = await fetch(`/api/shipments/${shipment.id}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, lang }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? t.routeDetail.updateError);
    setShipment(data.shipment);
  }

  return (
    <div className="mx-auto max-w-6xl px-8 py-8">
      <Link href="/" className="mb-4 inline-flex items-center gap-1.5 text-sm text-text-soft hover:text-text">
        {t.routeDetail.backToDashboard}
      </Link>

      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-text-muted">{shipment.code}</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-text">
            {shipment.origin[lang]} <span className="text-text-muted">→</span> {shipment.destination[lang]}
          </h1>
          <div className="mt-2.5 flex items-center gap-3">
            <ShipmentStatusBadge status={shipment.status} />
            <span className="flex items-center gap-1.5 text-xs text-text-soft">
              <ClockIcon className="size-3.5" />
              {formatEta(shipment.eta, shipment.status, t.routeDetail)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="flex flex-col gap-5">
          <RouteMap
            route={shipment.route}
            status={shipment.status}
            progressPercent={shipment.progressPercent}
            origin={shipment.origin[lang]}
            destination={shipment.destination[lang]}
          />

          <div className="panel rounded-xl border border-border p-4">
            <StatusActionBar status={shipment.status} onUpdate={handleUpdateStatus} />
          </div>

          <div className="panel rounded-xl border border-border p-4">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-text-muted">
              <PackageIcon className="size-3.5" />
              {t.routeDetail.cargoSection}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              <div>
                <p className="text-text-muted">{t.routeDetail.description}</p>
                <p className="mt-0.5 text-text">{shipment.cargo[lang]}</p>
              </div>
              <div>
                <p className="text-text-muted">{t.routeDetail.distance}</p>
                <p className="mt-0.5 font-mono text-text">
                  {shipment.distanceKm} {t.table.km}
                </p>
              </div>
              <div>
                <p className="text-text-muted">{t.routeDetail.progress}</p>
                <p className="mt-0.5 font-mono text-text">{shipment.progressPercent}%</p>
              </div>
              <div>
                <p className="text-text-muted">{t.routeDetail.delay}</p>
                <p className="mt-0.5 font-mono text-text">
                  {shipment.delayMinutes > 0 ? `${shipment.delayMinutes} ${t.routeDetail.minutesShort}` : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-5">
          <DriverMiniCard driver={driver} />
          <div className="panel rounded-xl border border-border p-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-text-muted">{t.routeDetail.chronology}</p>
            <ShipmentTimeline timeline={shipment.timeline} />
          </div>
        </aside>
      </div>
    </div>
  );
}
