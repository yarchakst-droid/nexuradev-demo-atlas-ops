"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Avatar from "@/components/shared/Avatar";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  ChatIcon,
  GaugeIcon,
  MenuIcon,
  RadarIcon,
  SearchIcon,
  TruckIcon,
  UsersIcon,
  WalletIcon,
} from "@/components/shared/icons";
import { DriverStatusBadge, ShipmentStatusBadge, VehicleStatusBadge } from "@/components/shared/StatusBadge";
import type { Dictionary } from "@/i18n/dictionary";
import { useLang } from "@/i18n/LangContext";
import type { OpsAlert } from "@/lib/alerts";
import type { ShipmentWithDriver } from "@/lib/shipments";
import { useSearch } from "@/lib/search-context";
import { useSidebar } from "@/lib/sidebar-context";
import type { Driver, Lang, Vehicle } from "@/lib/types";

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

type SearchResults = {
  shipments: ShipmentWithDriver[];
  drivers: Driver[];
  vehicles: (Vehicle & { driverName: string | null })[];
};

const EMPTY_RESULTS: SearchResults = { shipments: [], drivers: [], vehicles: [] };

function alertText(a: OpsAlert, t: Dictionary, lang: Lang): string {
  if (a.kind === "shipment-critical" && a.shipment) {
    return t.topbar.alertShipmentCritical(
      a.shipment.code,
      `${a.shipment.origin[lang]} → ${a.shipment.destination[lang]}`,
      a.shipment.delayMinutes,
    );
  }
  if (a.kind === "shipment-delayed" && a.shipment) {
    return t.topbar.alertShipmentDelayed(
      a.shipment.code,
      `${a.shipment.origin[lang]} → ${a.shipment.destination[lang]}`,
      a.shipment.delayMinutes,
    );
  }
  if (a.kind === "vehicle-fuel" && a.vehicle) {
    return t.topbar.alertVehicleFuel(a.vehicle.plate, a.vehicle.fuelPercent);
  }
  if (a.kind === "vehicle-service" && a.vehicle) {
    return t.topbar.alertVehicleService(a.vehicle.plate, a.vehicle.nextServiceKm);
  }
  return "";
}

type FlatItem = { href: string };

