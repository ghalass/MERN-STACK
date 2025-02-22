import { useState } from "react";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { apiRequest } from "../utils/apiRequest"; // ✅ Import de la fonction API utilitaire

import Cookies from "js-cookie";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const loginUser = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {

            const response = await apiRequest(`/auth/login`, "POST", { email, password });

            if (!response?.error) {
                // save the user to cookie
                const accessToken = response.accessToken;
                if (accessToken) Cookies.set("accessToken", accessToken);

                // Sauvegarde de l'utilisateur dans le local storage
                localStorage.setItem("user", JSON.stringify(response));

                // Mise à jour du store d'authentification
                login(response);

                // Redirection après connexion réussie
                navigate("/");
                toast.success("Connecté avec succès !");
            } else {
                setError(response?.error)
            }


        } catch (error) {
            setError(error.error);
            toast.error(error.error || "Échec de la connexion.");
        } finally {
            setIsLoading(false);
        }
    };

    return { loginUser, isLoading, error };
};
