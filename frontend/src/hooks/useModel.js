import { useState } from "react";
import { apiRequest } from "../utils/apiRequest"; // ✅ Import de la fonction API utilitaire
import useAuthStore from "../store/authStore";

export const useProfile = () => {

    const user = useAuthStore((state) => state.user);

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);



    const update = async () => {
        setError(null);
        setIsLoading(true);
        try {

            const response = await apiRequest(`/workouts`, "GET", null, user?.token);

            // check if no error
            if (!response?.error) {
                setWorkouts(response);
            } else {
                toast.error(response?.error);
            }

        } catch (error) {
            setError(error.error);
        } finally {
            setIsLoading(false);
        }
    }

    return { error, isLoading, update }
}

