// stores/useSiteStore.js
import { create } from 'zustand';

const useSiteStore = create((set) => ({
    // FILTER
    search: "",
    setSearch: (search) => set({ search }),

    // SELECTED ITEM
    selectedSite: null,
    setSelectedSite: (site) => set({ selectedSite: site }),

    // CREATE
    isShowCreateModal: false,
    openCreateModal: () => set({ isShowCreateModal: true }),
    closeCreateModal: () => set({ isShowCreateModal: false }),

    // EDIT
    isShowEditMsetSelectedSiteodal: false,
    openEditModal: () => set({ isShowEditModal: true }),
    closeEditModal: () => set({ isShowEditModal: false }),

    // DELETE
    isShowDeleteModal: false,
    openDeleteModal: () => set({ isShowDeleteModal: true }),
    closeDeleteModal: () => set({ isShowDeleteModal: false }),


}));

export default useSiteStore;