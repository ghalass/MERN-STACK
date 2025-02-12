import { lazy, Suspense, useEffect, useState } from "react";

// Components
const LoaderSpinner = lazy(() => import("../components/ui/LoaderSpinner"));
import WorkoutForm from "../components/workout/WorkoutForm";
const WorkoutDetails = lazy(() =>
  import("../components/workout/WorkoutDetails")
);
const WorkoutPagination = lazy(() =>
  import("../components/workout/WorkoutPagination")
);

// Utils
import { apiRequest } from "../utils/apiRequest";

// Store
import { useWorkoutsStore } from "../store/workoutStore";
import useAuthStore from "../store/authStore";

const Workouts = () => {
  const workouts = useWorkoutsStore((state) => state.workouts);
  const setWorkouts = useWorkoutsStore((state) => state.setWorkouts);
  const isLoading = useWorkoutsStore((state) => state.isLoading);
  const setIsLoading = useWorkoutsStore((state) => state.setIsLoading);

  const user = useAuthStore((state) => state.user);
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
    <div className="m-2">
      <p className="text-center">Workouts : {workouts.length}</p>
      <div className="row">
        <div className="col">
          <div className="badge rounded-pill text-bg-light text-primary mb-2">
            <span className="h6">Liste des workouts</span>
          </div>

          {/* {isLoading ? (
            <>
              <div className="text-center mt-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
              <p>Chargement ...</p>
            </div>
            </>
          ) : (
            <> */}
          <Suspense fallback={<LoaderSpinner />}>
            <ul className="list-group">
              {currentWorkouts.map((workout, index) => (
                <WorkoutDetails key={index} workout={workout} />
              ))}
            </ul>
            <WorkoutPagination
              workouts={workouts}
              setCurrentWorkouts={setCurrentWorkouts}
            />
          </Suspense>
          {/* </>
          )} */}
        </div>
        <div className="col">
          <WorkoutForm />
        </div>
      </div>
    </div>
  );
};

export default Workouts;
