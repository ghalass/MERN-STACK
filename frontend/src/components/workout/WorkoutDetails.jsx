import { lazy, Suspense } from "react";
import { formatDateAgo } from "../../utils/func";
const WorkoutModal = lazy(() => import("./WorkoutModal"));

const WorkoutDetails = ({ workout }) => {
  // GLOBAL STATES

  return (
    <>
      <li className="list-group-item mb-1">
        <div className="d-flex justify-content-between align-items-center">
          <h4>{workout.title}</h4>
        </div>
        <p>
          <strong>Load (Kg): </strong>
          {workout.load}
        </p>
        <p>
          <strong>Reps: </strong>
          {workout.reps}
        </p>
        <div className="d-flex flex-column ">
          <span>{formatDateAgo(workout.createdAt)}</span>
          <span>{formatDateAgo(workout.updatedAt)}</span>
        </div>
        <div className="d-flex gap-2 justify-content-end">
          <Suspense>
            <WorkoutModal workout={workout} crudOp="update" />
          </Suspense>
          <Suspense>
            <WorkoutModal workout={workout} crudOp="delete" />
          </Suspense>
        </div>
      </li>
    </>
  );
};

export default WorkoutDetails;
