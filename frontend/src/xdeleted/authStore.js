import { create } from "zustand";

const useAuthStore = create((set, get) => ({
    user: null,
    loading: true,

    initializeAuth: () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        set({ user: storedUser, loading: false });
    },

    login: (currentUser) => {
        set({ user: currentUser, loading: false });
    },

    logout: () => {
        set({ user: null, loading: false });
        localStorage.removeItem("user");
    },
}));

export default useAuthStore;
