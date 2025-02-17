import { create } from "zustand";

export const useSitesStore = create((set, get) => ({
    op: null,
    selectedSite: null,

    setOp: (newVal) => {
        set(() => ({ op: newVal }));
    },

    setSelectedSite: (newVal) => {
        set(() => ({ selectedSite: newVal }));
    },
}));
