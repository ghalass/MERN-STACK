import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogout = () => {
    const logout = useAuthStore((state) => state.logout);

    const navigate = useNavigate(); // ⬅️ Initialisation du navigate

    const logoutUser = async () => {
        // remove user from storage
        localStorage.removeItem('user')

        // remove user from global state
        logout()
        navigate("/");
        toast.success(`Deconnecté avec succès!`);
    }

    return { logoutUser }
}

