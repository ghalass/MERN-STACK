import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useWorkoutsStore } from "../../store/workoutStore";
import { API } from "../../utils/constants";
import { closeModal } from "../../utils/utils";
import toast from "react-hot-toast";

const WorkoutDeleteModal = ({ workout }) => {
  const deleteWorkout = useWorkoutsStore((state) => state.deleteWorkout);
  const user = useAuthStore((state) => state.user);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleDelete = async () => {
    setIsProcessing(true);
    setTimeout(async () => {
      if (!user) {
        setIsProcessing(false);
        return;
      }
      const response = await fetch(`${API}/workouts/${workout.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        deleteWorkout(json);
        closeModal("workoutDeleteModal");
        toast.success(`Supprimé avec succès!`);
      }
      setIsProcessing(false);
    }, 2000);
  };
  return (
    <div
      className="modal fade"
      id="workoutDeleteModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="workoutDeleteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="workoutDeleteModalLabel">
              Suppression d'un Workout
            </h1>
            <button
              onClick={() => closeModal("workoutDeleteModal")}
              disabled={isProcessing}
              type="button"
              className="btn-close"
              // data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <h5 className="text-danger">
              <i className="bi bi-exclamation-triangle"></i> Voulez-vous
              vraiment
              <span className="badge rounded-pill text-bg-danger mx-1 ">
                Supprimer
              </span>
              ce Workout ?
            </h5>
            <div className="text-primary text-center mt-4">
              <strong>{workout.title}</strong>
            </div>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => closeModal("workoutDeleteModal")}
              disabled={isProcessing}
              type="button"
              className="btn btn-sm btn-outline-secondary"
              // data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              onClick={handleDelete}
              disabled={isProcessing}
              type="button"
              className="btn btn-sm btn-outline-danger"
            >
              <div className="d-flex justify-content-center align-items-center gap-2">
                {isProcessing && (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
                <div>
                  Supprimer <i className="bi bi-trash"></i>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDeleteModal;
