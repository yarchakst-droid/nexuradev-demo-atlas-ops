"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/shared/icons";
import { SHIPMENT_STATUS_LABELS } from "@/i18n/dictionary";
import { useLang } from "@/i18n/LangContext";
import type { ShipmentStatus } from "@/lib/types";

const ACTION_STATUSES: { status: ShipmentStatus; color: string }[] = [
  { status: "on-time", color: "var(--color-on-time)" },
  { status: "delayed", color: "var(--color-delayed)" },
  { status: "critical", color: "var(--color-critical)" },
];

export default function StatusActionBar({
  status,
  onUpdate,
}: {
  status: ShipmentStatus;
  onUpdate: (status: ShipmentStatus) => Promise<void>;
}) {
  const { t, lang } = useLang();
  const [pending, setPending] = useState<ShipmentStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleClick(next: ShipmentStatus) {
    setPending(next);
    setError(null);
    try {
      await onUpdate(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.routeDetail.updateError);
    } finally {
      setPending(null);
    }
  }

  if (status === "delivered") {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-delivered/30 bg-delivered/10 px-3.5 py-2.5 text-sm text-delivered">
        <CheckIcon className="size-4" />
        {t.routeDetail.delivered}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{t.routeDetail.updateStatus}</p>
      <div className="flex flex-wrap gap-2">
        {ACTION_STATUSES.filter((a) => a.status !== status).map((action) => (
          <button
            key={action.status}
            type="button"
            disabled={pending !== null}
            onClick={() => handleClick(action.status)}
            className="rounded-lg border px-3.5 py-2 text-xs font-medium transition-all hover:brightness-125 disabled:opacity-60"
            style={{
              borderColor: `color-mix(in srgb, ${action.color} 35%, transparent)`,
              backgroundColor: `color-mix(in srgb, ${action.color} 8%, transparent)`,
              color: action.color,
            }}
          >
            {pending === action.status ? t.routeDetail.updating : SHIPMENT_STATUS_LABELS[action.status][lang]}
          </button>
        ))}
        <button
          type="button"
          disabled={pending !== null}
          onClick={() => handleClick("delivered")}
          className="rounded-lg border border-accent/40 bg-accent-soft px-3.5 py-2 text-xs font-medium text-accent transition-all hover:brightness-125 disabled:opacity-60"
        >
          {pending === "delivered" ? t.routeDetail.updating : t.routeDetail.markDelivered}
        </button>
      </div>
      {error && <p className="text-xs text-critical">{error}</p>}
    </div>
  );
}
