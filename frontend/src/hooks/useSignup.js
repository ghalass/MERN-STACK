import { useState } from "react"
import { API } from "../utils/constants";

import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate(); // ⬅️ Initialisation du navigate

    const signup = async (name, email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${API}/user/signup`, {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
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
            login(json)
            navigate("/");
            setIsLoading(false)
            toast.success(`Connecté avec succès!`);
        }
    }

    return { signup, isLoading, error }
}

