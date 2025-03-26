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
        GET_ALL_PARCS_BY_TYPEPARC: (typeparcId) => `/parcs/typeparc/${typeparcId}`,
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
    TYPEPANNES: {
        GET_ALL_TYPEPANNES: "/typepannes",
        ADD_TYPEPANNE: "/typepannes",
        UPDATE_TYPEPANNE: (typepanneId) => `/typepannes/${typepanneId}`,
        DELETE_TYPEPANNE: (typepanneId) => `/typepannes/${typepanneId}`,
        DOWNLOAD_TYPEPANNES: "/typepannes/downloadexcel",
    },
    PANNES: {
        GET_ALL_PANNES: "/pannes",
        GET_ALL_PANNES_BY_TYPEPANNE_ID: (typepanneId) => `/pannes/typepanne/${typepanneId}`,

        ADD_PANNE: "/pannes/add",
        UPDATE_PANNE: (panneId) => `/pannes/${panneId}`,
        DELETE_PANNE: (panneId) => `/pannes/${panneId}`,
        DOWNLOAD_PANNES: "/pannes/downloadexcel",
    },
    TYPELUBRIFIANTS: {
        GET_ALL_TYPELUBRIFIANTS: "/typelubrifiants",
        ADD_TYPELUBRIFIANT: "/typelubrifiants",
        UPDATE_TYPELUBRIFIANT: (typelubrifiantId) => `/typelubrifiants/${typelubrifiantId}`,
        DELETE_TYPELUBRIFIANT: (typelubrifiantId) => `/typelubrifiants/${typelubrifiantId}`,
        DOWNLOAD_TYPELUBRIFIANTS: "/typelubrifiants/downloadexcel",
    },
    LUBRIFIANTS: {
        GET_ALL_LUBRIFIANTS: "/lubrifiants",
        ADD_LUBRIFIANT: "/lubrifiants",
        UPDATE_LUBRIFIANT: (lubrifiantId) => `/lubrifiants/${lubrifiantId}`,
        DELETE_LUBRIFIANT: (lubrifiantId) => `/lubrifiants/${lubrifiantId}`,
        DOWNLOAD_LUBRIFIANTS: "/lubrifiants/downloadexcel",
    },
    SAISIE_RJE: {
        GET_SAISIE_RJE: "/saisiehrm/getSaisieHrm",
        GET_SAISIE_RJE_DAY: "/saisiehrm/getSaisieHrmDay",

        ADD_SAISIE_RJE_HRM: `/saisiehrm/createSaisieHrm`,
        UPDATE_SAISIE_RJE_HRM: `/saisiehrm/updateSaisieHrm`,

        ADD_SAISIE_RJE_PANNE_HIM: "/saisiehrm/createSaisieHim",
        DELETE_SAISIE_RJE_PANNE_HIM: "/saisiehrm/deleteSaisieHim",
        UPDATE_SAISIE_RJE_PANNE_HIM: "/saisiehrm/updateSaisieHim",


    },
    SAISIE_LUBRIFIANT: {
        ADD_SAISIE_LUBRIFIANT: `/saisielubrifiant/createSaisieLubrifiant`,
        DELETE_SAISIE_LUBRIFIANT: `/saisielubrifiant/deleteSaisieLubrifiant`,
    },
    RAPPORTS: {
        GENERATE_RJE: "/rapports/getRapportRje",
        GENERATE_UNITE_PHYSIQUE: "/rapports/getRapportUnitePhysique",
        GENERATE_ETAT_MENSUEL: "/rapports/getEtatMensuel",
        GENERATE_RAPPORT_INDISPO: "/rapports/getIndispoParParc",
        GENERATE_RAPPORT_HEURES_CHASSIS: "/rapports/getHeuresChassis",
        GENERATE_RAPPORT_SPEC_LUB: "/rapports/getSpecLub",
        GENERATE_PARETO_INDISPO_PARC: "/rapports/getParetoIndispoParc",
        GENERATE_PARETO_MTBF_PARC: "/rapports/getParetoMtbfParc",
    }
};