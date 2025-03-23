// api/lubrifiantApi.js
import { API_PATHS } from '../utils/apiPaths';
import { apiRequest } from '../utils/apiRequest';

export const fetchLubrifiants = async () => {
    return apiRequest(API_PATHS.LUBRIFIANTS.GET_ALL_LUBRIFIANTS, "GET");
};

export const createLubrifiant = async (lubrifiant) => {
    return apiRequest(API_PATHS.LUBRIFIANTS.ADD_LUBRIFIANT, "POST", lubrifiant);
};

export const updateLubrifiant = async (updatedLubrifiant) => {
    return apiRequest(API_PATHS.LUBRIFIANTS.UPDATE_LUBRIFIANT(updatedLubrifiant.id), "PATCH", updatedLubrifiant);
};

export const deleteLubrifiant = async (lubrifiantToDelete) => {
    return apiRequest(API_PATHS.LUBRIFIANTS.DELETE_LUBRIFIANT(lubrifiantToDelete.id), "DELETE");
};