import { queryOptions } from "@tanstack/react-query";
import { apiRequest } from "../../utils/apiRequest";
import { API_PATHS } from "../../utils/apiPaths";

export default function fecthParcsQueryOptions() {
    return queryOptions({
        queryKey: ["parcsList"],
        queryFn: getAll,
    })
}

const getAll = async () => {
    return await apiRequest(API_PATHS.PARCS.GET_ALL_PARCS, "GET");
};
