import { drivers } from "@/data/drivers";
import type { Driver } from "@/lib/types";

export function getAllDrivers(): Driver[] {
  return drivers;
}

export function getDriverById(id: string): Driver | undefined {
  return drivers.find((d) => d.id === id);
}
