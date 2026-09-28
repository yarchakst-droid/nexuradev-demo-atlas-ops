"use client";

import { useEffect, useState } from "react";
import DriverCard from "@/components/drivers/DriverCard";
import Modal from "@/components/shared/Modal";
import { PlusIcon } from "@/components/shared/icons";
import { useLang } from "@/i18n/LangContext";
import type { Driver, Shipment } from "@/lib/types";

type DriverWithShipment = Driver & { shipment: Shipment | null };

export default function DriversView() {
  const { t, lang } = useLang();
  const [drivers, setDrivers] = useState<DriverWithShipment[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);

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
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="pressable flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent-soft px-3.5 py-2 text-sm font-medium text-accent"
        >
          <PlusIcon className="size-4" />
          {t.driversPage.addDriver}
        </button>
      </div>

      {notice && (
        <p className="rounded-lg border border-delayed/30 bg-delayed/10 px-4 py-2.5 text-xs text-delayed">{notice}</p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {drivers.map((driver) => (
          <DriverCard key={driver.id} driver={driver} shipment={driver.shipment ?? undefined} />
        ))}
      </div>

      {addOpen && (
        <Modal title={t.driversPage.addDriverTitle} onClose={() => setAddOpen(false)}>
          <AddDriverForm
            lang={lang}
            onClose={() => setAddOpen(false)}
            onBlocked={(msg) => setNotice(msg)}
          />
        </Modal>
      )}
    </div>
  );
}

function AddDriverForm({
  lang,
  onClose,
  onBlocked,
}: {
  lang: string;
  onClose: () => void;
  onBlocked: (msg: string) => void;
}) {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [plate, setPlate] = useState("");
  const [yearsActive, setYearsActive] = useState("0");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/drivers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, vehicle, plate, yearsActive: Number(yearsActive), lang }),
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
        <span className="text-xs font-medium text-text-soft">{t.driversPage.formName}</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="rounded-lg border border-border-soft bg-bg-panel px-3.5 py-2.5 text-sm text-text outline-none focus:border-accent/40"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-text-soft">{t.driversPage.formPhone}</span>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="rounded-lg border border-border-soft bg-bg-panel px-3.5 py-2.5 text-sm text-text outline-none focus:border-accent/40"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-text-soft">{t.driversPage.formVehicle}</span>
        <input
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
          required
          className="rounded-lg border border-border-soft bg-bg-panel px-3.5 py-2.5 text-sm text-text outline-none focus:border-accent/40"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-text-soft">{t.driversPage.formPlate}</span>
        <input
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
          required
          className="rounded-lg border border-border-soft bg-bg-panel px-3.5 py-2.5 text-sm text-text outline-none focus:border-accent/40"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-text-soft">{t.driversPage.formYears}</span>
        <input
          type="number"
          min={0}
          value={yearsActive}
          onChange={(e) => setYearsActive(e.target.value)}
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
          {t.driversPage.submitDriver}
        </button>
      </div>
    </form>
  );
}
