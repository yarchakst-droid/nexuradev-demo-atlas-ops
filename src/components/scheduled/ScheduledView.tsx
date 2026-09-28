"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/shared/Modal";
import { CalendarIcon, PlusIcon } from "@/components/shared/icons";
import { useLang } from "@/i18n/LangContext";
import type { Driver, ScheduledTrip, Vehicle } from "@/lib/types";

type TripWithNames = ScheduledTrip & { driverName: string | null; vehiclePlate: string | null };

export default function ScheduledView() {
  const { t, lang, locale } = useLang();
  const [trips, setTrips] = useState<TripWithNames[] | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [assignTripId, setAssignTripId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/scheduled")
      .then((res) => {
        if (!res.ok) throw new Error(t.scheduledPage.loadError);
        return res.json();
      })
      .then((data: { trips: TripWithNames[] }) => {
        if (!cancelled) setTrips(data.trips);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });
    Promise.all([
      fetch("/api/drivers").then((r) => r.json()),
      fetch("/api/vehicles").then((r) => r.json()),
    ]).then(([d, v]) => {
      if (cancelled) return;
      setDrivers(d.drivers);
      setVehicles(v.vehicles);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <p className="rounded-2xl border border-critical/30 bg-critical/5 px-4 py-3 text-sm text-critical">{error}</p>
    );
  }

  if (!trips) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-2xl border border-border bg-bg-panel" />
        ))}
      </div>
    );
  }

  const assignTrip = trips.find((tr) => tr.id === assignTripId) ?? null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="pressable flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent-soft px-3.5 py-2 text-sm font-medium text-accent"
        >
          <PlusIcon className="size-4" />
          {t.scheduledPage.addTrip}
        </button>
      </div>

      {notice && (
        <p className="rounded-lg border border-delayed/30 bg-delayed/10 px-4 py-2.5 text-xs text-delayed">{notice}</p>
      )}

      <div className="panel overflow-hidden rounded-2xl border border-border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-elevated/60 text-left text-[11px] uppercase tracking-wider text-text-muted">
                <th className="px-4 py-3 font-medium">{t.table.code}</th>
                <th className="px-4 py-3 font-medium">{t.scheduledPage.tableRoute}</th>
                <th className="px-4 py-3 font-medium">{t.scheduledPage.tableCargo}</th>
                <th className="px-4 py-3 font-medium">{t.scheduledPage.tableDate}</th>
                <th className="px-4 py-3 font-medium">{t.scheduledPage.tableDriver}</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {trips.map((tr) => (
                <tr key={tr.id} className="border-b border-border-soft last:border-0 hover:bg-bg-hover">
                  <td className="px-4 py-3 font-mono text-xs text-text-soft">{tr.code}</td>
                  <td className="px-4 py-3 text-text">
                    {tr.origin[lang]} <span className="text-text-muted">→</span> {tr.destination[lang]}
                  </td>
                  <td className="px-4 py-3 text-text-soft">{tr.cargo[lang]}</td>
                  <td className="px-4 py-3 font-mono text-xs text-text-soft">
                    {new Date(tr.scheduledAt).toLocaleString(locale, {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    {tr.status === "assigned" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-on-time/14 px-2.5 py-1 text-xs font-medium text-on-time">
                        <span className="size-1.5 rounded-full bg-on-time" />
                        {tr.driverName}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-bg-elevated px-2.5 py-1 text-xs font-medium text-text-muted">
                        {t.scheduledPage.unassignedLabel}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {tr.status === "unassigned" && (
                      <button
                        type="button"
                        onClick={() => setAssignTripId(tr.id)}
                        className="pressable flex items-center gap-1.5 rounded-md border border-border-soft px-2.5 py-1.5 text-xs text-text-soft hover:border-accent/30 hover:text-accent"
                      >
                        <CalendarIcon className="size-3.5" />
                        {t.scheduledPage.assignAction}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {addOpen && (
        <AddTripModal
          onClose={() => setAddOpen(false)}
          onBlocked={(msg) => setNotice(msg)}
        />
      )}

      {assignTrip && (
        <AssignModal
          trip={assignTrip}
          drivers={drivers.filter((d) => d.status !== "on-route")}
          vehicles={vehicles.filter((v) => v.status === "available")}
          onClose={() => setAssignTripId(null)}
          onBlocked={(msg) => setNotice(msg)}
        />
      )}
    </div>
  );
}

function AddTripModal({ onClose, onBlocked }: { onClose: () => void; onBlocked: (msg: string) => void }) {
  const { t, lang } = useLang();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [cargo, setCargo] = useState("");
  const [distanceKm, setDistanceKm] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/scheduled", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin,
          destination,
          cargo,
          distanceKm: Number(distanceKm),
          scheduledAt,
          lang,
        }),
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
    <Modal title={t.scheduledPage.addTripTitle} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Field label={t.scheduledPage.formOrigin} value={origin} onChange={setOrigin} required />
        <Field label={t.scheduledPage.formDestination} value={destination} onChange={setDestination} required />
        <Field label={t.scheduledPage.formCargo} value={cargo} onChange={setCargo} required />
        <Field label={t.scheduledPage.formDistance} value={distanceKm} onChange={setDistanceKm} type="number" required />
        <Field label={t.scheduledPage.formDate} value={scheduledAt} onChange={setScheduledAt} type="datetime-local" required />
        <div className="mt-2 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="pressable rounded-lg border border-border-soft px-3.5 py-2 text-sm text-text-soft">
            {t.common.cancel}
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="pressable rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold text-bg disabled:opacity-60"
          >
            {t.scheduledPage.submitTrip}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function AssignModal({
  trip,
  drivers,
  vehicles,
  onClose,
  onBlocked,
}: {
  trip: TripWithNames;
  drivers: Driver[];
  vehicles: Vehicle[];
  onClose: () => void;
  onBlocked: (msg: string) => void;
}) {
  const { t, lang } = useLang();
  const [driverId, setDriverId] = useState(drivers[0]?.id ?? "");
  const [vehicleId, setVehicleId] = useState(vehicles[0]?.id ?? "");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/scheduled/${trip.id}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ driverId, vehicleId, lang }),
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
    <Modal title={t.scheduledPage.assignModalTitle} onClose={onClose}>
      {drivers.length === 0 || vehicles.length === 0 ? (
        <p className="rounded-lg border border-border-soft bg-bg-elevated px-3.5 py-3 text-sm text-text-soft">
          {t.scheduledPage.noAvailableDrivers}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-text-soft">{t.scheduledPage.chooseDriver}</span>
            <select
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
              className="rounded-lg border border-border-soft bg-bg-panel px-3.5 py-2.5 text-sm text-text outline-none focus:border-accent/40"
            >
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-text-soft">{t.scheduledPage.chooseVehicle}</span>
            <select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="rounded-lg border border-border-soft bg-bg-panel px-3.5 py-2.5 text-sm text-text outline-none focus:border-accent/40"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.model} · {v.plate}
                </option>
              ))}
            </select>
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
              {t.scheduledPage.confirmAssign}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-text-soft">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="rounded-lg border border-border-soft bg-bg-panel px-3.5 py-2.5 text-sm text-text outline-none focus:border-accent/40"
      />
    </label>
  );
}
