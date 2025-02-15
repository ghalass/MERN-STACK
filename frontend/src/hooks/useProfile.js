import { useState } from "react";
import { apiRequest } from "../utils/apiRequest"; // ✅ Import de la fonction API utilitaire
import useAuthStore from "../store/authStore";
import { closeModal } from "../utils/modal";
import toast from "react-hot-toast";
import { useProfileStore } from "../store/profileStore";

export const useProfile = () => {
    const user = useAuthStore((state) => state.user);

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const userProfile = useProfileStore((state) => state.userProfile);
    const setUserProfile = useProfileStore((state) => state.setUserProfile);

    const usersList = useProfileStore((state) => state.usersList);
    const setUsersList = useProfileStore((state) => state.setUsersList);

    const updateUsersList = useProfileStore((state) => state.updateUsersList);



    const getUserProfile = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await apiRequest(`/user/getByEmail`, "POST", { email: user?.email }, user?.token);

            // check if no error
            if (!response?.error) {
                setUserProfile(response);
            } else {
                toast.error(response?.error);
            }

        } catch (error) {
            setError(error.error);
        } finally {
            setIsLoading(false);
        }
    }

    const getAllUsers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await apiRequest(`/user/users`, "GET", null, user?.token);
            // check if no error
            if (!response?.error) {
                setUsersList(response);
            } else {
                toast.error(response?.error);
            }
        } catch (error) {
            console.error("Erreur lors du chargement des utilisateurs :", error);
        } finally {
            setIsLoading(false);
        }

    };

    const chagePassword = async (newData) => {
        try {
            setIsLoading(true);
            const response = await apiRequest(`/user/changePassword`, "POST", newData, user?.token);

            if (!response?.error) {
                toast.success("Mot de passe modifié avec succès !");
                closeModal("userProfileChangePassword");
                // if (reset) reset();
            } else {
                setError(response?.error);
                return;
            }
        } catch (err) {
            setError(err.error);
            console.error("Erreur lors changement de mot de passe :", err);
        } finally {
            setIsLoading(false);
        }
    }

    const saveProfileChange = async (data) => {
        try {
            // UPDATE
            const response = await apiRequest(`/user/updateUser`, "PATCH", data, user.token);

            // check if no error
            if (!response?.error) {
                updateUsersList(response);
                toast.success("Modifié avec succès !");
                closeModal("editProfileInfosModal");
                setError(null);
            } else {
                setError(response?.error);
                return;
            }

        } catch (error) {
            toast.error(error.error || "Échec de la connexion.");
        } finally {
            // setIsLoading(false);
        }

    }

    return { error, setError, isLoading, userProfile, usersList, getUserProfile, getAllUsers, chagePassword, saveProfileChange }
}

