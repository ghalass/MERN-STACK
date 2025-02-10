import React from "react";
import { useWorkoutsStore } from "../../store/workoutStore";
import { API } from "../../utils/constants";

const WorkoutDetails = ({ workout }) => {
  const deleteWorkout = useWorkoutsStore((state) => state.deleteWorkout);

  const handleDelete = async () => {
    const response = await fetch(`${API}/workouts/${workout.id}`, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      deleteWorkout(json);
    }
  };
  return (
    <li className="list-group-item mb-1">
      <div className="d-flex justify-content-between align-items-center">
        <h4>{workout.title}</h4>
        <i
          onClick={handleDelete}
          role="button"
          className="bi bi-trash3 btn btn-sm btn-outline-danger rounded-pill"
        ></i>
      </div>
      <p>
        <strong>Load (Kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{workout.createdAt}</p>
    </li>
  );
};

export default WorkoutDetails;
