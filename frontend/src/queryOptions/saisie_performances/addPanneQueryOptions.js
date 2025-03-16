import { queryOptions, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../utils/apiRequest";
import { API_PATHS } from "../../utils/apiPaths";

import { toast as t } from "react-toastify";

export default function addPanneQueryOptions(handleClosePanneModal) {
    const queryClient = useQueryClient();
    return queryOptions({
        mutationFn: addPanne,
        onSuccess: () => {
            // setUser({ name: "", email: "", password: "" });
            handleClosePanneModal();
            // toast.success("Ajouté avec succès.");
            t.success("Panne Ajouté avec succès.");
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["saisieRjeList"] });
        }
    })
}

const addPanne = async (data) => {
    return await apiRequest(API_PATHS.SAISIE_RJE.ADD_SAISIE_RJE_PANNE_HIM, "POST", data);
};
