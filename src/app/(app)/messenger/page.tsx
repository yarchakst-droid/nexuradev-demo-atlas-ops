"use client";

import MessengerView from "@/components/messenger/MessengerView";
import { useLang } from "@/i18n/LangContext";

export default function MessengerPage() {
  const { t } = useLang();

  return (
    <div className="mx-auto flex h-[calc(100vh-6.5rem)] max-w-6xl flex-col px-4 py-6 sm:px-8 sm:py-8">
      <div className="mb-5 shrink-0">
        <h1 className="text-2xl font-semibold tracking-tight text-text">{t.messengerPage.title}</h1>
        <p className="mt-1 text-sm text-text-soft">{t.messengerPage.subtitle}</p>
      </div>
      <div className="min-h-0 flex-1">
        <MessengerView />
      </div>
    </div>
  );
}
