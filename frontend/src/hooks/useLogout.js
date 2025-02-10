import { useState } from "react"
import { API } from "../utils/constants";

import { useAuthStore } from "../store/authStore";

export const useLogout = () => {
    const logout = useAuthStore((state) => state.logout);

    const logoutUser = async () => {
        // remove user from storage
        localStorage.removeItem('user')

        // remove user from global state
        logout()
    }

    return { logoutUser }
}

