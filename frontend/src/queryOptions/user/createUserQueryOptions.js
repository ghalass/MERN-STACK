import { queryOptions, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../utils/apiRequest";
import { API_PATHS } from "../../utils/apiPaths";

import { toast as t } from "react-toastify";

export default function createUserQueryOptions(setUser, handleClose) {
    const queryClient = useQueryClient();
    return queryOptions({
        mutationFn: createUser,
        onSuccess: () => {
            setUser({ name: "", email: "", password: "" });
            handleClose();
            // toast.success("Ajouté avec succès.");
            t.success("Ajouté avec succès.");
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["usersList"] });
        },
    })
}

const createUser = async (data) => {
    return await apiRequest(API_PATHS.AUTH.REGISTER, "POST", data);
};
