// hooks/useSaisieRje.js
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { createSaisieHrm, deleteSaisiePanne, updateSaisiePanne } from '../api/saisieRjeApi';
import { toast } from 'react-toastify';

export const useCreateSaisieHrm = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createSaisieHrm,
        onSuccess: () => {
            queryClient.invalidateQueries(['saisieRjeList']);
        }
    });
};

export const useDeleteSaisiePanne = () => {
    const queryClient = useQueryClient();
    return queryOptions({
        mutationFn: deleteSaisiePanne,
        onSuccess: () => {
            toast.success("Supprimé avec succès.");
            queryClient.invalidateQueries(['saisieRjeList']);
        },
    })
}

export const useUpdateSaisiePanne = (handleCloseEditPanneModal) => {
    const queryClient = useQueryClient();
    return queryOptions({
        mutationFn: updateSaisiePanne,
        onSuccess: () => {
            handleCloseEditPanneModal();
            toast.success("Modifié avec succès.");
            queryClient.invalidateQueries(['saisieRjeList']);
        }
    });
}
