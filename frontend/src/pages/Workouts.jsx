import { lazy, Suspense, useEffect, useState } from "react";

// Components
import LoaderSpinner from "../components/ui/LoaderSpinner";
const WorkoutDetails = lazy(() =>
  import("../components/workout/WorkoutDetails")
);
const WorkoutPagination = lazy(() =>
  import("../components/workout/WorkoutPagination")
);
const WorkoutModal = lazy(() => import("../components/workout/WorkoutModal"));

// Utils
import { apiRequest } from "../utils/apiRequest";

// Stores
import { useWorkoutsStore } from "../store/workoutStore";
import useAuthStore from "../store/authStore";

const Workouts = () => {
  // GLOBAL STATES
  const workouts = useWorkoutsStore((state) => state.workouts);
  const setWorkouts = useWorkoutsStore((state) => state.setWorkouts);
  const setIsLoading = useWorkoutsStore((state) => state.setIsLoading);
  const user = useAuthStore((state) => state.user);

  // LOCAL STATES
  const [currentWorkouts, setCurrentWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      setIsLoading(true);
      try {
        const data = await apiRequest(`/workouts`, "GET", null, user?.token);
        setWorkouts(data);
      } catch (error) {
        console.error("Erreur lors du chargement des workouts :", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [setWorkouts, user]);

  return (
    <div className="card m-2">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div className="badge rounded-pill text-bg-light text-primary mb-2">
            <span className="h6">Liste des workouts ({workouts.length})</span>
          </div>

          <Suspense>
            <WorkoutModal crudOp="add" />
          </Suspense>
        </div>

        <Suspense fallback={<LoaderSpinner />}>
          <ul className="list-group d-flex flex-row gap-2">
            {currentWorkouts.map((workout, index) => (
              <WorkoutDetails key={index} workout={workout} />
            ))}
          </ul>
          <WorkoutPagination setCurrentWorkouts={setCurrentWorkouts} />
        </Suspense>
      </div>
    </div>
  );
};

export default Workouts;
