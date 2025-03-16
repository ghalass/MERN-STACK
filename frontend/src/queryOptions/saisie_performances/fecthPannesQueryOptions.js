import { queryOptions } from "@tanstack/react-query";
import { apiRequest } from "../../utils/apiRequest";
import { API_PATHS } from "../../utils/apiPaths";

export default function fecthPannesQueryOptions(parcId) {
    return queryOptions({
        queryKey: ["pannesList", parcId],
        queryFn: () => getAll(parcId), // ✅ Fix 1: Pass function reference
        enabled: !!(parcId !== "") // ✅ Fix 2: Ensure boolean
    })
}

const getAll = async (parcId) => {
    return await apiRequest(API_PATHS.PANNES.GET_ALL_PANNES, "GET");
    // return await apiRequest(API_PATHS.PANNES.GET_ALL_PANNES_BY_PARCID(parcId), "GET");
};
