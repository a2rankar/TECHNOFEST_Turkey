import { useQuery } from "@tanstack/react-query";
import { getZones } from "../services/zone.service";

export const useZone = () => {
    return useQuery({
        queryKey: ['zones'],
        queryFn: getZones
    });
};