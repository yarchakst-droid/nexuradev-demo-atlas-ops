import { getDriver, getDrivers } from "@/lib/store";
import type { Driver } from "@/lib/types";

export function getAllDrivers(): Driver[] {
  return getDrivers();
}

export function getDriverById(id: string): Driver | undefined {
  return getDriver(id);
}
