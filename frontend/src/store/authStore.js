import { create } from "zustand";
// import { devtools } from "zustand/middleware"

export const useAuthStore = create((set, get) => ({
    // user: JSON.parse(localStorage.getItem("user")) || null,
    user: null,
    loading: true,

    initializeAuth: () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        set({ user: storedUser, loading: false });
    },

    login: (currentUser) => {
        // console.log("login du store Zustand:", currentUser);
        set({ user: currentUser, loading: false });
    },

    logout: () => {
        const currentUser = get().user;
        // console.log("logout du store Zustand:", currentUser);
        set({ user: null, loading: false });

        // remove user from storage
        localStorage.removeItem("user");
    },
})
)