"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CompassIcon } from "@/components/shared/icons";
import { SHIPMENT_STATUS_LABELS } from "@/i18n/dictionary";
import { useLang } from "@/i18n/LangContext";
import type { RouteGeometry, ShipmentStatus } from "@/lib/types";

const STATUS_COLOR: Record<ShipmentStatus, string> = {
  "on-time": "var(--color-on-time)",
  delayed: "var(--color-delayed)",
  critical: "var(--color-critical)",
  delivered: "var(--color-delivered)",
};

function pathD(route: RouteGeometry): string {
  const { origin: o, destination: d, control: c } = route;
  return `M ${o.x} ${o.y} Q ${c.x} ${c.y} ${d.x} ${d.y}`;
}

export default function RouteMap({
  route,
  status,
  progressPercent,
  origin,
  destination,
}: {
  route: RouteGeometry;
  status: ShipmentStatus;
  progressPercent: number;
  origin: string;
  destination: string;
}) {
  const { t, lang } = useLang();
  const measureRef = useRef<SVGPathElement>(null);
  const [truckPoint, setTruckPoint] = useState<{ x: number; y: number } | null>(null);
  const color = STATUS_COLOR[status];
  const glowId = useId();

  useEffect(() => {
    const path = measureRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    const point = path.getPointAtLength(length * (progressPercent / 100));
    setTruckPoint({ x: point.x, y: point.y });
  }, [progressPercent, route]);

  return (
    <div className="panel overflow-hidden rounded-xl border border-border">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <CompassIcon className="size-3.5" />
          {t.routeDetail.scaleNote}
        </div>
        <div className="flex items-center gap-1.5 text-xs" style={{ color }}>
          <span className="size-1.5 rounded-full" style={{ backgroundColor: color }} />
          {SHIPMENT_STATUS_LABELS[status][lang]}
        </div>
      </div>

      <svg viewBox="0 0 1000 600" className="h-[380px] w-full">
        <defs>
          <pattern id={`${glowId}-grid`} width="42" height="42" patternUnits="userSpaceOnUse">
            <path d="M 42 0 L 0 0 0 42" fill="none" stroke="var(--color-border-soft)" strokeWidth="1" />
          </pattern>
          <radialGradient id={`${glowId}-terrain-a`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-bg-elevated)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--color-bg-elevated)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${glowId}-vignette`} cx="50%" cy="50%" r="72%">
            <stop offset="60%" stopColor="black" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="0.55" />
          </radialGradient>
          <filter id={`${glowId}-blur`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        <rect width="1000" height="600" fill={`url(#${glowId}-grid)`} />
        <ellipse cx="230" cy="470" rx="280" ry="110" fill={`url(#${glowId}-terrain-a)`} />
        <ellipse cx="800" cy="90" rx="240" ry="100" fill={`url(#${glowId}-terrain-a)`} />

        {/* soft glow of the route beneath the drawn line */}
        <path
          d={pathD(route)}
          fill="none"
          stroke={color}
          strokeOpacity="0.35"
          strokeWidth="8"
          filter={`url(#${glowId}-blur)`}
        />

        {/* faint full corridor */}
        <path d={pathD(route)} fill="none" stroke="var(--color-border)" strokeWidth="2" />

        {/* hidden measurement path (not animated, used to compute truck position) */}
        <path ref={measureRef} d={pathD(route)} fill="none" stroke="none" />

        {/* animated dashed route line */}
        <motion.path
          d={pathD(route)}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeDasharray="9 7"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.3, ease: [0.2, 0.7, 0.2, 1] }}
        />

        {/* origin marker */}
        <g>
          <circle cx={route.origin.x} cy={route.origin.y} r="9" fill={color} opacity="0.16" />
          <circle cx={route.origin.x} cy={route.origin.y} r="6" fill="var(--color-bg-panel)" stroke={color} strokeWidth="2.5" />
          <text
            x={route.origin.x}
            y={route.origin.y - 18}
            textAnchor="middle"
            className="font-mono"
            fontSize="15"
            fill="var(--color-text)"
          >
            {origin}
          </text>
        </g>

        {/* destination marker */}
        <g>
          <circle cx={route.destination.x} cy={route.destination.y} r="9" fill={color} opacity="0.16" />
          <circle cx={route.destination.x} cy={route.destination.y} r="6" fill={color} />
          <text
            x={route.destination.x}
            y={route.destination.y - 18}
            textAnchor="middle"
            className="font-mono"
            fontSize="15"
            fill="var(--color-text)"
          >
            {destination}
          </text>
        </g>

        {/* live truck position */}
        {truckPoint && status !== "delivered" && (
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
          >
            <circle className="pulse-ring" cx={truckPoint.x} cy={truckPoint.y} r="6" fill="none" stroke={color} strokeWidth="1.5" />
            <circle cx={truckPoint.x} cy={truckPoint.y} r="9" fill={color} opacity="0.2" />
            <circle cx={truckPoint.x} cy={truckPoint.y} r="4.5" fill={color} stroke="var(--color-bg-panel)" strokeWidth="2" />
          </motion.g>
        )}

        <rect width="1000" height="600" fill={`url(#${glowId}-vignette)`} className="pointer-events-none" />
      </svg>
    </div>
  );
}
