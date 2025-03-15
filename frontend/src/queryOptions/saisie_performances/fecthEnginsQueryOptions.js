import { queryOptions } from "@tanstack/react-query";
import { apiRequest } from "../../utils/apiRequest";
import { API_PATHS } from "../../utils/apiPaths";

export default function fectEnginsQueryOptions(parcId, siteId) {
    return queryOptions({
        queryKey: ["enginsList", parcId, siteId],
        queryFn: () => getAll(parcId, siteId), // ✅ Fix 1: Pass function reference
        enabled: !!(parcId !== "" && siteId !== "") // ✅ Fix 2: Ensure boolean
    })
}

const getAll = async (parcId, siteId) => {
    return await apiRequest(API_PATHS.ENGINS.GET_ALL_ENGINS_BY_PARCID_SITEID(parcId, siteId), "GET");
};
