import { useEffect, useState } from "react";

// components
import WorkoutDetails from "../components/workout/WorkoutDetails";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/workouts");
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="m-2">
      {workouts &&
        workouts.map((workout) => (
          <ul className="list-group" key={workout.id}>
            <WorkoutDetails workout={workout} />
          </ul>
        ))}
    </div>
  );
};

export default Home;
