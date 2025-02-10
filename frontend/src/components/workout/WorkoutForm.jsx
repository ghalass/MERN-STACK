import { useState } from "react";
import { API } from "../../utils/constants";
import { useWorkoutsStore } from "../../store/workoutStore";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const createWorkout = useWorkoutsStore((state) => state.createWorkout);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load: parseInt(load), reps: parseInt(reps) };

    const response = await fetch(`${API}/workouts`, {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      console.log("new workout added", json);
      createWorkout(json);
      setEmptyFields([]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Add a new workout</h3>
        <div className="form-floating mb-2">
          <input
            type="text"
            className={`form-control ${
              emptyFields.includes("title") ? "is-invalid" : ""
            }`}
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="title"
          />
          <label htmlFor="title">Title</label>
        </div>

        <div className="form-floating mb-2">
          <input
            type="number"
            className={`form-control ${
              emptyFields.includes("load") ? "is-invalid" : ""
            }`}
            id="load"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            placeholder="load"
          />
          <label htmlFor="load">Load</label>
        </div>

        <div className="form-floating mb-2">
          <input
            type="number"
            className={`form-control ${
              emptyFields.includes("reps") ? "is-invalid" : ""
            }`}
            id="reps"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            placeholder="reps"
          />
          <label htmlFor="reps">Peps</label>
        </div>

        <button className="btn btn-outline-primary w-100">Save</button>
        {error && (
          <div className="alert alert-danger mt-2 py-2" role="alert">
            <i className="bi bi-exclamation-circle"></i> {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default WorkoutForm;
