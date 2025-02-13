import { lazy, Suspense, useEffect, useState } from "react";

// Components
import LoaderSpinner from "../components/ui/LoaderSpinner";
const WorkoutItem = lazy(() => import("../components/workout/WorkoutItem"));
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

    // don't load data if no user connected
    if (user) fetchWorkouts();
  }, [setWorkouts, user]);

  return (
    <div className="m-2">
      <div className="row">
        <div className="col-12 col-md-4">
          <div className="d-flex gap-1">
            <div>
              <Suspense>
                <WorkoutModal crudOp="add" />
              </Suspense>
            </div>
            <div className="badge rounded-pill text-bg-light text-primary mb-2">
              <span className="h6">Liste des workouts ({workouts.length})</span>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-8 d-flex justify-content-end">
          <WorkoutPagination
            currentWorkouts={currentWorkouts}
            setCurrentWorkouts={setCurrentWorkouts}
          />
        </div>
      </div>

      <div className="row">
        <Suspense fallback={<LoaderSpinner />}>
          {currentWorkouts.map((workout, index) => (
            <div
              key={index}
              className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-2"
            >
              <WorkoutItem workout={workout} />
            </div>
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default Workouts;
