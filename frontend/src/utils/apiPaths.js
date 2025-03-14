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
        GET_ALL_SITES: "/sites/get",
        ADD_SITE: "/sites/add",
        UPDATE_SITE: (siteId) => `/sites/${siteId}`,
        DELETE_SITE: (siteId) => `/sites/${siteId}`,
        DOWNLOAD_SITES: "/sites/downloadexcel",
    },
    ENGINS: {
        GET_ALL_ENGINS: "/engins/get",
        ADD_ENGIN: "/engins/add",
        UPDATE_ENGIN: (enginId) => `/engins/${enginId}`,
        DELETE_ENGIN: (enginId) => `/engins/${enginId}`,
        DOWNLOAD_ENGINS: "/engins/downloadexcel",
    },
    PANNES: {
        GET_ALL_PANNES: "/pannes/get",
        ADD_PANNE: "/pannes/add",
        UPDATE_PANNE: (panneId) => `/pannes/${panneId}`,
        DELETE_PANNE: (panneId) => `/pannes/${panneId}`,
        DOWNLOAD_PANNES: "/pannes/downloadexcel",
    },
    SAISIE_RJE: {
        GET_SAISIE_RJE: "/saisiehrm/getSaisieHrm",

        ADD_SAISIE_RJE_PANNE_HIM: "/saisiehrm/addPanneHim",
        DELETE_SAISIE_RJE_PANNE_HIM: (saisiehimId) => `/saisiehrm/deletePanneHim/${saisiehimId}`,

        ADD_SAISIE_RJE_HRM: `/saisiehrm/`,
        UPDATE_SAISIE_RJE_HRM: (saisiehrmId) => `/saisiehrm/${saisiehrmId}`,
    },
};