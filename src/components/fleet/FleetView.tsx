"use client";

import { useEffect, useState } from "react";
import VehicleCard from "@/components/fleet/VehicleCard";
import Modal from "@/components/shared/Modal";
import { PlusIcon } from "@/components/shared/icons";
import { useLang } from "@/i18n/LangContext";
import type { Vehicle, VehicleType } from "@/lib/types";

type VehicleWithDriver = Vehicle & { driverName: string | null };

export default function FleetView() {
  const { t, lang } = useLang();
  const [vehicles, setVehicles] = useState<VehicleWithDriver[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);

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
    } catch (err) {
      console.error("Failed to update vehicle status", err);
    } finally {
      setTogglingId(null);
    }
  }

  if (error) {
    return (
      <p className="rounded-2xl border border-critical/30 bg-critical/5 px-4 py-3 text-sm text-critical">{error}</p>
    );
  }

  if (!vehicles) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 animate-pulse rounded-2xl border border-border bg-bg-panel" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="pressable flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent-soft px-3.5 py-2 text-sm font-medium text-accent"
        >
          <PlusIcon className="size-4" />
          {t.fleetPage.addVehicle}
        </button>
      </div>

      {notice && (
        <p className="rounded-lg border border-delayed/30 bg-delayed/10 px-4 py-2.5 text-xs text-delayed">{notice}</p>
      )}

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

      {addOpen && (
        <Modal title={t.fleetPage.addVehicleTitle} onClose={() => setAddOpen(false)}>
          <AddVehicleForm lang={lang} onClose={() => setAddOpen(false)} onBlocked={(msg) => setNotice(msg)} />
        </Modal>
      )}
    </div>
  );
}

function AddVehicleForm({
  lang,
  onClose,
  onBlocked,
}: {
  lang: string;
  onClose: () => void;
  onBlocked: (msg: string) => void;
}) {
  const { t } = useLang();
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [type, setType] = useState<VehicleType>("truck");
  const [capacityKg, setCapacityKg] = useState("1000");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, plate, type, capacityKg: Number(capacityKg), lang }),
      });
      const data = await res.json();
      if (!res.ok) {
        onBlocked(data.error ?? t.common.readOnlyNotice);
        onClose();
      }
    } catch {
      onBlocked(t.common.readOnlyNotice);
      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-text-soft">{t.fleetPage.formModel}</span>
        <input
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
          className="rounded-lg border border-border-soft bg-bg-panel px-3.5 py-2.5 text-sm text-text outline-none focus:border-accent/40"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-text-soft">{t.fleetPage.formPlate}</span>
        <input
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
          required
          className="rounded-lg border border-border-soft bg-bg-panel px-3.5 py-2.5 text-sm text-text outline-none focus:border-accent/40"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-text-soft">{t.fleetPage.formType}</span>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as VehicleType)}
          className="rounded-lg border border-border-soft bg-bg-panel px-3.5 py-2.5 text-sm text-text outline-none focus:border-accent/40"
        >
          <option value="truck">{t.fleetPage.truckType}</option>
          <option value="van">{t.fleetPage.vanType}</option>
        </select>
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-text-soft">{t.fleetPage.formCapacity}</span>
        <input
          type="number"
          min={1}
          value={capacityKg}
          onChange={(e) => setCapacityKg(e.target.value)}
          className="rounded-lg border border-border-soft bg-bg-panel px-3.5 py-2.5 text-sm text-text outline-none focus:border-accent/40"
        />
      </label>
      <div className="mt-2 flex justify-end gap-2">
        <button type="button" onClick={onClose} className="pressable rounded-lg border border-border-soft px-3.5 py-2 text-sm text-text-soft">
          {t.common.cancel}
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="pressable rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold text-bg disabled:opacity-60"
        >
          {t.fleetPage.submitVehicle}
        </button>
      </div>
    </form>
  );
}
