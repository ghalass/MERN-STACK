import { queryOptions, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../utils/apiRequest";
import { API_PATHS } from "../../utils/apiPaths";

import { toast as t } from "react-toastify";

export default function updateUserQueryOptions(handleClose) {
    const queryClient = useQueryClient();
    return queryOptions({
        mutationFn: updateUser,
        onSuccess: () => {
            handleClose();
            // toast.success("Ajouté avec succès.");
            t.success("Modifié avec succès.");
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["usersList"] });
        },
    })
}

const updateUser = async (data) => {
    return await apiRequest(API_PATHS.AUTH.UPDATE_USER, "PATCH", data);
};
