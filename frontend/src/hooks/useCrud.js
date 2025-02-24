import useAuthStore from "../store/authStore";
import { useCrudStore } from "../store/crudStore";
import { apiRequest } from "../utils/apiRequest";
import toast from "react-hot-toast";

export const useCrud = (path) => {

    const user = useAuthStore((state) => state.user);

    const selectedItem = useCrudStore((state) => state.selectedItem);

    const getAll = async () => {
        try {
            const response = await apiRequest(`${path}`, "GET", null, user?.token);

            if (!response || !Array.isArray(response)) {
                throw new Error("Format de réponse inattendu du serveur.");
            }

            return response;
        } catch (error) {
            console.error("Erreur lors du chargement des workouts :", error);
            throw new Error(error);
        }
    };

    const getOne = async () => {
        try {
            const response = await apiRequest(`${path}`, "GET", null, user?.token);

            if (!response || !Array.isArray(response)) {
                throw new Error("Format de réponse inattendu du serveur.");
            }

            return response;
        } catch (error) {
            console.error("Erreur lors du chargement des workouts :", error);
            throw new Error(error);
        }
    };

    const create = async (data) => {
        try {

            const response = await apiRequest(`${path}`, "POST", data, user?.token);

            if (!response) {
                throw new Error("Format de réponse inattendu du serveur.");
            }

            toast.success("Ajouté avec succès !");

            return response;
        } catch (error) {
            // console.error("Erreur lors du chargement des workouts :", error);
            throw error;
        }
    };

    const update = async (data) => {
        try {
            const response = await apiRequest(`${path}/${data.id}`, "PATCH", data, user.token);
            // check if no error
            if (!response?.error) {
                toast.success("Modifié avec succès !");
            } else {
                setError(response?.error);
                return;
            }
        } catch (error) {
            throw error;
        }
    }

    const destroy = async () => {
        try {
            const response = await apiRequest(`${path}/${selectedItem.id}`, "DELETE", null, user.token);
            // check if no error
            if (!response?.error) {
                // deleteSite(response);
                toast.success("Supprimé avec succès !");
            } else {
                setError(response?.error);
                return;
            }
        } catch (error) {
            throw error;
        }
    }

    return { getAll, create, update, destroy, getOne }
}

