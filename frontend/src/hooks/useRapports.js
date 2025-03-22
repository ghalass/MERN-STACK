// hooks/useRapports.js
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRapportEtatMensuel, getRapportIndispo, getRapportRje, getRapportUnitePhysique } from '../api/rapportsApi';

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