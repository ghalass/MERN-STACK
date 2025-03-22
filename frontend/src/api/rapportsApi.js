// api/rapportsApi.js
import { API_PATHS } from '../utils/apiPaths';
import { apiRequest } from '../utils/apiRequest';

export const getRapportRje = async (du) => {
    return await apiRequest(API_PATHS.RAPPORTS.GENERATE_RJE, "POST", { du });
};

export const getRapportUnitePhysique = async (du) => {
    return await apiRequest(API_PATHS.RAPPORTS.GENERATE_UNITE_PHYSIQUE, "POST", { du });
};

export const getRapportEtatMensuel = async (du) => {
    return await apiRequest(API_PATHS.RAPPORTS.GENERATE_ETAT_MENSUEL, "POST", { du });
};

export const getRapportIndispo = async (du) => {
    return await apiRequest(API_PATHS.RAPPORTS.GENERATE_RAPPORT_INDISPO, "POST", { du });
};



