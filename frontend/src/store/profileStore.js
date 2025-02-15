import { create } from "zustand";

export const useProfileStore = create((set, get) => ({
    selectedUser: null,
    userProfile: null,
    usersList: null,

    setSelectedUser: (newVal) => {
        set(() => ({ selectedUser: newVal }));
    },
    setUserProfile: (newVal) => {
        set(() => ({ userProfile: newVal }));
    },
    setUsersList: (newVal) => {
        set(() => ({ usersList: newVal }));
    },

    // ✅ Met à jour un workout existant
    updateUsersList: (updatedProfile) => {
        set((state) => ({
            usersList: state.usersList.map((u) =>
                u.id === updatedProfile.id ? { ...u, ...updatedProfile } : u
            ),
        }));
    },
}));
