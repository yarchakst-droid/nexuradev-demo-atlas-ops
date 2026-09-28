"use client";

import { useLang } from "@/i18n/LangContext";
import { LANG_LABELS } from "@/i18n/dictionary";
import type { Lang } from "@/lib/types";

const OPTIONS: Lang[] = ["uk", "en", "ru"];

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div className={`flex items-center gap-0.5 rounded-md border border-border-soft bg-bg-panel p-0.5 ${className}`}>
      {OPTIONS.map((option) => {
        const active = option === lang;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLang(option)}
            aria-label={`Atlas Ops: ${LANG_LABELS[option]}`}
            className={`rounded px-2.5 py-1.5 text-[10px] font-semibold tracking-wide transition-colors ${
              active ? "bg-accent-soft text-accent" : "text-text-muted hover:text-text-soft"
            }`}
          >
            {LANG_LABELS[option]}
          </button>
        );
      })}
    </div>
  );
}
