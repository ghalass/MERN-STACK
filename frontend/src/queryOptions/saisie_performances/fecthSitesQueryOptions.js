import { queryOptions } from "@tanstack/react-query";
import { apiRequest } from "../../utils/apiRequest";
import { API_PATHS } from "../../utils/apiPaths";

export default function fectSitesQueryOptions() {
    return queryOptions({
        queryKey: ["sitesList"],
        queryFn: getAll,
    })
}

const getAll = async () => {
    return await apiRequest(API_PATHS.SITES.GET_ALL_SITES, "GET");
};
