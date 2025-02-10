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

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`${API}/workouts`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json);
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [setWorkouts, user]);

  return (
    <div className="m-2">
      <div className="row">
        <div className="col">
          <h3>Liste</h3>
          {workouts &&
            workouts.map((workout, index) => (
              <ul className="list-group" key={index}>
                <WorkoutDetails workout={workout} />
              </ul>
            ))}
        </div>
        <div className="col">
          <WorkoutForm />
        </div>
      </div>
    </div>
  );
};

export default Workouts;
