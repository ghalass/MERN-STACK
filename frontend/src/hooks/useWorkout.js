import { useState } from "react";
import toast from "react-hot-toast";
import { closeModal } from "../utils/modal";
import { useWorkoutsStore } from "../store/workoutStore";
import useAuthStore from "../store/authStore";
import { apiRequest } from "../utils/apiRequest";

export const useWorkout = ({ reset }) => {

    const op = useWorkoutsStore((state) => state.op);
    const setOp = useWorkoutsStore((state) => state.setOp);

    const createWorkout = useWorkoutsStore((state) => state.createWorkout);
    const updateWorkout = useWorkoutsStore((state) => state.updateWorkout);
    const deleteWorkout = useWorkoutsStore((state) => state.deleteWorkout);

    const setWorkouts = useWorkoutsStore((state) => state.setWorkouts);

    const selectedWorkout = useWorkoutsStore((state) => state.selectedWorkout);

    const user = useAuthStore((state) => state.user);

    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);


    if (!user) {
        setIsProcessing(false);
        toast.error("Vous devez être connecté !");
        return;
    }

    const goWorkout = async (data) => {
        try {
            setIsProcessing(true);
            // CREATE
            if (op === "add") {
                // create
                const response = await apiRequest("/workouts", "POST", data, user?.token);
                // check if no error
                if (!response?.error) {
                    createWorkout(response);
                    toast.success("Ajouté avec succès !");
                } else {
                    setError(response?.error);
                    return;
                }
            } else if (op === "update") {
                // UPDATE
                const response = await apiRequest(`/workouts/${data.id}`, "PATCH", data, user.token);

                // check if no error
                if (!response?.error) {
                    updateWorkout(response);
                    toast.success("Modifié avec succès !");
                } else {
                    setError(response?.error);
                    return;
                }
            } else if (op === "delete") {
                const response = await apiRequest(`/workouts/${selectedWorkout.id}`, "DELETE", null, user.token);
                // check if no error
                if (!response?.error) {
                    deleteWorkout(response);
                    toast.success("Supprimé avec succès !");
                } else {
                    setError(response?.error);
                    return;
                }
            } else {
                toast.error("Aucune opération n'est choisie !");
            }

            setError(null);
            setOp(null);
            reset();
            closeModal("workoutModal");
        } catch (error) {
            setError(error.error);
        } finally {
            setIsProcessing(false);
        }
    }

    const getAllWorkouts = async () => {
        try {
            const response = await apiRequest(`/workouts`, "GET", null, user?.token);

            if (!response || !Array.isArray(response)) {
                throw new Error("Format de réponse inattendu du serveur.");
            }

            setWorkouts(response);
            return response;
        } catch (error) {
            // console.error("Erreur lors du chargement des workouts :", error);
            throw new Error("Le serveur n'est pas disponible. Veuillez réessayer plus tard.");
        }
    };



    return { isProcessing, error, setError, goWorkout, getAllWorkouts }
}

