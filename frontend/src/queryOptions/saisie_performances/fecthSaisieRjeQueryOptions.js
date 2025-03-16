import { queryOptions } from "@tanstack/react-query";
import { apiRequest } from "../../utils/apiRequest";
import { API_PATHS } from "../../utils/apiPaths";

export default function fecthSaisieRjeQueryOptions(du, enginId) {
    return queryOptions({
        queryKey: ["saisieRjeList", du, enginId],
        queryFn: () => getAll(du, enginId), // ✅ Fix 1: Pass function reference
        enabled: !!(du !== "" && enginId !== "") // ✅ Fix 2: Ensure boolean
    })
}

const getAll = async (du, enginId) => {
    return await apiRequest(API_PATHS.SAISIE_RJE.GET_SAISIE_RJE, "POST", { du, enginId },);
};
