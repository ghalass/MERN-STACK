import { useEffect } from "react";

// components
import WorkoutDetails from "../components/workout/WorkoutDetails";
import WorkoutForm from "../components/workout/WorkoutForm";

//
import { API } from "../utils/constants";

//
import { useWorkoutsStore } from "../store/workoutStore";

const Home = () => {
  const workouts = useWorkoutsStore((state) => state.workouts);
  const setWorkouts = useWorkoutsStore((state) => state.setWorkouts);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`${API}/workouts`);
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json);
      }
    };

    fetchWorkouts();
  }, [setWorkouts]);

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

export default Home;
