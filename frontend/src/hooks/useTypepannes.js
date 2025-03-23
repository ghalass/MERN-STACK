// hooks/useTypeparcs.js
import { useQuery, useMutation, useQueryClient, queryOptions } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { fetchTypepannes } from '../api/typepanneApi';

export const useTypepannes = () => {
    return queryOptions({
        queryKey: ['typepannes'], // Clé de requête
        queryFn: fetchTypepannes, // Fonction pour récupérer les typeparcs
    });
};

// export const useCreateTypeparc = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: createTypeparc,
//         onSuccess: () => {
//             queryClient.invalidateQueries(['typeparcs']); // Rafraîchir la liste des typeparcs
//             toast.success('Typeparc ajouté avec succès !'); // Notification de succès
//         },
//         onError: () => {
//             toast.error('Erreur lors de l\'ajout du Typeparc.'); // Notification d'erreur
//         },
//     });
// };

// export const useUpdateTypeparc = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: updateTypeparc,
//         onSuccess: () => {
//             queryClient.invalidateQueries(['typeparcs']);
//             toast.success('Typeparc modifié avec succès !'); // Notification de succès
//         },
//         onError: () => {
//             toast.error('Erreur lors de la modification du Typeparc.'); // Notification d'erreur
//         },
//     });
// }

// export const useDeleteTypeparc = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: deleteTypeparc,
//         onSuccess: () => {
//             queryClient.invalidateQueries(['typeparcs']);
//             toast.success('Typeparc supprimé avec succès !'); // Notification de succès
//         },
//         onError: () => {
//             toast.error('Erreur lors de la suppression du Typeparc.'); // Notification d'erreur
//         },
//     });
// };