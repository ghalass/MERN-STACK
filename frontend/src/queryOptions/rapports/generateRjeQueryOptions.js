import { queryOptions } from "@tanstack/react-query";
import { apiRequest } from "../../utils/apiRequest";
import { API_PATHS } from "../../utils/apiPaths";

export default function generateRjeQueryOptions(du) {
    return queryOptions({
        queryKey: ["rapportRjeList"],
        queryFn: () => getAll(du),
        enabled: false, // 🔥 Désactive la requête automatique
    })
}

const getAll = async (du) => {
    return await apiRequest(API_PATHS.RAPPORTS.GENERATE_RJE, "POST", { du });
};
