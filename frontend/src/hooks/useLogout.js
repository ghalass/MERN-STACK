import { useState } from "react"
import { API } from "../utils/constants";

import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const logout = useAuthStore((state) => state.logout);

    const navigate = useNavigate(); // ⬅️ Initialisation du navigate

    const logoutUser = async () => {
        // remove user from storage
        localStorage.removeItem('user')

        // remove user from global state
        logout()
        navigate("/");
    }

    return { logoutUser }
}

