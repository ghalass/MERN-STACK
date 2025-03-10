import { create } from "zustand";

export const useSaisierjeStore = create((set, get) => ({
    hrmSelects: {
        du: "",
        enginId: "",
        siteId: "",
        hrm: "",
    },
    // 
    saisiehrm: {
        id: "",
        du: new Date().toISOString().split("T")[0],
        enginId: "",
        siteId: "",
        hrm: "",
    },
    saisiehim: [],
    // 

    pannesLists: [],
    totalHim: 0,
    totalNi: 0,
    dispo: 0,

    setUsersList: (newVal) => {
        set(() => ({ pannesLists: newVal }));
    },

    createPanne: (panne) => {
        const currentTotalHim = get().totalHim;
        const currentTotalNi = get().totalNi;

        // Vérifier si le panneId existe déjà dans pannesLists
        const existingPanneIndex = get().pannesLists.findIndex((p) => p.panneId === panne.panneId);

        if (existingPanneIndex >= 0) {
            // Si la panne existe déjà, on met à jour la ligne correspondante
            const updatedPannesLists = [...get().pannesLists];
            updatedPannesLists[existingPanneIndex] = panne; // Remplacer l'élément

            // Mise à jour des totaux
            const totalHimDifference = parseFloat(panne.him) - parseFloat(get().pannesLists[existingPanneIndex].him);
            const totalNiDifference = parseFloat(panne.ni) - parseFloat(get().pannesLists[existingPanneIndex].ni);

            const newTotalHim = currentTotalHim + totalHimDifference;
            const newTotalNi = currentTotalNi + totalNiDifference;

            set(() => ({
                pannesLists: updatedPannesLists,
                totalHim: newTotalHim,
                totalNi: newTotalNi,
                dispo: Math.ceil(100 * (1 - (newTotalHim / 24))),
            }));

        } else {
            // Si la panne n'existe pas, on l'ajoute
            const newTotalHim = parseFloat(currentTotalHim) + parseFloat(panne.him);
            const newTotalNi = parseFloat(currentTotalNi) + parseFloat(panne.ni);

            set((state) => ({
                pannesLists: [panne, ...state.pannesLists],
                totalHim: newTotalHim,
                totalNi: newTotalNi,
                dispo: Math.ceil(100 * (1 - (newTotalHim / 24))),
            }));
        }
    },

    deletPanne: (pannesList) => {
        const currentTotalHim = get().totalHim;
        const currentTotalNi = get().totalNi;
        const panneHim = pannesList.him;
        const panneNi = pannesList.ni;
        const newTotalHim = parseFloat(currentTotalHim) - parseFloat(panneHim);
        const newTotalNi = parseFloat(currentTotalNi) - parseFloat(panneNi);

        set((state) => ({
            pannesLists: state.pannesLists.filter((p) => p.panneId !== pannesList.panneId),
            totalHim: newTotalHim,
            totalNi: newTotalNi,
        }));
    },
}));

// 100*(1-HIM/NHO)
