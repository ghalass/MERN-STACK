import { useState, useEffect } from "react";
import { useWorkoutsStore } from "../../store/workoutStore";

const WorkoutPagination = ({ setCurrentWorkouts }) => {
  const workouts = useWorkoutsStore((state) => state.workouts);

  const [currentPage, setCurrentPage] = useState(1);
  const [workoutsPerPage, setWorkoutsPerPage] = useState(6);
  // const workoutsPerPage = 6; // Nombre de workouts par page

  // 🔹 Met à jour les workouts affichés lorsqu'on change de page
  useEffect(() => {
    const indexOfLastWorkout = currentPage * workoutsPerPage;
    const indexOfFirstWorkout = indexOfLastWorkout - workoutsPerPage;
    setCurrentWorkouts(workouts.slice(indexOfFirstWorkout, indexOfLastWorkout));
  }, [currentPage, workouts, setCurrentWorkouts, workoutsPerPage]);

  const totalPages = Math.ceil(workouts.length / workoutsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="d-flex justify-content-center align-items-center mb-2">
      <input
        type="number"
        className="form-control form-control-sm me-1"
        style={{ width: "60px" }}
        min={1}
        value={workoutsPerPage}
        onChange={(e) => setWorkoutsPerPage(e.target.value)}
      />
      <button
        className="btn btn-sm btn-outline-primary me-2"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        Précédent
      </button>

      <span>
        Page {currentPage} / {totalPages || 1}
      </span>

      <button
        className="btn btn-sm btn-outline-primary ms-2"
        onClick={handleNextPage}
        disabled={currentPage >= totalPages}
      >
        Suivant
      </button>
    </div>
  );
};

export default WorkoutPagination;
