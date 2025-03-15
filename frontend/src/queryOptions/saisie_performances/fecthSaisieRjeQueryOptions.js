import { queryOptions } from "@tanstack/react-query";
import { apiRequest } from "../../utils/apiRequest";
import { API_PATHS } from "../../utils/apiPaths";

export default function fecthSaisieRjeQueryOptions(date, enginId) {
    return queryOptions({
        queryKey: ["saisieRjeList", date, enginId],
        queryFn: () => getAll(date, enginId), // ✅ Fix 1: Pass function reference
        enabled: !!(date !== "" && enginId !== "") // ✅ Fix 2: Ensure boolean
    })
}

const getAll = async (date, enginId) => {
    return await apiRequest(API_PATHS.SAISIE_RJE.GET_SAISIE_RJE, "POST", { du: date, enginId },);
};
