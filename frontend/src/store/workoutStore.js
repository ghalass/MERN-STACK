import { create } from "zustand";
// import { devtools } from "zustand/middleware"

export const useWorkoutsStore = create((set, get) => ({
    workouts: [],
    isLoading: false,

    setIsLoading: (newVal) => {
        set(() => ({ isLoading: newVal }));
    },

    setWorkouts: (newWorkouts) => {
        // console.log("Mise à jour du store Zustand:", newWorkouts);
        set(() => ({ workouts: newWorkouts }));
    },

    // Ajoute un workout au début de la liste
    createWorkout: (workout) => {
        // console.log("Ajout d'un nouveau workout:", workout);
        set((state) => ({
            workouts: [workout, ...state.workouts],
        }));
    },

    // Supprime un workout en fonction de son ID
    deleteWorkout: (workout) => {
        // console.log("Suppression du workout:", workout);
        set((state) => ({
            workouts: state.workouts.filter((w) => w.id !== workout.id),
        }));
    },
}));