import { queryOptions, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../utils/apiRequest";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";

export default function deleteUserQueryOptions(setShowDelete) {
    const queryClient = useQueryClient();
    return queryOptions({
        mutationFn: deleteUser,
        onSuccess: () => {
            setShowDelete(false);
            toast.success("Supprimé avec succès.");
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["usersList"] });
        },
    })
}

const deleteUser = async (userId) => {
    return await apiRequest(`/user/${userId}`, "DELETE");
};
