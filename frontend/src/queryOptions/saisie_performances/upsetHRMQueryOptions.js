import { queryOptions, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../utils/apiRequest";
import { API_PATHS } from "../../utils/apiPaths";

import { toast as t } from "react-toastify";

export default function upsetHRMQueryOptions(handleCloseHRMModal) {
    const queryClient = useQueryClient();
    return queryOptions({
        mutationFn: upsetHrm,
        onSuccess: () => {
            handleCloseHRMModal();
            // toast.success("Ajouté avec succès.");
            t.success("HRM Ajouté avec succès.");
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["saisieRjeList"] });
        },
    })
}

const upsetHrm = async (upsetHRM) => {
    if (upsetHRM?.id === "") {
        return await apiRequest(API_PATHS.SAISIE_RJE.ADD_SAISIE_RJE_HRM, "POST", upsetHRM);
    } else {
        return await apiRequest(API_PATHS.SAISIE_RJE.UPDATE_SAISIE_RJE_HRM, "PATCH", upsetHRM);
    }
};
