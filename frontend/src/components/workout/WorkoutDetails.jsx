import React from "react";

const WorkoutDetails = ({ workout }) => {
  return (
    <li className="list-group-item mb-1" key={workout.id}>
      <h4>{workout.title}</h4>
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
