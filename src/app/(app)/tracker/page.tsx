"use client";

import TrackerView from "@/components/tracker/TrackerView";
import { useLang } from "@/i18n/LangContext";

export default function TrackerPage() {
  const { t } = useLang();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8 sm:py-8">
      <div className="mb-7">
        <h1 className="text-2xl font-semibold tracking-tight text-text">{t.trackerPage.title}</h1>
        <p className="mt-1 text-sm text-text-soft">{t.trackerPage.subtitle}</p>
      </div>
      <TrackerView />
    </div>
  );
}
