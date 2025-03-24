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

export const getRapportHeuresChassis = async (du) => {
    return await apiRequest(API_PATHS.RAPPORTS.GENERATE_RAPPORT_HEURES_CHASSIS, "POST", { du });
};

export const getRapportSpecLub = async (typelubrifiantId, year) => {
    return await apiRequest(API_PATHS.RAPPORTS.GENERATE_RAPPORT_SPEC_LUB, "POST", { typelubrifiantId, year });
};

export const getParetoIndispParc = async (parcId, date) => {
    return await apiRequest(API_PATHS.RAPPORTS.GENERATE_PARETO_INDISPO_PARC, "POST", { parcId, date });
};

export const getParetoMtbfParc = async (parcId, date) => {
    return await apiRequest(API_PATHS.RAPPORTS.GENERATE_PARETO_MTBF_PARC, "POST", { parcId, date });
};