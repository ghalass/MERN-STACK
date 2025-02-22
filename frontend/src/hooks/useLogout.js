import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiRequest } from "../utils/apiRequest";

import Cookies from "js-cookie";

export const useLogout = () => {
    const logout = useAuthStore((state) => state.logout);

    const navigate = useNavigate(); // ⬅️ Initialisation du navigate

    const logoutUser = async () => {
        // remove user from storage
        localStorage.removeItem('user')

        // remove user from global state
        logout()

        // remove accessToken from server
        await apiRequest(`/auth/logout`, "POST");

        // remove accessToken from browser
        Cookies.remove('accessToken');

        // navigate to home page
        navigate("/");

        // notification
        toast.success(`Deconnecté avec succès!`);
    }

    return { logoutUser }
}

