"use client";

import { CheckIcon } from "@/components/shared/icons";
import { useLang } from "@/i18n/LangContext";
import type { TimelineEvent } from "@/lib/types";

export default function ShipmentTimeline({ timeline }: { timeline: TimelineEvent[] }) {
  const { lang, locale } = useLang();

  return (
    <ol className="flex flex-col">
      {timeline.map((event, i) => (
        <li key={event.label.uk} className="relative flex gap-3 pb-6 last:pb-0">
          {i < timeline.length - 1 && (
            <span
              className="absolute left-[9px] top-5 h-[calc(100%-0.5rem)] w-px"
              style={{ backgroundColor: "var(--color-border)" }}
            />
          )}
          <span
            className={`z-10 flex size-[19px] shrink-0 items-center justify-center rounded-full border-2 ${
              event.done ? "border-on-time bg-on-time/15 text-on-time" : "border-border text-transparent"
            }`}
          >
            <CheckIcon className="size-2.5" />
          </span>
          <div className="pt-0.5">
            <p className={`text-sm ${event.done ? "text-text" : "text-text-muted"}`}>{event.label[lang]}</p>
            {event.time && (
              <p className="font-mono text-xs text-text-muted">
                {new Date(event.time).toLocaleString(locale, {
                  day: "2-digit",
                  month: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
