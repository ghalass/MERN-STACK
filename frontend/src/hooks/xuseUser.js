import { apiRequest } from "../utils/apiRequest"; // ✅ Import de la fonction API utilitaire
import useAuthStore from "../store/authStore";
import { useState } from "react";

export const useUser = () => {

    const user = useAuthStore((state) => state.user);

    const [role, setRole] = useState(null)

    const getConnectedUserRole = async () => {
        // setError(null);
        // setIsLoading(true);
        try {

            const response = await apiRequest(`/user/getByEmail`, "POST", user?.email, user?.token);
            console.log(response);

            // check if no error
            // if (!response?.error) {
            //     setWorkouts(response);
            // } else {
            //     toast.error(response?.error);
            // }

        } catch (error) {
            // setError(error.error);
        } finally {
            // setIsLoading(false);
        }
    }

    return { role, getConnectedUserRole }
}

