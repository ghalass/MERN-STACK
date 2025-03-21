// stores/useSiteStore.js
import { create } from 'zustand';

const useSiteStore = create((set) => ({
    selectedSite: null, // Site sélectionné pour la mise à jour
    isModalOpen: false,
    setSelectedSite: (site) => set({ selectedSite: site }),
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false, selectedSite: null }),
}));

export default useSiteStore;