import { useEffect } from "react";

// components
import WorkoutDetails from "../components/workout/WorkoutDetails";
import WorkoutForm from "../components/workout/WorkoutForm";

//
import { API } from "../utils/constants";

//
import { useWorkoutsStore } from "../store/workoutStore";

import { useAuthStore } from "../store/authStore";

const Workouts = () => {
  const workouts = useWorkoutsStore((state) => state.workouts);
  const setWorkouts = useWorkoutsStore((state) => state.setWorkouts);
  const isLoading = useWorkoutsStore((state) => state.isLoading);
  const setIsLoading = useWorkoutsStore((state) => state.setIsLoading);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchWorkouts = async () => {
      setIsLoading(true);
      const response = await fetch(`${API}/workouts`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json);
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

          {isLoading ? (
            <div className="text-center mt-5">
              <div className="spinner-border  text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
              <p>Chargement ...</p>
            </div>
          ) : (
            <ul className="list-group">
              {workouts &&
                workouts.map((workout, index) => (
                  <WorkoutDetails key={index} workout={workout} />
                ))}
            </ul>
          )}
        </div>
        <div className="col">
          <WorkoutForm />
        </div>
      </div>
    </div>
  );
};

export default Workouts;
