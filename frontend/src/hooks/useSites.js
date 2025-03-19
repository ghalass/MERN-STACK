// hooks/useSites.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchSites, createSite, updateSite, deleteSite } from '../api/siteApi';
import { toast } from 'react-toastify';

export const useSites = () => {
    return useQuery({
        queryKey: ['sites'], // Clé de requête
        queryFn: fetchSites, // Fonction pour récupérer les sites
        staleTime: 1000 * 60 * 5, // Temps de cache (5 minutes)
    });
};

export const useCreateSite = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createSite,
        onSuccess: () => {
            queryClient.invalidateQueries(['sites']); // Rafraîchir la liste des sites
            toast.success('Site ajouté avec succès !'); // Notification de succès
        },
        onError: () => {
            toast.error('Erreur lors de l\'ajout du site.'); // Notification d'erreur
        },
    });
};

export const useUpdateSite = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateSite,
        onSuccess: () => {
            queryClient.invalidateQueries(['sites']);
            toast.success('Site modifié avec succès !'); // Notification de succès
        },
        onError: () => {
            toast.error('Erreur lors de la modification du site.'); // Notification d'erreur
        },
    });
}

export const useDeleteSite = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteSite,
        onSuccess: () => {
            queryClient.invalidateQueries(['sites']);
            toast.success('Site supprimé avec succès !'); // Notification de succès
        },
        onError: () => {
            toast.error('Erreur lors de la suppression du site.'); // Notification d'erreur
        },
    });
};