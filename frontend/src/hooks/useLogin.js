import { useState } from "react"
import { API } from "../utils/constants";

import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const navigate = useNavigate(); // ⬅️ Initialisation du navigate

    // const login = useAuthStore((state) => state.login);

    const loginUser = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${API}/user/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        } else {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update useAuthStore
            // login(json)
            useAuthStore.getState().login()
            setIsLoading(false)

            // ⬅️ Redirige l'utilisateur vers la page d'accueil
            navigate("/");

            toast.success(`Connecté avec succès!`);
        }
    }

    return { loginUser, isLoading, error }
}

