import { notFound } from "next/navigation";
import ShipmentDetail from "@/components/route/ShipmentDetail";
import { getDriverById } from "@/lib/drivers";
import { getShipment } from "@/lib/store";

export default async function ShipmentPage({ params }: PageProps<"/shipments/[id]">) {
  const { id } = await params;
  const shipment = getShipment(id);
  if (!shipment) notFound();

  const driver = getDriverById(shipment.driverId);
  if (!driver) notFound();

  return <ShipmentDetail shipment={shipment} driver={driver} />;
}
