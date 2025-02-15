import { useState, useEffect } from "react";
import { useWorkoutsStore } from "../../store/workoutStore";

const WorkoutPagination = ({ setPaginatedWorkouts }) => {
  const workouts = useWorkoutsStore((state) => state.workouts);

  const [currentPage, setCurrentPage] = useState(1);
  const [workoutsPerPage, setWorkoutsPerPage] = useState(8);
  // const workoutsPerPage = 6; // Nombre de workouts par page

  // 🔹 Met à jour les workouts affichés lorsqu'on change de page
  useEffect(() => {
    const indexOfLastWorkout = currentPage * workoutsPerPage;
    const indexOfFirstWorkout = indexOfLastWorkout - workoutsPerPage;
    setPaginatedWorkouts(
      workouts.slice(indexOfFirstWorkout, indexOfLastWorkout)
    );
  }, [currentPage, workouts, setPaginatedWorkouts, workoutsPerPage]);

  const totalPages = Math.ceil(workouts.length / workoutsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // SEARCH
  const [search, setSearch] = useState("");

  const submitSearch = () => {
    if (search.trim() !== "") {
      const r = workouts.filter(
        (w) =>
          w.title.toLowerCase().includes(search.toLowerCase()) ||
          w.load.toString().includes(search) ||
          w.reps.toString().includes(search)
      );
      setPaginatedWorkouts(r);
    }
  };

  return (
    <div className="d-flex justify-content-end align-items-center mb-2">
      <input
        className="form-control form-control-sm"
        type="search"
        placeholder="Chercher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={submitSearch}
        style={{ width: "200px" }}
      />

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
        <i className="bi bi-skip-backward"></i>
      </button>

      <span>
        Page {currentPage} / {totalPages || 1}
      </span>

      <button
        className="btn btn-sm btn-outline-primary ms-2"
        onClick={handleNextPage}
        disabled={currentPage >= totalPages}
      >
        <i className="bi bi-skip-forward"></i>
      </button>
    </div>
  );
};

export default WorkoutPagination;
