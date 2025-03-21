import { queryOptions } from "@tanstack/react-query";
import { apiRequest } from "../../utils/apiRequest";
import { API_PATHS } from "../../utils/apiPaths";

export default function fecthUsersQueryOptions() {
    return queryOptions({
        queryKey: ["usersList"],
        queryFn: getAllUsers,
    })
}

const getAllUsers = async () => {
    return await apiRequest(API_PATHS.AUTH.GET_ALL_USERS, "GET");
};
