// api/typepanneApi.js
import { API_PATHS } from '../utils/apiPaths';
import { apiRequest } from '../utils/apiRequest';

export const fetchTypepannes = async () => {
    return apiRequest(API_PATHS.TYPEPANNES.GET_ALL_TYPEPANNES, "GET");
};

export const createTypepanne = async (typepanne) => {
    return apiRequest(API_PATHS.TYPEPANNES.ADD_TYPEPANNE, "POST", typepanne);
};

export const updateTypepanne = async (updatedTypepanne) => {
    return apiRequest(API_PATHS.TYPEPANNES.UPDATE_TYPEPANNE(updatedTypepanne.id), "PUT", updatedTypepanne);
};

export const deleteTypepanne = async (typepanne) => {
    return apiRequest(API_PATHS.TYPEPANNES.DELETE_TYPEPANNE(typepanne.id), "PATCH", typepanne);
};