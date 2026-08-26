"use client";

import { FuelIcon, TruckIcon, WrenchIcon } from "@/components/shared/icons";
import { VehicleStatusBadge } from "@/components/shared/StatusBadge";
import { useLang } from "@/i18n/LangContext";
import type { Vehicle } from "@/lib/types";

const FUEL_COLOR = (percent: number) =>
  percent <= 20 ? "var(--color-critical)" : percent <= 45 ? "var(--color-delayed)" : "var(--color-on-time)";

export default function VehicleCard({
  vehicle,
  driverName,
  onToggle,
  toggling,
}: {
  vehicle: Vehicle;
  driverName: string | null;
  onToggle: (id: string) => void;
  toggling: boolean;
}) {
  const { t, locale } = useLang();
  const canToggle = vehicle.status !== "in-service";
  const fuelColor = FUEL_COLOR(vehicle.fuelPercent);

  return (
    <div className="panel flex flex-col gap-4 rounded-xl border border-border p-4 transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent/25 to-accent/5 text-accent ring-1 ring-inset ring-accent/20">
          <TruckIcon className="size-4.5" />
        </span>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-sm leading-snug font-medium text-text">{vehicle.model}</p>
          <p className="mt-1 truncate font-mono text-xs text-text-muted">{vehicle.plate}</p>
          <span className="mt-2 inline-block">
            <VehicleStatusBadge status={vehicle.status} />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-border-soft pt-3 text-xs">
        <div>
          <p className="text-text-muted">{t.fleetPage.type}</p>
          <p className="mt-0.5 text-text-soft">{vehicle.type === "truck" ? t.fleetPage.truckType : t.fleetPage.vanType}</p>
        </div>
        <div>
          <p className="text-text-muted">{t.fleetPage.capacity}</p>
          <p className="mt-0.5 text-text-soft">
            {vehicle.capacityKg.toLocaleString(locale)} {t.fleetPage.kgUnit}
          </p>
        </div>
        <div>
          <p className="text-text-muted">{t.fleetPage.odometer}</p>
          <p className="mt-0.5 text-text-soft">
            {vehicle.odometerKm.toLocaleString(locale)} {t.fleetPage.kmUnit}
          </p>
        </div>
        <div>
          <p className="text-text-muted">{t.fleetPage.nextService}</p>
          <p className="mt-0.5 text-text-soft">
            {vehicle.nextServiceKm.toLocaleString(locale)} {t.fleetPage.kmUnit}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs">
        <span className="shrink-0" style={{ color: fuelColor }}>
          <FuelIcon className="size-3.5" />
        </span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-bg-elevated">
          <div
            className="h-full rounded-full transition-[width]"
            style={{ width: `${vehicle.fuelPercent}%`, backgroundColor: fuelColor }}
          />
        </div>
        <span className="font-mono text-text-soft">{vehicle.fuelPercent}%</span>
      </div>

      <div className="flex items-center justify-between border-t border-border-soft pt-3 text-xs text-text-soft">
        <span>
          {t.fleetPage.assignedTo}: {driverName ?? t.fleetPage.unassigned}
        </span>
        <button
          type="button"
          disabled={!canToggle || toggling}
          onClick={() => onToggle(vehicle.id)}
          className="flex items-center gap-1.5 rounded-md border border-border-soft px-2.5 py-1.5 text-[11px] text-text-soft transition-colors enabled:hover:border-accent/30 enabled:hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          <WrenchIcon className="size-3" />
          {vehicle.status === "maintenance" ? t.fleetPage.setToAvailable : t.fleetPage.setToMaintenance}
        </button>
      </div>
    </div>
  );
}
