import { queryOptions, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../utils/apiRequest";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-toastify";

export default function deleteUserQueryOptions(handleClose) {
    const queryClient = useQueryClient();
    return queryOptions({
        mutationFn: deleteUser,
        onSuccess: () => {
            handleClose();
            toast.success("Supprimé avec succès.");
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["usersList"] });
        },
    })
}

const deleteUser = async (userId) => {
    return await apiRequest(API_PATHS.AUTH.DELETE_USER(userId), "DELETE");
};
