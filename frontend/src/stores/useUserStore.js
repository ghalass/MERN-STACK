// stores/useUserStore.js
import { create } from 'zustand';

const useUserStore = create((set) => ({
    selectedUser: null,
    setSelectedUser: (user) => set({ selectedUser: user }),

    // CREATE
    isShowCreateModal: false,
    openCreateModal: () => set({ isShowCreateModal: true }),
    closeCreateModal: () => set({ isShowCreateModal: false }),

    // EDIT
    isShowEditMsetSelectedUserodal: false,
    openEditModal: () => set({ isShowEditModal: true }),
    closeEditModal: () => set({ isShowEditModal: false }),

    // DELETE
    isShowDeleteModal: false,
    openDeleteModal: () => set({ isShowDeleteModal: true }),
    closeDeleteModal: () => set({ isShowDeleteModal: false }),


}));

export default useUserStore;