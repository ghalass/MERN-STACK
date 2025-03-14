import toast from "react-hot-toast";
import { useProfile } from "../../hooks/useProfile";
import { useWorkoutsStore } from "../../store/workoutStore";
import { closeModal, openModal } from "../../utils/modal";

// COMPONENTS
import { lazy, useEffect, useState } from "react";
const WorkoutForm = lazy(() => import("../../components/workout/WorkoutForm"));

const WorkoutModal = ({ workout = null, crudOp }) => {
  // GLOBAL STATES
  const setOp = useWorkoutsStore((state) => state.setOp);
  const op = useWorkoutsStore((state) => state.op);
  const setSelectedWorkout = useWorkoutsStore(
    (state) => state.setSelectedWorkout
  );

  const { userCan } = useProfile();

  // LOCAL STATES
  const [btnCls, setBtnCls] = useState("");

  const btnClsPartOne = "btn btn-sm bi rounded-pill ";
  const btnClsPartTwo = "btn-outline";

  useEffect(() => {
    switch (crudOp) {
      case "add":
        setBtnCls(`${btnClsPartOne} bi-plus-lg ${btnClsPartTwo}-success`);
        break;
      case "update":
        setBtnCls(`${btnClsPartOne} bi-pencil ${btnClsPartTwo}-primary`);
        break;
      case "delete":
        setBtnCls(`${btnClsPartOne} bi-trash3 ${btnClsPartTwo}-danger`);
        break;
      case "infos":
        setBtnCls(`${btnClsPartOne} bi-info-lg ${btnClsPartTwo}-success`);
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
          setSelectedWorkout(workout);
          if (crudOp !== "infos") {
            if (userCan(["SUPER_ADMIN", "ADMIN"])) {
              openModal("workoutModal");
            } else {
              toast.error("Vous n'avez pas l'autorisation.");
            }
          } else {
            openModal("workoutModal");
          }
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
                {op === "add" && "Ajout d'un Workout"}
                {op === "update" && "Modification d'un Workout"}
                {op === "delete" && "Suppression d'un Workout"}
                {op === "infos" && "Délails d'un Workout"}
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
