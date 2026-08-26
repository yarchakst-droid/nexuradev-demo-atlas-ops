"use client";

import { useEffect, useState } from "react";
import VehicleCard from "@/components/fleet/VehicleCard";
import { useLang } from "@/i18n/LangContext";
import type { Vehicle } from "@/lib/types";

type VehicleWithDriver = Vehicle & { driverName: string | null };

export default function FleetView() {
  const { t, lang } = useLang();
  const [vehicles, setVehicles] = useState<VehicleWithDriver[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/vehicles")
      .then((res) => {
        if (!res.ok) throw new Error(t.fleetPage.loadError);
        return res.json();
      })
      .then((data: { vehicles: VehicleWithDriver[] }) => {
        if (!cancelled) setVehicles(data.vehicles);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleToggle(id: string) {
    const vehicle = vehicles?.find((v) => v.id === id);
    if (!vehicle) return;
    const nextStatus = vehicle.status === "maintenance" ? "available" : "maintenance";

    setTogglingId(id);
    try {
      const res = await fetch(`/api/vehicles/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus, lang }),
      });
      const data = await res.json();
      if (!res.ok) return;
      setVehicles((prev) => prev!.map((v) => (v.id === id ? { ...v, status: data.vehicle.status } : v)));
    } finally {
      setTogglingId(null);
    }
  }

  if (error) {
    return (
      <p className="rounded-xl border border-critical/30 bg-critical/5 px-4 py-3 text-sm text-critical">{error}</p>
    );
  }

  if (!vehicles) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 animate-pulse rounded-xl border border-border bg-bg-panel" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          driverName={vehicle.driverName}
          onToggle={handleToggle}
          toggling={togglingId === vehicle.id}
        />
      ))}
    </div>
  );
}
