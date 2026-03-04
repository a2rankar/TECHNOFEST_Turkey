//servoces/zone.service.ts
import { api } from "./api";
import { Zone } from "../types/zone.types";

export const getZones = async(): Promise<Zone[]> => {
    const {data} = await api.get('/zones');
    return data;
}
export const irrigateZone = async (id: number) => {
    return await api.post(`/zones/${id}/irrigate`);
};
