"use client";

import FleetView from "@/components/fleet/FleetView";
import { useLang } from "@/i18n/LangContext";

export default function FleetPage() {
  const { t } = useLang();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8 sm:py-8">
      <div className="mb-7">
        <h1 className="text-2xl font-semibold tracking-tight text-text">{t.fleetPage.title}</h1>
        <p className="mt-1 text-sm text-text-soft">{t.fleetPage.subtitle}</p>
      </div>
      <FleetView />
    </div>
  );
}
