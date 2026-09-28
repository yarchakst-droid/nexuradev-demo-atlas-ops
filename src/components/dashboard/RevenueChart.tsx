"use client";

import { useState } from "react";
import { useLang } from "@/i18n/LangContext";
import type { RevenueDay } from "@/data/revenue-history";

const VIEW_W = 760;
const VIEW_H = 220;
const PAD_TOP = 16;
const PAD_BOTTOM = 28;
const PAD_LEFT = 4;
const PAD_RIGHT = 4;

export default function RevenueChart({ data }: { data: RevenueDay[] }) {
  const { t, locale } = useLang();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (data.length === 0) return null;

  const values = data.map((d) => d.revenue);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const plotW = VIEW_W - PAD_LEFT - PAD_RIGHT;
  const plotH = VIEW_H - PAD_TOP - PAD_BOTTOM;

  const xFor = (i: number) => PAD_LEFT + (i / (data.length - 1)) * plotW;
  const yFor = (v: number) => PAD_TOP + plotH - ((v - min) / range) * plotH;

  const linePoints = data.map((d, i) => `${xFor(i)},${yFor(d.revenue)}`).join(" ");
  const areaPoints = `${PAD_LEFT},${PAD_TOP + plotH} ${linePoints} ${PAD_LEFT + plotW},${PAD_TOP + plotH}`;

  const gridSteps = [min, min + range / 2, max];
  const last = data[data.length - 1];
  const hovered = hoverIndex !== null ? data[hoverIndex] : null;

  function handlePointerMove(e: React.PointerEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * VIEW_W;
    const ratio = Math.min(1, Math.max(0, (relX - PAD_LEFT) / plotW));
    const index = Math.round(ratio * (data.length - 1));
    setHoverIndex(index);
  }

  const activeIndex = hoverIndex ?? data.length - 1;
  const activePoint = data[activeIndex];
  const tooltipLeftPercent = (xFor(activeIndex) / VIEW_W) * 100;
  const tooltipAlignRight = tooltipLeftPercent > 65;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="h-[220px] w-full cursor-crosshair touch-none"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setHoverIndex(null)}
      >
        {gridSteps.map((v, i) => (
          <g key={i}>
            <line
              x1={PAD_LEFT}
              x2={VIEW_W - PAD_RIGHT}
              y1={yFor(v)}
              y2={yFor(v)}
              stroke="var(--color-border-soft)"
              strokeWidth="1"
            />
            <text x={0} y={yFor(v) - 4} fontSize="10" className="font-mono" fill="var(--color-text-muted)">
              {Math.round(v / 1000)}k
            </text>
          </g>
        ))}

        <polygon points={areaPoints} fill="var(--color-accent)" opacity="0.1" stroke="none" />
        <polyline
          points={linePoints}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {hovered && (
          <line
            x1={xFor(activeIndex)}
            x2={xFor(activeIndex)}
            y1={PAD_TOP}
            y2={PAD_TOP + plotH}
            stroke="var(--color-text-muted)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
        )}

        <circle
          cx={xFor(activeIndex)}
          cy={yFor(activePoint.revenue)}
          r="5"
          fill="var(--color-accent)"
          stroke="var(--color-bg-elevated)"
          strokeWidth="2"
        />

        <text
          x={xFor(data.length - 1)}
          y={yFor(last.revenue) - 10}
          textAnchor="end"
          fontSize="11"
          className="font-mono"
          fill="var(--color-accent)"
        >
          {Math.round(last.revenue / 1000)}k {t.dashboardPage.currencyUnit}
        </text>
      </svg>

      <div
        className="pointer-events-none absolute top-1 rounded-lg border border-border bg-bg-panel px-3 py-2 text-xs shadow-lg transition-opacity"
        style={{
          left: `${tooltipLeftPercent}%`,
          transform: tooltipAlignRight ? "translateX(-100%)" : "translateX(0)",
          opacity: hoverIndex !== null ? 1 : 0,
        }}
      >
        <p className="font-mono text-sm font-medium text-text">
          {activePoint.revenue.toLocaleString(locale)} {t.dashboardPage.currencyUnit}
        </p>
        <p className="mt-0.5 text-text-muted">
          {new Date(activePoint.date).toLocaleDateString(locale, { day: "2-digit", month: "short" })}
        </p>
      </div>
    </div>
  );
}
