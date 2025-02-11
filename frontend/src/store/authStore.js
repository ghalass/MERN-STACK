import { create } from "zustand";
// import { devtools } from "zustand/middleware"

export const useAuthStore = create((set, get) => ({
    user: JSON.parse(localStorage.getItem("user")) || null,

    login: (currentUser) => {
        // console.log("login du store Zustand:", currentUser);
        set(() => ({ user: currentUser }));
    },

    logout: () => {
        const currentUser = get().user;
        // console.log("logout du store Zustand:", currentUser);
        set(() => ({ user: null }));
    },
})
)