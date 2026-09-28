"use client";

import { useLang } from "@/i18n/LangContext";

export default function StatusFilterTabs({
  active,
  onChange,
  counts,
}: {
  active: string;
  onChange: (value: string) => void;
  counts: Record<string, number>;
}) {
  const { t } = useLang();
  const options = [
    { value: "all", label: t.filters.all },
    { value: "on-time", label: t.filters.onTime },
    { value: "delayed", label: t.filters.delayed },
    { value: "critical", label: t.filters.critical },
    { value: "delivered", label: t.filters.delivered },
  ];

  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const isActive = opt.value === active;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`pressable rounded-full border px-3.5 py-1.5 text-xs font-medium ${
              isActive
                ? "border-accent/40 bg-accent-soft text-accent shadow-[0_0_0_1px_rgba(63,198,255,0.08)]"
                : "border-border text-text-soft hover:border-border hover:bg-bg-hover hover:text-text"
            }`}
          >
            {opt.label}
            {counts[opt.value] !== undefined && (
              <span className={`ml-1.5 ${isActive ? "text-accent/70" : "text-text-muted"}`}>
                {counts[opt.value]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
