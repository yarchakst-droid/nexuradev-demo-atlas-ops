"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CalendarIcon,
  ChartBarIcon,
  ChatIcon,
  GaugeIcon,
  LogoMark,
  LogoutIcon,
  RadarIcon,
  TruckIcon,
  UsersIcon,
  WalletIcon,
  XIcon,
} from "@/components/shared/icons";
import { useLang } from "@/i18n/LangContext";
import { useSidebar } from "@/lib/sidebar-context";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLang();
  const { isOpen, close } = useSidebar();
  const [loggingOut, setLoggingOut] = useState(false);

  // Close the mobile drawer whenever the route changes (link taps should
  // dismiss the overlay instead of leaving it open behind the new page).
  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock background scroll while the mobile drawer is open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    router.push("/login");
    router.refresh();
  }

  const groups = [
    {
      label: t.sidebar.overview,
      links: [{ href: "/", label: t.sidebar.dashboard, icon: GaugeIcon, match: (p: string) => p === "/" }],
    },
    {
      label: t.sidebar.operations,
      links: [
        { href: "/drivers", label: t.sidebar.drivers, icon: UsersIcon, match: (p: string) => p.startsWith("/drivers") },
        { href: "/fleet", label: t.sidebar.fleet, icon: TruckIcon, match: (p: string) => p.startsWith("/fleet") },
        {
          href: "/scheduled",
          label: t.sidebar.scheduled,
          icon: CalendarIcon,
          match: (p: string) => p.startsWith("/scheduled"),
        },
        { href: "/tracker", label: t.sidebar.tracker, icon: RadarIcon, match: (p: string) => p.startsWith("/tracker") },
        {
          href: "/messenger",
          label: t.sidebar.messenger,
          icon: ChatIcon,
          match: (p: string) => p.startsWith("/messenger"),
        },
      ],
    },
    {
      label: t.sidebar.finance,
      links: [
        { href: "/billing", label: t.sidebar.billing, icon: WalletIcon, match: (p: string) => p.startsWith("/billing") },
        { href: "/reports", label: t.sidebar.reports, icon: ChartBarIcon, match: (p: string) => p.startsWith("/reports") },
      ],
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[1px] lg:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-64 max-w-[85vw] shrink-0 flex-col border-r border-border bg-bg-panel transition-transform duration-300 ease-panel lg:static lg:z-auto lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
      <div className="flex items-center gap-3 border-b border-border px-5 py-5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent ring-1 ring-inset ring-accent/20">
          <LogoMark className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold tracking-tight text-text">{t.sidebar.dispatch}</p>
          <p className="text-[11px] text-text-muted">{t.sidebar.dispatcherRole}</p>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label={t.sidebar.closeMenu}
          className="flex size-9 shrink-0 items-center justify-center pressable rounded-md text-text-muted hover:bg-bg-hover hover:text-text lg:hidden"
        >
          <XIcon className="size-4.5" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-4 overflow-y-auto px-3 py-4">
        {groups.map((group) => (
          <div key={group.label} className="flex flex-col gap-0.5">
            <p className="px-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              {group.label}
            </p>
            {group.links.map(({ href, label, icon: Icon, match }) => {
              const active = match(pathname);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`pressable group relative flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm ${
                    active ? "bg-accent-soft text-accent" : "text-text-soft hover:bg-bg-hover hover:text-text"
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-accent" />
                  )}
                  <Icon className={`size-4 ${active ? "" : "text-text-muted group-hover:text-text-soft"}`} />
                  {label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-2.5 border-t border-border px-4 py-4">
        <span className="relative block size-8 shrink-0 overflow-hidden rounded-full ring-2 ring-on-time/30">
          <Image
            src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=64&h=64&q=80"
            alt={t.sidebar.dispatcherAvatarAlt}
            fill
            sizes="32px"
            className="object-cover"
          />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-text">{t.sidebar.dispatcherName}</p>
          <p className="flex items-center gap-1.5 text-[11px] text-text-muted">
            <span className="pulse-dot size-1.5 rounded-full bg-on-time" />
            {t.sidebar.online}
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          aria-label={t.sidebar.logout}
          className="pressable flex size-8 shrink-0 items-center justify-center rounded-md text-text-muted hover:bg-bg-hover hover:text-text disabled:opacity-50"
        >
          <LogoutIcon className="size-4" />
        </button>
      </div>

      <p className="flex items-center justify-center gap-1.5 border-t border-border px-4 py-3 text-center text-[10px] leading-relaxed text-text-muted">
        <span className="size-1.5 rounded-full bg-delayed" />
        {t.sidebar.demoNotice}
      </p>
      </aside>
    </>
  );
}
