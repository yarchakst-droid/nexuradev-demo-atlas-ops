import { NextResponse } from "next/server";
import { computeInvoices, summarizeInvoices } from "@/lib/billing";
import { getPaidInvoiceIds, getShipments } from "@/lib/store";

export async function GET() {
  const invoices = computeInvoices(getShipments(), getPaidInvoiceIds());
  const summary = summarizeInvoices(invoices);
  return NextResponse.json({ invoices, summary });
}
