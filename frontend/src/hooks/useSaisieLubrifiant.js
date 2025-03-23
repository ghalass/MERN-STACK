// hooks/useSites.js
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { createSaisieLubrifiant } from '../api/saisieLubrifiantApi';

// export const fecthSitesQuery = () => {
//     return queryOptions({
//         queryKey: ["sitesList"], // Clé de requête
//         queryFn: fetchSites
//     });
// };

export const useCreateSaisieLubrifiant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createSaisieLubrifiant,
        onSuccess: () => {
            queryClient.invalidateQueries(['saisieRjeList']); // Rafraîchir la liste des sites
        }
    });
};

// export const useUpdateSite = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: updateSite,
//         onSuccess: () => {
//             queryClient.invalidateQueries(['sitesList']);
//         }
//     });
// }

// export const useDeleteSite = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: deleteSite,
//         onSuccess: () => {
//             queryClient.invalidateQueries(['sitesList']);
//         }
//     });
// };