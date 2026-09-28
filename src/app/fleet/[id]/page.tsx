import { notFound } from "next/navigation";
import VehicleDetail from "@/components/fleet/VehicleDetail";
import { getAllDrivers } from "@/lib/drivers";
import { getVehicles } from "@/lib/store";

export default async function VehiclePage({ params }: PageProps<"/fleet/[id]">) {
  const { id } = await params;
  const vehicle = getVehicles().find((v) => v.id === id);
  if (!vehicle) notFound();

  const driver = vehicle.driverId ? (getAllDrivers().find((d) => d.id === vehicle.driverId) ?? null) : null;

  return <VehicleDetail vehicle={vehicle} driver={driver} />;
}
