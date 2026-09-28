import { notFound } from "next/navigation";
import DriverDetail from "@/components/drivers/DriverDetail";
import { getDriverById } from "@/lib/drivers";
import { getShipments, getVehicles } from "@/lib/store";

export default async function DriverPage({ params }: PageProps<"/drivers/[id]">) {
  const { id } = await params;
  const driver = getDriverById(id);
  if (!driver) notFound();

  const history = getShipments().filter((s) => s.driverId === id);
  const vehicle = getVehicles().find((v) => v.driverId === id) ?? null;

  return <DriverDetail driver={driver} history={history} vehicle={vehicle} />;
}
