// utilis/apiPaths.js
export const API_PATHS = {
    AUTH: {
        LOGIN: "/user/login",
        LOGOUT: "/user/logout",
        CHECK_TOKEN: "/user/checktoken",
        REGISTER: "/user/signup",
        UPDATE_USER: "/user/updateUser",
        DELETE_USER: (userId) => `/user/${userId}`,
        GET_USER_INFO: "/user/getUserInfo",
        GET_ALL_USERS: "/user/users",

    },
    DASHBOARD: {
        GET_DATA: "/dashboard/",
    },
    SITES: {
        GET_ALL_SITES: "/sites",
        ADD_SITE: "/sites",
        UPDATE_SITE: (siteId) => `/sites/${siteId}`,
        DELETE_SITE: (siteId) => `/sites/${siteId}`,
        DOWNLOAD_SITES: "/sites/downloadexcel",
    },
    TYPEPARCS: {
        GET_ALL_TYPEPARCS: "/typeparcs",
        ADD_TYPEPARC: "/typeparcs",
        UPDATE_TYPEPARC: (typeparcId) => `/typeparcs/${typeparcId}`,
        DELETE_TYPEPARC: (typeparcId) => `/typeparcs/${typeparcId}`,
        DOWNLOAD_TYPEPARCS: "/typeparcs/downloadexcel",
    },
    PARCS: {
        GET_ALL_PARCS: "/parcs",
        ADD_PARC: "/parcs/add",
        UPDATE_PARC: (parcId) => `/parcs/${parcId}`,
        DELETE_PARC: (parcId) => `/parcs/${parcId}`,
        DOWNLOAD_PARCs: "/parcs/downloadexcel",
    },
    ENGINS: {
        GET_ALL_ENGINS: "/engins",
        ADD_ENGIN: "/engins/add",
        GET_ALL_ENGINS_BY_PARCID_SITEID: (parcId, siteId) => `/engins/parc/${parcId}/site/${siteId}`,
        UPDATE_ENGIN: (enginId) => `/engins/${enginId}`,
        DELETE_ENGIN: (enginId) => `/engins/${enginId}`,
        DOWNLOAD_ENGINS: "/engins/downloadexcel",
    },
    PANNES: {
        GET_ALL_PANNES: "/pannes",
        GET_ALL_PANNES_BY_PARCID: (parcId) => `/pannes/parc/${parcId}`,

        ADD_PANNE: "/pannes/add",
        UPDATE_PANNE: (panneId) => `/pannes/${panneId}`,
        DELETE_PANNE: (panneId) => `/pannes/${panneId}`,
        DOWNLOAD_PANNES: "/pannes/downloadexcel",
    },
    SAISIE_RJE: {
        GET_SAISIE_RJE: "/saisiehrm/getSaisieHrm",

        ADD_SAISIE_RJE_HRM: `/saisiehrm/createSaisieHrm`,
        UPDATE_SAISIE_RJE_HRM: `/saisiehrm/updateSaisieHrm`,

        ADD_SAISIE_RJE_PANNE_HIM: "/saisiehrm/createSaisieHim",
        DELETE_SAISIE_RJE_PANNE_HIM: "/saisiehrm/deleteSaisieHim",
    },
    RAPPORTS: {
        GENERATE_RJE: "/rapports/getRapportRje",
        GENERATE_UNITE_PHYSIQUE: "/rapports/getRapportUnitePhysique",
    }
};