import { create } from "zustand";
import { devtools } from "zustand/middleware"

export const useAuthStore = create(
    devtools(
        (set) => ({
            user: null,

            login: (currentUser) => set({ user: currentUser }),
            logout: () => set({ user: null }),
        })
    )
)