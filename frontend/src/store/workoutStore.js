import { create } from "zustand";

export const useWorkoutsStore = create((set, get) => ({
    workouts: [],
    isLoading: false,
    currentWorkout: null,
    op: null,

    setOp: (newVal) => {
        set(() => ({ op: newVal }));
    },

    setIsLoading: (newVal) => {
        set(() => ({ isLoading: newVal }));
    },

    setCurrentWorkout: (newVal) => {
        set(() => ({ currentWorkout: newVal }));
    },

    setWorkouts: (newWorkouts) => {
        set(() => ({ workouts: newWorkouts }));
    },

    // ✅ Ajoute un workout
    createWorkout: (workout) => {
        set((state) => ({
            workouts: [workout, ...state.workouts],
        }));
    },

    // ✅ Supprime un workout
    deleteWorkout: (workout) => {
        set((state) => ({
            workouts: state.workouts.filter((w) => w.id !== workout.id),
        }));
    },

    // ✅ Met à jour un workout existant
    updateWorkout: (updatedWorkout) => {
        set((state) => ({
            workouts: state.workouts.map((workout) =>
                workout.id === updatedWorkout.id ? { ...workout, ...updatedWorkout } : workout
            ),
        }));
    },
}));
