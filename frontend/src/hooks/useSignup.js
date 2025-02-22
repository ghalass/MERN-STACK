import { useState } from "react"

import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Cookies from "js-cookie";

export const useSignup = () => {

    const baseUrl = import.meta.env.VITE_BASE_URL;

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate(); // ⬅️ Initialisation du navigate

    const signup = async (name, email, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const path = `${baseUrl}/auth/register`;

            const response = await fetch(path, {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })
            const json = await response.json()

            if (!response.ok) {
                setIsLoading(false)
                setError(json.error)
            } else {
                // save the user to cookie
                const accessToken = json.accessToken;
                if (accessToken) Cookies.set("accessToken", accessToken);

                // save the user to local storage
                localStorage.setItem('user', JSON.stringify(json))

                // update useAuthStore
                login(json)
                navigate("/");
                setIsLoading(false)
                toast.success(`Connecté avec succès!`);
            }
        } catch (error) {
            console.log(error);

            setError(error.error);
            toast.error(error.error || "Échec de la connexion.");
        } finally {
            setIsLoading(false);
        }
    }

    return { signup, isLoading, error }
}

