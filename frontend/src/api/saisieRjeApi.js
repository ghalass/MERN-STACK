// api/siteApi.js
import { API_PATHS } from '../utils/apiPaths';
import { apiRequest } from '../utils/apiRequest';

// export const fetchSites = async () => {
//     return apiRequest(API_PATHS.SITES.GET_ALL_SITES, "GET");
// };

export const createSaisieHrm = async (saisiehrm) => {
    return apiRequest(API_PATHS.SAISIE_RJE.ADD_SAISIE_RJE_HRM, "POST", saisiehrm);
};

// export const updateSite = async (updatedSite) => {
//     return apiRequest(API_PATHS.SITES.UPDATE_SITE(updatedSite.id), "PATCH", updatedSite);
// };

export const deleteSaisiePanne = async (data) => {
    return await apiRequest(API_PATHS.SAISIE_RJE.DELETE_SAISIE_RJE_PANNE_HIM, "DELETE", data);
};

export const updateSaisiePanne = async (data) => {
    return await apiRequest(API_PATHS.SAISIE_RJE.UPDATE_SAISIE_RJE_PANNE_HIM, "PATCH", data);
};