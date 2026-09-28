"use client";

import { useEffect, useState } from "react";
import DriverCard from "@/components/drivers/DriverCard";
import { useLang } from "@/i18n/LangContext";
import type { Driver, Shipment } from "@/lib/types";

type DriverWithShipment = Driver & { shipment: Shipment | null };

export default function DriversView() {
  const { t } = useLang();
  const [drivers, setDrivers] = useState<DriverWithShipment[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/drivers")
      .then((res) => {
        if (!res.ok) throw new Error(t.driversPage.loadError);
        return res.json();
      })
      .then((data: { drivers: DriverWithShipment[] }) => {
        if (!cancelled) setDrivers(data.drivers);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <p className="rounded-2xl border border-critical/30 bg-critical/5 px-4 py-3 text-sm text-critical">
        {error}
      </p>
    );
  }

  if (!drivers) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-56 animate-pulse rounded-2xl border border-border bg-bg-panel" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {drivers.map((driver) => (
        <DriverCard key={driver.id} driver={driver} shipment={driver.shipment ?? undefined} />
      ))}
    </div>
  );
}
