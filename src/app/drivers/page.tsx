"use client";

import DriversView from "@/components/drivers/DriversView";
import { useLang } from "@/i18n/LangContext";

export default function DriversPage() {
  const { t } = useLang();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8 sm:py-8">
      <div className="mb-7">
        <h1 className="text-2xl font-semibold tracking-tight text-text">{t.driversPage.title}</h1>
        <p className="mt-1 text-sm text-text-soft">{t.driversPage.subtitle}</p>
      </div>
      <DriversView />
    </div>
  );
}
