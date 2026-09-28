"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SHIPMENT_STATUS_LABELS } from "@/i18n/dictionary";
import { useLang } from "@/i18n/LangContext";
import type { ShipmentWithDriver } from "@/lib/shipments";
import type { ShipmentStatus } from "@/lib/types";

const STATUS_COLOR: Record<ShipmentStatus, string> = {
  "on-time": "var(--color-on-time)",
  delayed: "var(--color-delayed)",
  critical: "var(--color-critical)",
  delivered: "var(--color-delivered)",
};

function pathD(o: { x: number; y: number }, d: { x: number; y: number }, c: { x: number; y: number }): string {
  return `M ${o.x} ${o.y} Q ${c.x} ${c.y} ${d.x} ${d.y}`;
}

export default function TrackerView() {
  const { t, lang } = useLang();
  const router = useRouter();
  const [shipments, setShipments] = useState<ShipmentWithDriver[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const measureRefs = useRef<Record<string, SVGPathElement | null>>({});
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});

  useEffect(() => {
    let cancelled = false;
    function load() {
      fetch("/api/shipments")
        .then((res) => {
          if (!res.ok) throw new Error(t.trackerPage.loadError);
          return res.json();
        })
        .then((data: { shipments: ShipmentWithDriver[] }) => {
          if (!cancelled) setShipments(data.shipments);
        })
        .catch((err: Error) => {
          if (!cancelled) setError(err.message);
        });
    }
    load();
    const id = setInterval(load, 20_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const active = (shipments ?? []).filter((s) => s.status !== "delivered");

  // Measured from a ref callback rather than an effect: an inline callback like
  // this re-fires on every render (React treats it as a new function identity),
  // which is exactly what's needed here — it re-measures the path the moment its
  // "d" attribute reflects the shipment's latest progressPercent. The equality
  // guard stops that from looping (same point in -> same state out -> no re-render).
  function measureTruck(id: string, progressPercent: number, path: SVGPathElement | null) {
    measureRefs.current[id] = path;
    if (!path) return;
    const length = path.getTotalLength();
    const raw = path.getPointAtLength(length * (progressPercent / 100));
    const point = { x: raw.x, y: raw.y };
    setPositions((prev) => {
      const existing = prev[id];
      if (existing && existing.x === point.x && existing.y === point.y) return prev;
      return { ...prev, [id]: point };
    });
  }

  // Dedupe city markers by rounded coordinate — several routes share the same
  // origin/destination since the network's city coordinates are consistent
  // across shipments (see data/shipments.ts).
  const cityPoints = new Map<string, { x: number; y: number; label: string }>();
  for (const s of active) {
    const oKey = `${s.route.origin.x},${s.route.origin.y}`;
    const dKey = `${s.route.destination.x},${s.route.destination.y}`;
    if (!cityPoints.has(oKey)) cityPoints.set(oKey, { ...s.route.origin, label: s.origin[lang] });
    if (!cityPoints.has(dKey)) cityPoints.set(dKey, { ...s.route.destination, label: s.destination[lang] });
  }

  if (error) {
    return (
      <p className="rounded-2xl border border-critical/30 bg-critical/5 px-4 py-3 text-sm text-critical">{error}</p>
    );
  }

  if (!shipments) {
    return <div className="h-[560px] animate-pulse rounded-2xl border border-border bg-bg-panel" />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs text-text-soft">
          <span className="pulse-dot size-1.5 rounded-full bg-on-time" />
          {t.trackerPage.activeCount(active.length)}
        </span>
        <span className="text-xs text-text-muted">{t.trackerPage.legendNote}</span>
      </div>

      <div className="panel overflow-hidden rounded-2xl border border-border">
        {active.length === 0 ? (
          <p className="px-6 py-16 text-center text-sm text-text-muted">{t.trackerPage.noActive}</p>
        ) : (
          <svg viewBox="0 0 1000 600" className="h-[560px] w-full">
            <defs>
              <pattern id="tracker-grid" width="42" height="42" patternUnits="userSpaceOnUse">
                <path d="M 42 0 L 0 0 0 42" fill="none" stroke="var(--color-border-soft)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="1000" height="600" fill="url(#tracker-grid)" />

            {active.map((s) => (
              <path
                key={`corridor-${s.id}`}
                d={pathD(s.route.origin, s.route.destination, s.route.control)}
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="1.5"
              />
            ))}

            {active.map((s) => (
              <path
                key={`ref-${s.id}`}
                ref={(el) => measureTruck(s.id, s.progressPercent, el)}
                d={pathD(s.route.origin, s.route.destination, s.route.control)}
                fill="none"
                stroke="none"
              />
            ))}

            {active.map((s) => (
              <path
                key={`route-${s.id}`}
                d={pathD(s.route.origin, s.route.destination, s.route.control)}
                fill="none"
                stroke={STATUS_COLOR[s.status]}
                strokeWidth="2"
                strokeDasharray="7 6"
                strokeLinecap="round"
                opacity="0.85"
              />
            ))}

            {[...cityPoints.values()].map((c) => (
              <g key={`${c.x}-${c.y}`}>
                <circle cx={c.x} cy={c.y} r="5" fill="var(--color-bg-panel)" stroke="var(--color-border)" strokeWidth="1.5" />
                <text x={c.x} y={c.y - 12} textAnchor="middle" className="font-mono" fontSize="13" fill="var(--color-text-soft)">
                  {c.label}
                </text>
              </g>
            ))}

            {active.map((s) => {
              const point = positions[s.id];
              if (!point) return null;
              const color = STATUS_COLOR[s.status];
              return (
                <g
                  key={`truck-${s.id}`}
                  className="cursor-pointer"
                  onClick={() => router.push(`/shipments/${s.id}`)}
                >
                  <title>
                    {s.code} · {s.driverName} · {SHIPMENT_STATUS_LABELS[s.status][lang]}
                  </title>
                  <circle className="pulse-ring" cx={point.x} cy={point.y} r="6" fill="none" stroke={color} strokeWidth="1.5" />
                  <circle cx={point.x} cy={point.y} r="9" fill={color} opacity="0.18" />
                  <circle cx={point.x} cy={point.y} r="4.5" fill={color} stroke="var(--color-bg-panel)" strokeWidth="2" />
                  <text x={point.x} y={point.y + 18} textAnchor="middle" className="font-mono" fontSize="11" fill={color}>
                    {s.code}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>
    </div>
  );
}
