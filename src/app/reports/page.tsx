"use client";

import ReportsView from "@/components/reports/ReportsView";
import { useLang } from "@/i18n/LangContext";

export default function ReportsPage() {
  const { t } = useLang();

  return (
    <div className="mx-auto max-w-6xl px-8 py-8">
      <div className="mb-7">
        <h1 className="text-2xl font-semibold tracking-tight text-text">{t.reportsPage.title}</h1>
        <p className="mt-1 text-sm text-text-soft">{t.reportsPage.subtitle}</p>
      </div>
      <ReportsView />
    </div>
  );
}
