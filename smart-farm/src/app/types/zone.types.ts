//types/ZoneCard.types.ts
export type ZoneStatus = "normal" | "warning" | "critical";

export interface Zone {
  id: number;
  name: string;
  soil_moisture: number;
  temperature: number;
  humidity: number;
  status: ZoneStatus;
}
