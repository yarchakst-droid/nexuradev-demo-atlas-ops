"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { BellIcon, SearchIcon } from "@/components/shared/icons";
import { useLang } from "@/i18n/LangContext";
import { useSearch } from "@/lib/search-context";

let cachedNow = Date.now();

function subscribeToClock(callback: () => void) {
  const id = setInterval(() => {
    cachedNow = Date.now();
    callback();
  }, 1000);
  return () => clearInterval(id);
}

// Ticks once a second via an external subscription rather than setState-in-effect
// (see 02-photo-studio-site/README.md — same react-hooks/set-state-in-effect pitfall).
// getSnapshot must return a value that's stable between calls until the store actually
// changes — passing Date.now itself breaks that contract (it returns a new value on
// almost every call), which React can read as a tear mid-render and re-render to
// resolve, calling getSnapshot again, getting yet another new value, and looping.
// Caching the timestamp and only updating it from the interval callback keeps
// getSnapshot pure between ticks. getServerSnapshot returns 0 so SSR/first client
// render agree, avoiding a hydration mismatch on the live clock text.
function useClock(): Date | null {
  const ts = useSyncExternalStore(subscribeToClock, () => cachedNow, () => 0);
  return ts === 0 ? null : new Date(ts);
}

export default function Topbar() {
  const pathname = usePathname();
  const now = useClock();
  const { t, locale } = useLang();
  const { query, setQuery } = useSearch();
  const searchRef = useRef<HTMLInputElement>(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === searchRef.current) {
        searchRef.current?.blur();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    if (notifOpen) window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [notifOpen]);

  const titles: { match: (p: string) => boolean; crumb: string }[] = [
    { match: (p) => p === "/", crumb: t.topbar.crumbDashboard },
    { match: (p) => p.startsWith("/shipments/"), crumb: t.topbar.crumbRoute },
    { match: (p) => p.startsWith("/drivers"), crumb: t.topbar.crumbDrivers },
    { match: (p) => p.startsWith("/fleet"), crumb: t.topbar.crumbFleet },
    { match: (p) => p.startsWith("/reports"), crumb: t.topbar.crumbReports },
  ];
  const section = titles.find((item) => item.match(pathname)) ?? titles[0];

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-4 border-b border-border bg-bg/85 px-8 backdrop-blur-md">
      <div className="flex min-w-0 items-center gap-1.5 text-sm">
        <span className="text-text-muted">Atlas Ops</span>
        <span className="text-text-muted">/</span>
        <span className="font-medium text-text">{section.crumb}</span>
      </div>

      <div className="mx-auto flex max-w-md flex-1 items-center gap-2 rounded-md border border-border-soft bg-bg-panel px-3 py-1.5 text-xs text-text-muted focus-within:border-accent/40">
        <SearchIcon className="size-3.5 shrink-0" />
        <input
          ref={searchRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.topbar.searchPlaceholder}
          className="min-w-0 flex-1 bg-transparent text-text placeholder:text-text-muted focus:outline-none"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="×"
            className="shrink-0 text-text-muted transition-colors hover:text-text"
          >
            ×
          </button>
        ) : (
          <kbd className="ml-auto hidden shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-text-muted sm:inline">
            ⌘K
          </kbd>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <span className="hidden font-mono text-xs tabular-nums text-text-muted md:inline">
          {now
            ? now.toLocaleString(locale, {
                day: "2-digit",
                month: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
            : "-"}
        </span>
        <LanguageSwitcher />
        <div ref={notifRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setNotifOpen((v) => !v);
              setUnread(false);
            }}
            className="relative flex size-8 items-center justify-center rounded-md text-text-soft transition-colors hover:bg-bg-elevated hover:text-text"
            aria-label={t.topbar.notificationsAria}
          >
            <BellIcon className="size-4" />
            {unread && <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-critical" />}
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full z-40 mt-2 w-80 rounded-lg border border-border bg-bg-panel py-2 shadow-xl">
              <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
                {t.topbar.notificationsTitle}
              </p>
              <div className="flex flex-col">
                {t.topbar.notifications.map((n, i) => (
                  <p key={i} className="border-t border-border-soft px-3 py-2.5 text-xs leading-relaxed text-text-soft">
                    {n}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
