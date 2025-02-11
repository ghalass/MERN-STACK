import { create } from "zustand";
import { devtools } from "zustand/middleware"

export const useAuthStore = create(
    devtools(
        (set) => ({
            user: JSON.parse(localStorage.getItem("user")) || null, // 🔹 Charge user depuis localStorage,

            login: (currentUser) => set({ user: currentUser }),
            logout: () => set({ user: null }),
        })
    )
)