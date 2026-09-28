"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRightIcon, FuelIcon, TruckIcon, WrenchIcon } from "@/components/shared/icons";
import { DriverStatusBadge, VehicleStatusBadge } from "@/components/shared/StatusBadge";
import { useLang } from "@/i18n/LangContext";
import type { Driver, Vehicle } from "@/lib/types";

const FUEL_COLOR = (percent: number) =>
  percent <= 20 ? "var(--color-critical)" : percent <= 45 ? "var(--color-delayed)" : "var(--color-on-time)";

export default function VehicleDetail({ vehicle: initialVehicle, driver }: { vehicle: Vehicle; driver: Driver | null }) {
  const { t, lang, locale } = useLang();
  const [vehicle, setVehicle] = useState(initialVehicle);
  const [toggling, setToggling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canToggle = vehicle.status !== "in-service";
  const fuelColor = FUEL_COLOR(vehicle.fuelPercent);
  const serviceDueSoon = vehicle.nextServiceKm <= 500;

  async function handleToggle() {
    const nextStatus = vehicle.status === "maintenance" ? "available" : "maintenance";
    setToggling(true);
    setError(null);
    try {
      const res = await fetch(`/api/vehicles/${vehicle.id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus, lang }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? t.routeDetail.updateError);
      setVehicle(data.vehicle);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.routeDetail.updateError);
    } finally {
      setToggling(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-8 sm:py-8">
      <Link href="/fleet" className="mb-4 inline-flex items-center gap-1.5 text-sm text-text-soft hover:text-text">
        {t.fleetPage.backToFleet}
      </Link>

      <div className="panel mb-4 flex flex-col gap-5 rounded-2xl border border-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent ring-1 ring-inset ring-accent/20">
            <TruckIcon className="size-6" />
          </span>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-text">{vehicle.model}</h1>
            <p className="mt-1 font-mono text-sm text-text-muted">{vehicle.plate}</p>
            <span className="mt-2 inline-block">
              <VehicleStatusBadge status={vehicle.status} />
            </span>
          </div>
        </div>
        <button
          type="button"
          disabled={!canToggle || toggling}
          onClick={handleToggle}
          className="pressable flex items-center justify-center gap-2 rounded-lg border border-border-soft px-4 py-2.5 text-sm text-text-soft enabled:hover:border-accent/30 enabled:hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          <WrenchIcon className="size-4" />
          {toggling ? t.routeDetail.updating : vehicle.status === "maintenance" ? t.fleetPage.setToAvailable : t.fleetPage.setToMaintenance}
        </button>
      </div>
      {error && <p className="mb-4 text-xs text-critical">{error}</p>}

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="panel rounded-2xl border border-border px-4 py-4">
          <p className="text-sm text-text">{vehicle.type === "truck" ? t.fleetPage.truckType : t.fleetPage.vanType}</p>
          <p className="mt-1 text-xs text-text-soft">{t.fleetPage.type}</p>
        </div>
        <div className="panel rounded-2xl border border-border px-4 py-4">
          <p className="font-mono text-sm text-text">
            {vehicle.capacityKg.toLocaleString(locale)} {t.fleetPage.kgUnit}
          </p>
          <p className="mt-1 text-xs text-text-soft">{t.fleetPage.capacity}</p>
        </div>
        <div className="panel rounded-2xl border border-border px-4 py-4">
          <p className="font-mono text-sm text-text">
            {vehicle.odometerKm.toLocaleString(locale)} {t.fleetPage.kmUnit}
          </p>
          <p className="mt-1 text-xs text-text-soft">{t.fleetPage.odometer}</p>
        </div>
        <div className="panel rounded-2xl border border-border px-4 py-4">
          <p className="font-mono text-sm" style={{ color: serviceDueSoon ? "var(--color-delayed)" : "var(--color-text)" }}>
            {vehicle.nextServiceKm.toLocaleString(locale)} {t.fleetPage.kmUnit}
          </p>
          <p className="mt-1 text-xs text-text-soft">{t.fleetPage.nextService}</p>
        </div>
      </div>

      <div className="panel mb-6 rounded-2xl border border-border p-4">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-text-muted">
          <span style={{ color: fuelColor }}>
            <FuelIcon className="size-3.5" />
          </span>
          {t.fleetPage.fuel}
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-bg-elevated">
            <div
              className="h-full rounded-full transition-[width]"
              style={{ width: `${vehicle.fuelPercent}%`, backgroundColor: fuelColor }}
            />
          </div>
          <span className="font-mono text-sm text-text-soft">{vehicle.fuelPercent}%</span>
        </div>
      </div>

      <div className="panel rounded-2xl border border-border p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-text-muted">{t.fleetPage.assignedTo}</p>
        {driver ? (
          <Link
            href={`/drivers/${driver.id}`}
            className="group flex items-center justify-between rounded-lg border border-border-soft bg-bg-elevated px-3 py-2.5 text-sm text-text-soft hover:border-accent/30 hover:text-accent"
          >
            <span className="flex items-center gap-2">
              {driver.name}
              <DriverStatusBadge status={driver.status} />
            </span>
            <ChevronRightIcon className="size-4 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
          </Link>
        ) : (
          <p className="text-sm text-text-muted">{t.fleetPage.unassigned}</p>
        )}
      </div>
    </div>
  );
}
