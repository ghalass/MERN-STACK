// hooks/useSites.js
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { createLubrifiant, deleteLubrifiant, fetchLubrifiants, updateLubrifiant } from '../api/lubrifiantApi';

export const fecthLubrifiantsQuery = () => {
    return queryOptions({
        queryKey: ["lubrifiantList"], // Clé de requête
        queryFn: fetchLubrifiants
    });
};

export const useCreateLubrifiant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createLubrifiant,
        onSuccess: () => {
            queryClient.invalidateQueries(['lubrifiantList']); // Rafraîchir la liste des lubrifiant
        }
    });
};

export const useUpdateLubrifiant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateLubrifiant,
        onSuccess: () => {
            queryClient.invalidateQueries(['lubrifiantList']);
        }
    });
}

export const useDeleteLubrifiant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteLubrifiant,
        onSuccess: () => {
            queryClient.invalidateQueries(['lubrifiantList']);
        }
    });
};