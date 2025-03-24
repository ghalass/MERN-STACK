// hooks/useRapports.js
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { getParetoIndispParc, getParetoMtbfParc, getRapportEtatMensuel, getRapportHeuresChassis, getRapportIndispo, getRapportRje, getRapportSpecLub, getRapportUnitePhysique } from '../api/rapportsApi';

export const generateRjeQueryOptions = (du) => {
    return queryOptions({
        queryKey: ["rapportRjeList"],
        queryFn: () => getRapportRje(du),
        enabled: false, // 🔥 Désactive la requête automatique
    })
}

export const generateUnitePhysiqueQueryOptions = (du) => {
    return queryOptions({
        queryKey: ["rapportUnitePhysiqueList"],
        queryFn: () => getRapportUnitePhysique(du),
        enabled: false, // 🔥 Désactive la requête automatique
    })
}

export const generateEtatMensuelOptions = (du) => {
    return queryOptions({
        queryKey: ["rapportEtatMensuelList"],
        queryFn: () => getRapportEtatMensuel(du),
        enabled: false, // 🔥 Désactive la requête automatique
    })
}

export const getRapportIndispoOptions = (du) => {
    return queryOptions({
        queryKey: ["rapportRapportIndispo"],
        queryFn: () => getRapportIndispo(du),
        enabled: false, // 🔥 Désactive la requête automatique
    })
}

export const getRapportHeuresChassisOptions = (du) => {
    return queryOptions({
        queryKey: ["rapportRapportHeuresChassis"],
        queryFn: () => getRapportHeuresChassis(du),
        enabled: false, // 🔥 Désactive la requête automatique
    })
}

export const getRapportSpecLubOptions = (typelubrifiantId, year) => {
    return queryOptions({
        queryKey: ["rapportRapportSpecLub"],
        queryFn: () => getRapportSpecLub(typelubrifiantId, year),
        enabled: false, // 🔥 Désactive la requête automatique
    })
}

export const getParetoIndispParcOptions = (parcId, date) => {
    return queryOptions({
        queryKey: ["rapportParetoIndispParc"],
        queryFn: () => getParetoIndispParc(parcId, date),
        enabled: false, // 🔥 Désactive la requête automatique
    })
}

export const getParetoMtbfParcOptions = (parcId, date) => {
    return queryOptions({
        queryKey: ["rapportParetoMtbfParc"],
        queryFn: () => getParetoMtbfParc(parcId, date),
        enabled: false, // 🔥 Désactive la requête automatique
    })
}