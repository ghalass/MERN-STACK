// stores/useTypeparcStore.js
import { create } from 'zustand';

const useTypeparcStore = create((set) => ({
    selectedTypeparc: null, // Typeparc sélectionné pour la mise à jour
    isModalOpen: false,
    setSelectedTypeparc: (typeparc) => set({ selectedTypeparc: typeparc }),
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false, selectedTypeparc: null }),
}));

export default useTypeparcStore;