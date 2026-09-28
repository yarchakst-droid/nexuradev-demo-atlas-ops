import type { Shipment, Vehicle } from "@/lib/types";

export type OpsAlertKind = "shipment-critical" | "shipment-delayed" | "vehicle-fuel" | "vehicle-service";
export type OpsAlertSeverity = "critical" | "warning";

export interface OpsAlert {
  id: string;
  kind: OpsAlertKind;
  severity: OpsAlertSeverity;
  href: string;
  shipment?: Shipment;
  vehicle?: Vehicle;
}

const LOW_FUEL_PERCENT = 20;
const CRITICAL_FUEL_PERCENT = 10;
const SERVICE_DUE_KM = 500;

const SEVERITY_RANK: Record<OpsAlertSeverity, number> = { critical: 0, warning: 1 };

/** Derives live dispatcher alerts straight from current shipment/fleet state — nothing here is canned copy. */
export function computeAlerts(shipments: Shipment[], vehicles: Vehicle[]): OpsAlert[] {
  const alerts: OpsAlert[] = [];

  for (const s of shipments) {
    if (s.status === "critical") {
      alerts.push({ id: `sc-${s.id}`, kind: "shipment-critical", severity: "critical", href: `/shipments/${s.id}`, shipment: s });
    } else if (s.status === "delayed") {
      alerts.push({ id: `sd-${s.id}`, kind: "shipment-delayed", severity: "warning", href: `/shipments/${s.id}`, shipment: s });
    }
  }

  for (const v of vehicles) {
    if (v.fuelPercent <= LOW_FUEL_PERCENT) {
      alerts.push({
        id: `vf-${v.id}`,
        kind: "vehicle-fuel",
        severity: v.fuelPercent <= CRITICAL_FUEL_PERCENT ? "critical" : "warning",
        href: `/fleet/${v.id}`,
        vehicle: v,
      });
    }
    if (v.nextServiceKm <= SERVICE_DUE_KM) {
      alerts.push({ id: `vs-${v.id}`, kind: "vehicle-service", severity: "warning", href: `/fleet/${v.id}`, vehicle: v });
    }
  }

  return alerts.sort((a, b) => SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity]).slice(0, 8);
}
