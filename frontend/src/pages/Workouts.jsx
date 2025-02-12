import { lazy, Suspense, useEffect, useState } from "react";

// Components
import LoaderSpinner from "../components/ui/LoaderSpinner";
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

  const [operation, setOperation] = useState(null);

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

  useEffect(() => {
    console.log("workouts rendred");
  });

  return (
    <div className="m-2">
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="badge rounded-pill text-bg-light text-primary mb-2">
                  <span className="h6">Liste des workouts</span>
                </div>
                <div className="badge rounded-pill text-bg-light text-primary mb-2">
                  <span className="h6">Total : {workouts.length}</span>
                </div>
              </div>
              <Suspense fallback={<LoaderSpinner />}>
                <ul className="list-group">
                  {currentWorkouts.map((workout, index) => (
                    <WorkoutDetails
                      key={index}
                      workout={workout}
                      operation={operation}
                      setOperation={setOperation}
                    />
                  ))}
                </ul>
                <WorkoutPagination
                  workouts={workouts}
                  setCurrentWorkouts={setCurrentWorkouts}
                />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <div className="card-body">
              <WorkoutForm operation={operation} setOperation={setOperation} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
