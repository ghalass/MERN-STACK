import { useWorkoutsStore } from "../../store/workoutStore";
import { closeModal, openModal } from "../../utils/modal";

// COMPONENTS
import { lazy } from "react";
const WorkoutForm = lazy(() => import("../../components/workout/WorkoutForm"));

const WorkoutModal = ({ workout = null, crudOp }) => {
  // GLOBAL STATES
  const op = useWorkoutsStore((state) => state.op);
  const setOp = useWorkoutsStore((state) => state.setOp);
  const setCurrentWorkout = useWorkoutsStore(
    (state) => state.setCurrentWorkout
  );

  return (
    <div>
      <i
        onClick={() => {
          setOp(crudOp);
          openModal("workoutModal");
          setCurrentWorkout(workout);
        }}
        role="button"
        className={`btn btn-sm bi rounded-pill 
          ${crudOp == "delete" ? "bi-trash3 btn-outline-danger" : ""}
          ${crudOp == "update" ? "bi-pencil btn-outline-primary" : ""}
          ${crudOp == "add" ? "bi-plus-lg btn-outline-success" : ""}
          `}
      ></i>
      <div
        className="modal fade"
        id="workoutModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="workoutModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {/* HEADER */}
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="workoutModalLabel">
                {/* TITLE */}
                {`
                  ${op == "add" ? "Ajout d'un Workout" : ""}
                  ${op == "update" ? "Modification d'un Workout" : ""}
                  ${op == "delete" ? "Suppression d'un Workout" : ""}
                `}
              </h1>

              {/* BTN CLOSE */}
              <button
                onClick={() => {
                  closeModal("workoutModal");
                  setOp(null);
                }}
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>

            {/* BODY START */}
            <div className="modal-body">
              <WorkoutForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutModal;