export default function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const now = useClock();
  const { t, lang, locale } = useLang();
  const { query, setQuery } = useSearch();
  const { open: openSidebar } = useSidebar();
  const searchRef = useRef<HTMLInputElement>(null);
  const searchWrapRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [results, setResults] = useState<SearchResults>(EMPTY_RESULTS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevQuery, setPrevQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [alerts, setAlerts] = useState<OpsAlert[]>([]);

  const trimmedQuery = query.trim();
  const effectiveResults = trimmedQuery ? results : EMPTY_RESULTS;

  // Reset the keyboard-selected row whenever the search term changes. Adjusting state
  // during render (rather than in an effect) avoids an extra render pass — see
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (trimmedQuery !== prevQuery) {
    setPrevQuery(trimmedQuery);
    setActiveIndex(0);
  }

  const quickPages = [
    { href: "/", label: t.sidebar.dashboard, icon: GaugeIcon },
    { href: "/drivers", label: t.sidebar.drivers, icon: UsersIcon },
    { href: "/fleet", label: t.sidebar.fleet, icon: TruckIcon },
    { href: "/scheduled", label: t.sidebar.scheduled, icon: CalendarIcon },
    { href: "/tracker", label: t.sidebar.tracker, icon: RadarIcon },
    { href: "/messenger", label: t.sidebar.messenger, icon: ChatIcon },
    { href: "/billing", label: t.sidebar.billing, icon: WalletIcon },
    { href: "/reports", label: t.sidebar.reports, icon: ChartBarIcon },
  ];

  const flatItems: FlatItem[] = trimmedQuery
    ? [
        ...effectiveResults.shipments.map((s) => ({ href: `/shipments/${s.id}` })),
        ...effectiveResults.drivers.map((d) => ({ href: `/drivers/${d.id}` })),
        ...effectiveResults.vehicles.map((v) => ({ href: `/fleet/${v.id}` })),
      ]
    : quickPages.map((p) => ({ href: p.href }));

  function goTo(href: string) {
    setSearchOpen(false);
    setQuery("");
    setResults(EMPTY_RESULTS);
    searchRef.current?.blur();
    router.push(href);
  }

  // Poll live dispatcher alerts (critical/delayed shipments, low fuel, service due)
  // instead of showing a fixed static list — the bell should reflect real store state.
  useEffect(() => {
    let cancelled = false;
    function load() {
      fetch("/api/alerts")
        .then((res) => res.json())
        .then((data: { alerts: OpsAlert[] }) => {
          if (!cancelled) setAlerts(data.alerts);
        })
        .catch(() => {});
    }
    load();
    const id = setInterval(load, 20_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  // Debounced cross-entity search (shipments, drivers, fleet) for the palette.
  useEffect(() => {
    if (!trimmedQuery) return;
    const handle = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(trimmedQuery)}&lang=${lang}`)
        .then((res) => res.json())
        .then((data: SearchResults) => setResults(data))
        .catch(() => setResults(EMPTY_RESULTS));
    }, 150);
    return () => clearTimeout(handle);
  }, [trimmedQuery, lang]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
        setSearchOpen(true);
        return;
      }
      if (!searchOpen) return;
      if (e.key === "Escape") {
        setSearchOpen(false);
        searchRef.current?.blur();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        return;
      }
      if (e.key === "Enter") {
        const item = flatItems[activeIndex];
        if (item) goTo(item.href);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchOpen, flatItems, activeIndex]);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    if (searchOpen || notifOpen) window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [searchOpen, notifOpen]);

  const titles: { match: (p: string) => boolean; crumb: string }[] = [
    { match: (p) => p === "/", crumb: t.topbar.crumbDashboard },
    { match: (p) => p.startsWith("/shipments/"), crumb: t.topbar.crumbRoute },
    { match: (p) => p.startsWith("/drivers"), crumb: t.topbar.crumbDrivers },
    { match: (p) => p.startsWith("/fleet"), crumb: t.topbar.crumbFleet },
    { match: (p) => p.startsWith("/scheduled"), crumb: t.topbar.crumbScheduled },
    { match: (p) => p.startsWith("/tracker"), crumb: t.topbar.crumbTracker },
    { match: (p) => p.startsWith("/messenger"), crumb: t.topbar.crumbMessenger },
    { match: (p) => p.startsWith("/billing"), crumb: t.topbar.crumbBilling },
    { match: (p) => p.startsWith("/reports"), crumb: t.topbar.crumbReports },
  ];
  const section = titles.find((item) => item.match(pathname)) ?? titles[0];

  const worstSeverity = alerts.some((a) => a.severity === "critical")
    ? "critical"
    : alerts.length > 0
      ? "delayed"
      : null;

  let resultRow = 0;

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-bg/85 px-4 backdrop-blur-md lg:gap-4 lg:px-8">
      <button
        type="button"
        onClick={openSidebar}
        aria-label={t.topbar.openMenuAria}
        className="-ml-1 flex size-8 shrink-0 items-center justify-center pressable rounded-md text-text-soft hover:bg-bg-elevated hover:text-text lg:hidden"
      >
        <MenuIcon className="size-4.5" />
      </button>

      <div className="hidden min-w-0 items-center gap-1.5 text-sm lg:flex">
        <span className="text-text-muted">Atlas Ops</span>
        <span className="text-text-muted">/</span>
        <span className="font-medium text-text">{section.crumb}</span>
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-1.5 text-sm lg:hidden">
        <span className="truncate font-medium text-text">{section.crumb}</span>
      </div>

      <div ref={searchWrapRef} className="relative mx-auto hidden max-w-md flex-1 lg:block">
        <div className="flex items-center gap-2 rounded-md border border-border-soft bg-bg-panel px-3 py-1.5 text-xs text-text-muted focus-within:border-accent/40">
          <SearchIcon className="size-3.5 shrink-0" />
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSearchOpen(true)}
            placeholder={t.topbar.searchPlaceholder}
            className="min-w-0 flex-1 bg-transparent text-text placeholder:text-text-muted focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                searchRef.current?.focus();
              }}
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

        {searchOpen && (
          <div className="panel absolute left-0 right-0 top-full z-40 mt-2 max-h-[28rem] overflow-y-auto rounded-2xl border border-border py-2 shadow-xl">
            {!trimmedQuery ? (
              <>
                <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                  {t.topbar.searchSectionPages}
                </p>
                {quickPages.map((p, i) => (
                  <button
                    key={p.href}
                    type="button"
                    onClick={() => goTo(p.href)}
                    data-active={activeIndex === i}
                    className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-text-soft data-[active=true]:bg-bg-hover data-[active=true]:text-text hover:bg-bg-hover hover:text-text"
                  >
                    <p.icon className="size-3.5 text-text-muted" />
                    {p.label}
                  </button>
                ))}
              </>
            ) : effectiveResults.shipments.length === 0 && effectiveResults.drivers.length === 0 && effectiveResults.vehicles.length === 0 ? (
              <p className="px-3 py-4 text-center text-xs text-text-muted">{t.topbar.searchNoResults(trimmedQuery)}</p>
            ) : (
              <>
                {effectiveResults.shipments.length > 0 && (
                  <div className="mb-1">
                    <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                      {t.topbar.searchSectionShipments}
                    </p>
                    {effectiveResults.shipments.map((s) => {
                      const i = resultRow++;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => goTo(`/shipments/${s.id}`)}
                          data-active={activeIndex === i}
                          className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm data-[active=true]:bg-bg-hover hover:bg-bg-hover"
                        >
                          <span className="min-w-0">
                            <span className="block font-mono text-[11px] text-text-muted">{s.code}</span>
                            <span className="block truncate text-text">
                              {s.origin[lang]} <span className="text-text-muted">→</span> {s.destination[lang]}
                            </span>
                          </span>
                          <ShipmentStatusBadge status={s.status} />
                        </button>
                      );
                    })}
                  </div>
                )}

                {effectiveResults.drivers.length > 0 && (
                  <div className="mb-1">
                    <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                      {t.topbar.searchSectionDrivers}
                    </p>
                    {effectiveResults.drivers.map((d) => {
                      const i = resultRow++;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => goTo(`/drivers/${d.id}`)}
                          data-active={activeIndex === i}
                          className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm data-[active=true]:bg-bg-hover hover:bg-bg-hover"
                        >
                          <span className="flex min-w-0 items-center gap-2.5">
                            <Avatar src={d.avatar} name={d.name} sizePx={24} className="size-6" />
                            <span className="truncate text-text">{d.name}</span>
                          </span>
                          <DriverStatusBadge status={d.status} />
                        </button>
                      );
                    })}
                  </div>
                )}

                {effectiveResults.vehicles.length > 0 && (
                  <div>
                    <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                      {t.topbar.searchSectionVehicles}
                    </p>
                    {effectiveResults.vehicles.map((v) => {
                      const i = resultRow++;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => goTo(`/fleet/${v.id}`)}
                          data-active={activeIndex === i}
                          className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm data-[active=true]:bg-bg-hover hover:bg-bg-hover"
                        >
                          <span className="flex min-w-0 items-center gap-2.5">
                            <TruckIcon className="size-3.5 shrink-0 text-text-muted" />
                            <span className="truncate text-text">{v.model}</span>
                            <span className="shrink-0 font-mono text-[11px] text-text-muted">{v.plate}</span>
                          </span>
                          <VehicleStatusBadge status={v.status} />
                        </button>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
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
            onClick={() => setNotifOpen((v) => !v)}
            className="relative flex size-8 items-center justify-center pressable rounded-md text-text-soft hover:bg-bg-elevated hover:text-text"
            aria-label={t.topbar.notificationsAria}
          >
            <BellIcon className="size-4" />
            {worstSeverity && (
              <span
                className="absolute right-1.5 top-1.5 size-1.5 rounded-full"
                style={{ backgroundColor: worstSeverity === "critical" ? "var(--color-critical)" : "var(--color-delayed)" }}
              />
            )}
          </button>
          {notifOpen && (
            <div className="panel absolute right-0 top-full z-40 mt-2 w-80 rounded-2xl border border-border py-2 shadow-xl">
              <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
                {t.topbar.notificationsTitle}
              </p>
              {alerts.length === 0 ? (
                <p className="px-3 py-4 text-center text-xs text-text-muted">{t.topbar.alertsEmpty}</p>
              ) : (
                <div className="flex flex-col">
                  {alerts.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => {
                        setNotifOpen(false);
                        router.push(a.href);
                      }}
                      className="flex items-start gap-2.5 border-t border-border-soft px-3 py-2.5 text-left text-xs leading-relaxed text-text-soft hover:bg-bg-hover hover:text-text"
                    >
                      <span
                        className="mt-1 size-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: a.severity === "critical" ? "var(--color-critical)" : "var(--color-delayed)" }}
                      />
                      {alertText(a, t, lang)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
