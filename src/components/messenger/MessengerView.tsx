"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Avatar from "@/components/shared/Avatar";
import { ChatIcon } from "@/components/shared/icons";
import { DriverStatusBadge } from "@/components/shared/StatusBadge";
import { useLang } from "@/i18n/LangContext";
import type { ChatMessage, Driver } from "@/lib/types";

function MessengerInner() {
  const { t, lang, locale } = useLang();
  const searchParams = useSearchParams();
  const [drivers, setDrivers] = useState<Driver[] | null>(null);
  const [activeId, setActiveId] = useState<string | null>(searchParams.get("driver"));
  const [thread, setThread] = useState<ChatMessage[] | null>(null);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/drivers")
      .then((res) => res.json())
      .then((data: { drivers: Driver[] }) => {
        setDrivers(data.drivers);
        setActiveId((prev) => prev ?? data.drivers[0]?.id ?? null);
      })
      .catch(() => setDrivers([]));
  }, []);

  useEffect(() => {
    if (!activeId) return;
    let cancelled = false;
    fetch(`/api/messages?driverId=${activeId}`)
      .then((res) => res.json())
      .then((data: { messages: ChatMessage[] }) => {
        if (!cancelled) setThread(data.messages);
      })
      .catch(() => {
        if (!cancelled) setThread([]);
      });
    return () => {
      cancelled = true;
    };
  }, [activeId]);

  async function handleSend() {
    if (!draft.trim() || !activeId) return;
    setSending(true);
    setNotice(null);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ driverId: activeId, text: draft, lang }),
      });
      const data = await res.json();
      if (!res.ok) setNotice(data.error ?? t.common.readOnlyNotice);
    } catch {
      setNotice(t.common.readOnlyNotice);
    } finally {
      setSending(false);
    }
  }

  const activeDriver = drivers?.find((d) => d.id === activeId) ?? null;

  return (
    <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-[16rem_1fr]">
      <div className="panel flex flex-col overflow-hidden rounded-2xl border border-border">
        <p className="border-b border-border px-4 py-3 text-xs font-medium uppercase tracking-wide text-text-muted">
          {t.messengerPage.conversationsTitle}
        </p>
        <div className="flex-1 overflow-y-auto">
          {!drivers ? (
            <div className="flex flex-col gap-2 p-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-12 animate-pulse rounded-lg bg-bg-elevated" />
              ))}
            </div>
          ) : (
            drivers.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setActiveId(d.id)}
                className={`flex w-full items-center gap-2.5 border-b border-border-soft px-4 py-2.5 text-left text-sm ${
                  activeId === d.id ? "bg-accent-soft text-accent" : "text-text-soft hover:bg-bg-hover hover:text-text"
                }`}
              >
                <Avatar src={d.avatar} name={d.name} sizePx={28} className="size-7" />
                <span className="min-w-0 flex-1 truncate">{d.name}</span>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="panel flex flex-col overflow-hidden rounded-2xl border border-border">
        {!activeDriver ? (
          <div className="flex flex-1 items-center justify-center p-8 text-center text-sm text-text-muted">
            {t.messengerPage.selectDriver}
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
              <Avatar src={activeDriver.avatar} name={activeDriver.name} sizePx={28} className="size-7" />
              <p className="text-sm font-medium text-text">{activeDriver.name}</p>
              <span className="ml-2">
                <DriverStatusBadge status={activeDriver.status} />
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {!thread ? (
                <div className="flex flex-col gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-10 w-2/3 animate-pulse rounded-lg bg-bg-elevated" />
                  ))}
                </div>
              ) : thread.length === 0 ? (
                <p className="py-6 text-center text-sm text-text-muted">{t.messengerPage.emptyThread}</p>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {thread.map((m) => (
                    <div
                      key={m.id}
                      className={`max-w-[75%] rounded-lg px-3.5 py-2.5 text-sm ${
                        m.from === "dispatcher"
                          ? "ml-auto bg-accent-soft text-text"
                          : "bg-bg-elevated text-text"
                      }`}
                    >
                      <p>{m.text}</p>
                      <p className="mt-1 text-[10px] text-text-muted">
                        {new Date(m.sentAt).toLocaleString(locale, {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {notice && (
              <p className="mx-4 mb-2 rounded-lg border border-delayed/30 bg-delayed/10 px-3.5 py-2 text-xs text-delayed">
                {notice}
              </p>
            )}

            <div className="flex items-center gap-2 border-t border-border p-3">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder={t.messengerPage.inputPlaceholder}
                className="min-w-0 flex-1 rounded-lg border border-border-soft bg-bg-panel px-3.5 py-2.5 text-sm text-text outline-none placeholder:text-text-muted focus:border-accent/40"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={sending || !draft.trim()}
                className="pressable flex items-center gap-1.5 rounded-lg bg-accent-soft px-3.5 py-2.5 text-sm font-medium text-accent disabled:opacity-50"
              >
                <ChatIcon className="size-4" />
                {t.messengerPage.send}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function MessengerView() {
  return (
    <Suspense fallback={null}>
      <MessengerInner />
    </Suspense>
  );
}
