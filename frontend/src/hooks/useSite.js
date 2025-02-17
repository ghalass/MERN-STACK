import useAuthStore from "../store/authStore";
import { apiRequest } from "../utils/apiRequest";

export const useSite = () => {

    const user = useAuthStore((state) => state.user);

    const getAll = async () => {
        try {
            const response = await apiRequest(`/sites`, "GET", null, user?.token);

            if (!response || !Array.isArray(response)) {
                throw new Error("Format de réponse inattendu du serveur.");
            }

            return response;
        } catch (error) {
            // console.error("Erreur lors du chargement des workouts :", error);
            throw new Error("Le serveur n'est pas disponible. Veuillez réessayer plus tard.");
        }
    };

    const create = async (data) => {
        try {

            const response = await apiRequest(`/sites`, "POST", data, user?.token);

            if (!response) {
                console.log(response);
                throw new Error("Format de réponse inattendu du serveur.");
            }

            return response;
        } catch (error) {
            // console.error("Erreur lors du chargement des workouts :", error);
            throw error;
        }
    };

    return { getAll, create }
}

