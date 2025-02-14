import { useWorkoutsStore } from "../../store/workoutStore";
import { closeModal, openModal } from "../../utils/modal";

// COMPONENTS
import { lazy, useEffect, useState } from "react";
const WorkoutForm = lazy(() => import("../../components/workout/WorkoutForm"));

const WorkoutModal = ({ workout = null, crudOp }) => {
  // GLOBAL STATES
  const setOp = useWorkoutsStore((state) => state.setOp);
  const setCurrentWorkout = useWorkoutsStore(
    (state) => state.setCurrentWorkout
  );

  // LOCAL STATES
  const [title, setTitle] = useState("no title");
  const [btnCls, setBtnCls] = useState("");

  useEffect(() => {
    switch (crudOp) {
      case "add":
        setTitle("Ajout d'un Workout");
        setBtnCls(`btn btn-sm bi rounded-pill bi-plus-lg btn-outline-success`);
        break;
      case "update":
        setTitle("Modification d'un Workout");
        setBtnCls(`btn btn-sm bi rounded-pill bi-pencil btn-outline-primary`);
        break;
      case "delete":
        setTitle("Suppression d'un Workout");
        setBtnCls(`btn btn-sm bi rounded-pill bi-trash3 btn-outline-danger`);
        break;
      default:
        break;
    }
  });

  return (
    <div>
      <i
        onClick={() => {
          setOp(crudOp);
          openModal("workoutModal");
          setCurrentWorkout(workout);
        }}
        role="button"
        className={btnCls}
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
                {title}
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
