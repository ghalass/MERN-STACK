// api/rapportsApi.js
import { API_PATHS } from '../utils/apiPaths';
import { apiRequest } from '../utils/apiRequest';

export const getRapportRje = async (du) => {
    return await apiRequest(API_PATHS.RAPPORTS.GENERATE_RJE, "POST", { du });
};

export const getRapportUnitePhysique = async (du) => {
    return await apiRequest(API_PATHS.RAPPORTS.GENERATE_UNITE_PHYSIQUE, "POST", { du });
};
