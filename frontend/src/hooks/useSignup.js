import { useState } from "react"
import { API } from "../utils/constants";

import { useAuthStore } from "../store/authStore";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const login = useAuthStore((state) => state.login);

    const signup = async (name, email, password) => {
        setIsLoading(true)
        setError(null)
        console.log(name, email, password);

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

            setIsLoading(false)
        }
    }

    return { signup, isLoading, error }
}