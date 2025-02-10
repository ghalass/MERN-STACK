import { create } from "zustand";
import { devtools } from "zustand/middleware"

export const useWorkoutsStore = create(
    devtools(
        (set) => ({
            workouts: [],

            setWorkouts: (allWorkouts) =>
                set((state) => ({
                    workouts: [...allWorkouts, ...state.workouts],
                })),

            createWorkout: (workout) =>
                set((state) => ({
                    workouts: [workout, ...state.workouts]
                })),
            deleteWorkout: (workout) =>
                set((state) => ({
                    workouts: state.workouts.filter((w) => w.id !== workout.id)
                })),
        })
    )
)