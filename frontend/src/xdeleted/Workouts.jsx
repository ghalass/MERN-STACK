import { lazy, Suspense, useEffect, useState } from "react";

// Components
import LoaderSpinner from "../components/ui/LoaderSpinner";
const WorkoutItem = lazy(() => import("../components/workout/WorkoutItem"));
const WorkoutPagination = lazy(() =>
  import("../components/workout/WorkoutPagination")
);
const WorkoutModal = lazy(() => import("../components/workout/WorkoutModal"));

// Stores
import { useWorkoutsStore } from "../store/workoutStore";
import useAuthStore from "../store/authStore";
import { useWorkout } from "../hooks/useWorkout";
import { useQuery } from "@tanstack/react-query";

const Workouts = () => {
  // GLOBAL STATES
  // const user = useAuthStore((state) => state.user);
  // const workouts = useWorkoutsStore((state) => state.workouts);
  // const setWorkouts = useWorkoutsStore((state) => state.setWorkouts);

  // Custom hook
  const { getAllWorkouts } = useWorkout({});

  const {
    isLoading,
    error,
    data: workouts,
    isError,
  } = useQuery({
    queryKey: ["workoutsList"],
    queryFn: getAllWorkouts,
    retry: 1, // Reduce retries for faster error detection
    retryDelay: 2000, // Wait before retrying
  });
  // LOCAL STATES
  const [paginatedWorkouts, setPaginatedWorkouts] = useState([]);

  // useEffect(() => {
  //   const fetchWorkouts = async () => {
  //     await getAllWorkouts();
  //   };

  //   // don't load data if no user connected
  //   if (user) fetchWorkouts();
  // }, [setWorkouts, user]);

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
              <span className="h6">
                Liste des workouts ({workouts?.length || 0})
              </span>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-8 d-flex justify-content-end">
          <WorkoutPagination setPaginatedWorkouts={setPaginatedWorkouts} />
        </div>
      </div>

      <div className="row">
        {isLoading && <LoaderSpinner />}

        {isError && error && (
          <div
            className="w-75 mx-auto alert alert-danger d-flex align-items-center alert-dismissible fade show"
            role="alert"
          >
            <i className="bi bi-exclamation-triangle-fill me-2"></i>

            <div> {error.message}</div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}

        {!isLoading && !isError && workouts?.length === 0 && (
          <p>No workouts available.</p>
        )}

        {/* <Suspense fallback={<LoaderSpinner />}> */}
        {Array.isArray(workouts) &&
          workouts.length > 0 &&
          paginatedWorkouts.map((workout, index) => (
            <div
              key={index}
              className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-2"
            >
              <WorkoutItem workout={workout} />
            </div>
          ))}
        {/* </Suspense> */}
      </div>
    </div>
  );
};

export default Workouts;
