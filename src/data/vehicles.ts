import type { Vehicle } from "@/lib/types";

export const vehicles: Vehicle[] = [
  { id: "v1", model: "MAN TGX 18.440", plate: "КА 3312 ВК", type: "truck", capacityKg: 18000, odometerKm: 214300, fuelPercent: 62, nextServiceKm: 4700, status: "in-service", driverId: "d1" },
  { id: "v2", model: "Mercedes Sprinter 519", plate: "АІ 5521 ОВ", type: "van", capacityKg: 1500, odometerKm: 96200, fuelPercent: 48, nextServiceKm: 2100, status: "in-service", driverId: "d2" },
  { id: "v3", model: "Volvo FH 460", plate: "ВС 7788 РМ", type: "truck", capacityKg: 20000, odometerKm: 341800, fuelPercent: 71, nextServiceKm: 8200, status: "in-service", driverId: "d3" },
  { id: "v4", model: "Ford Transit Custom", plate: "ВН 1204 ТХ", type: "van", capacityKg: 1200, odometerKm: 58400, fuelPercent: 35, nextServiceKm: 900, status: "in-service", driverId: "d4" },
  { id: "v5", model: "Scania R450", plate: "ЛВ 2210 ЩЯ", type: "truck", capacityKg: 19000, odometerKm: 402100, fuelPercent: 84, nextServiceKm: 12400, status: "available", driverId: "d5" },
  { id: "v6", model: "Iveco Daily 70C", plate: "КИ 9901 ЛЕ", type: "van", capacityKg: 3500, odometerKm: 187600, fuelPercent: 55, nextServiceKm: 3300, status: "in-service", driverId: "d6" },
  { id: "v7", model: "Renault Master", plate: "ОД 4456 ЖТ", type: "van", capacityKg: 1400, odometerKm: 72900, fuelPercent: 40, nextServiceKm: 1600, status: "in-service", driverId: "d7" },
  { id: "v8", model: "MAN TGX 18.500", plate: "ДП 6630 НМ", type: "truck", capacityKg: 18500, odometerKm: 265700, fuelPercent: 67, nextServiceKm: 5900, status: "in-service", driverId: "d8" },
  { id: "v9", model: "Volvo FH 500", plate: "ЖТ 3345 РВ", type: "truck", capacityKg: 20000, odometerKm: 318900, fuelPercent: 58, nextServiceKm: 7100, status: "in-service", driverId: "d9" },
  { id: "v10", model: "Mercedes Sprinter 519", plate: "ЧВ 8802 ІФ", type: "van", capacityKg: 1500, odometerKm: 41300, fuelPercent: 91, nextServiceKm: 6700, status: "available", driverId: "d10" },
  { id: "v11", model: "Ford Transit Custom", plate: "ЛВ 5567 УЖ", type: "van", capacityKg: 1200, odometerKm: 22800, fuelPercent: 76, nextServiceKm: 9200, status: "available", driverId: "d11" },
  { id: "v12", model: "MAN TGX 18.440", plate: "ІФ 2201 СХ", type: "truck", capacityKg: 18000, odometerKm: 389400, fuelPercent: 12, nextServiceKm: 150, status: "maintenance", driverId: null },
  { id: "v13", model: "Renault Master", plate: "ЛЦ 4470 ГД", type: "van", capacityKg: 1400, odometerKm: 15100, fuelPercent: 88, nextServiceKm: 10800, status: "available", driverId: null },
];
