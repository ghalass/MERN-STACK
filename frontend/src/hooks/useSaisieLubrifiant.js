// hooks/useSaisieLubrifiant.js
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { createSaisieLubrifiant, deleteSaisieLubrifiant } from '../api/saisieLubrifiantApi';

export const useCreateSaisieLubrifiant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createSaisieLubrifiant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["saisieRjeList"] });
        }
    });
};

export const useDeleteSaisieLubrifiant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteSaisieLubrifiant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["saisieRjeList"] });
        }
    });
};