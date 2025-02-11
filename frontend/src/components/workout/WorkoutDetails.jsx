import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { fr } from "date-fns/locale";

import { openModal } from "../../utils/utils";

import WorkoutDeleteModal from "../../components/workout/WorkoutDeleteModal";

const WorkoutDetails = ({ workout }) => {
  return (
    <>
      <li className="list-group-item mb-1">
        <div className="d-flex justify-content-between align-items-center">
          <h4>{workout.title}</h4>
          <div className="d-flex gap-2">
            <i
              onClick={() => {}}
              role="button"
              className="bi bi-pencil btn btn-sm btn-outline-primary rounded-pill"
            ></i>

            <i
              onClick={() => openModal("workoutDeleteModal")}
              role="button"
              className="bi bi-trash3 btn btn-sm btn-outline-danger rounded-pill"
            ></i>
          </div>
        </div>
        <p>
          <strong>Load (Kg): </strong>
          {workout.load}
        </p>
        <p>
          <strong>Reps: </strong>
          {workout.reps}
        </p>
        <p>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
            locale: fr,
          })}
        </p>
      </li>

      <WorkoutDeleteModal workout={workout} />
    </>
  );
};

export default WorkoutDetails;
