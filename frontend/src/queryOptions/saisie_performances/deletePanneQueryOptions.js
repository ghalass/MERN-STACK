import { queryOptions, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../utils/apiRequest";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-toastify";

export default function deletePanneQueryOptions(deletePanneQueryOptions) {
    const queryClient = useQueryClient();
    return queryOptions({
        mutationFn: deletePanne,
        onSuccess: () => {
            deletePanneQueryOptions();
            toast.success("Supprimé avec succès.");
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["saisieRjeList"] });
        },
    })
}

const deletePanne = async (data) => {
    return await apiRequest(API_PATHS.SAISIE_RJE.DELETE_SAISIE_RJE_PANNE_HIM, "DELETE", data);
};
