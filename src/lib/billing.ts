import type { Invoice, Shipment } from "@/lib/types";

const OVERDUE_GRACE_MS = 2 * 3_600_000;

/** Invoices are derived straight from shipment state — delivered bills become
 * payable, and one manually goes overdue if it's been sitting delayed/critical
 * a while — plus whatever the dispatcher has marked paid by hand. */
export function computeInvoices(shipments: Shipment[], paidIds: Set<string>): Invoice[] {
  return shipments.map((s) => {
    const paid = paidIds.has(s.id) || s.status === "delivered";
    const overdue = !paid && (s.status === "critical" || (s.status === "delayed" && s.delayMinutes * 60_000 > OVERDUE_GRACE_MS));

    return {
      shipmentId: s.id,
      code: s.code,
      client: s.client,
      destination: s.destination,
      amount: s.revenue,
      status: paid ? "paid" : overdue ? "overdue" : "pending",
      issuedAt: s.updatedAt,
    };
  });
}

export interface BillingSummary {
  totalRevenue: number;
  paid: number;
  pending: number;
  overdue: number;
}

export function summarizeInvoices(invoices: Invoice[]): BillingSummary {
  return invoices.reduce(
    (acc, inv) => {
      acc.totalRevenue += inv.amount;
      if (inv.status === "paid") acc.paid += inv.amount;
      else if (inv.status === "pending") acc.pending += inv.amount;
      else acc.overdue += inv.amount;
      return acc;
    },
    { totalRevenue: 0, paid: 0, pending: 0, overdue: 0 },
  );
}
