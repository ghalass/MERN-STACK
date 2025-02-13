import { useState } from "react";
import { closeModal } from "../../utils/modal";
import toast from "react-hot-toast";
import { apiRequest } from "../../utils/apiRequest";

// STORES
import useAuthStore from "../../store/authStore";
import { useWorkoutsStore } from "../../store/workoutStore";

// COMPONENTS
import Error from "../forms/Error";
import SubmitButton from "../forms/SubmitButton";

const WorkoutFormDelete = () => {
  // GLOBAL STATES
  const deleteWorkout = useWorkoutsStore((state) => state.deleteWorkout);
  const user = useAuthStore((state) => state.user);
  const currentWorkout = useWorkoutsStore((state) => state.currentWorkout);
  const op = useWorkoutsStore((state) => state.op);
  const setOp = useWorkoutsStore((state) => state.setOp);
  // LOCAL STATES
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // LOCAL FUNCTION
  const handleSubmit = async () => {
    setIsProcessing(true);
    if (!user) {
      setIsProcessing(false);
      toast.error("Vous devez être connecté !");
      return;
    }

    try {
      // DELETE
      if (op === "delete") {
        const response = await apiRequest(
          `/workouts/${currentWorkout.id}`,
          "DELETE",
          null,
          user.token
        );
        deleteWorkout(response);
        toast.success("Supprimé avec succès !");
      } else {
        toast.error("Aucune opération n'est choisie !");
      }

      setError(null);
      setIsProcessing(false);
      setOp(null);
      closeModal("workoutModal");
    } catch (error) {
      setError(error.error);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div>
      <h5 className="text-danger">
        <i className="bi bi-exclamation-triangle"></i> Voulez-vous vraiment
        <span className="badge rounded-pill text-bg-danger mx-1 ">
          Supprimer
        </span>
        ce Workout ?
      </h5>
      <div className="text-primary text-center mt-4">
        <strong>{currentWorkout?.title}</strong>
      </div>

      <SubmitButton
        onClick={handleSubmit}
        isProcessing={isProcessing}
        operation={op}
      />
      <Error error={error} />
    </div>
  );
};

export default WorkoutFormDelete;
