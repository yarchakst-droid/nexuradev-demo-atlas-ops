"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LangContext";
import type { BillingSummary } from "@/lib/billing";
import type { Invoice, InvoiceStatus } from "@/lib/types";

const STATUS_COLOR: Record<InvoiceStatus, string> = {
  paid: "var(--color-on-time)",
  pending: "var(--color-delayed)",
  overdue: "var(--color-critical)",
};

export default function BillingView() {
  const { t, lang, locale } = useLang();
  const [invoices, setInvoices] = useState<Invoice[] | null>(null);
  const [summary, setSummary] = useState<BillingSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [payingId, setPayingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/billing")
      .then((res) => {
        if (!res.ok) throw new Error(t.billingPage.loadError);
        return res.json();
      })
      .then((data: { invoices: Invoice[]; summary: BillingSummary }) => {
        if (cancelled) return;
        setInvoices(data.invoices);
        setSummary(data.summary);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleMarkPaid(shipmentId: string) {
    setPayingId(shipmentId);
    setNotice(null);
    try {
      const res = await fetch(`/api/billing/${shipmentId}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang }),
      });
      const data = await res.json();
      if (!res.ok) setNotice(data.error ?? t.common.readOnlyNotice);
    } catch {
      setNotice(t.common.readOnlyNotice);
    } finally {
      setPayingId(null);
    }
  }

  const currency = (n: number) => `${n.toLocaleString(locale)} ${t.dashboardPage.currencyUnit}`;

  if (error) {
    return (
      <p className="rounded-2xl border border-critical/30 bg-critical/5 px-4 py-3 text-sm text-critical">{error}</p>
    );
  }

  if (!invoices || !summary) {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl border border-border bg-bg-panel" />
          ))}
        </div>
        <div className="h-96 animate-pulse rounded-2xl border border-border bg-bg-panel" />
      </div>
    );
  }

  const statusLabel: Record<InvoiceStatus, string> = {
    paid: t.billingPage.statusPaid,
    pending: t.billingPage.statusPending,
    overdue: t.billingPage.statusOverdue,
  };

  return (
    <div className="flex flex-col gap-4">
      {notice && (
        <p className="rounded-lg border border-delayed/30 bg-delayed/10 px-4 py-2.5 text-xs text-delayed">{notice}</p>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(
          [
            { label: t.billingPage.totalRevenue, value: summary.totalRevenue, color: "var(--color-text)" },
            { label: t.billingPage.paidAmount, value: summary.paid, color: "var(--color-on-time)" },
            { label: t.billingPage.pendingAmount, value: summary.pending, color: "var(--color-delayed)" },
            { label: t.billingPage.overdueAmount, value: summary.overdue, color: "var(--color-critical)" },
          ] as const
        ).map((tile) => (
          <div key={tile.label} className="panel rounded-2xl border border-border px-4 py-4">
            <p className="font-mono text-lg font-medium tabular-nums" style={{ color: tile.color }}>
              {currency(tile.value)}
            </p>
            <p className="mt-1.5 text-xs text-text-soft">{tile.label}</p>
          </div>
        ))}
      </div>

      <div className="panel overflow-hidden rounded-2xl border border-border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-elevated/60 text-left text-[11px] uppercase tracking-wider text-text-muted">
                <th className="px-4 py-3 font-medium">{t.billingPage.tableClient}</th>
                <th className="px-4 py-3 font-medium">{t.billingPage.tableShipment}</th>
                <th className="px-4 py-3 font-medium">{t.billingPage.tableAmount}</th>
                <th className="px-4 py-3 font-medium">{t.billingPage.tableStatus}</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.shipmentId} className="border-b border-border-soft last:border-0 hover:bg-bg-hover">
                  <td className="px-4 py-3 text-text">{inv.client}</td>
                  <td className="px-4 py-3">
                    <Link href={`/shipments/${inv.shipmentId}`} className="font-mono text-xs text-text-soft hover:text-accent">
                      {inv.code}
                    </Link>
                    <p className="text-xs text-text-muted">{inv.destination[lang]}</p>
                  </td>
                  <td className="px-4 py-3 font-mono text-text-soft">{currency(inv.amount)}</td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
                      style={{
                        color: STATUS_COLOR[inv.status],
                        backgroundColor: `color-mix(in srgb, ${STATUS_COLOR[inv.status]} 14%, transparent)`,
                      }}
                    >
                      <span className="size-1.5 rounded-full" style={{ backgroundColor: STATUS_COLOR[inv.status] }} />
                      {statusLabel[inv.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {inv.status !== "paid" && (
                      <button
                        type="button"
                        disabled={payingId === inv.shipmentId}
                        onClick={() => handleMarkPaid(inv.shipmentId)}
                        className="pressable rounded-md border border-border-soft px-2.5 py-1.5 text-xs text-text-soft hover:border-accent/30 hover:text-accent disabled:opacity-50"
                      >
                        {payingId === inv.shipmentId ? t.billingPage.markingPaid : t.billingPage.markPaid}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
