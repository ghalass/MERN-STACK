import { useState, useEffect } from "react";
import { useWorkoutsStore } from "../../store/workoutStore";
import Error from "../forms/Error";
import useAuthStore from "../../store/authStore";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Import du schéma de validation et de l'API utilitaire
import { workoutSchema } from "../../utils/workoutValidation";
import { apiRequest } from "../../utils/apiRequest";

import FormInput from "../../components/forms/FormInput";
import SubmitButton from "../../components/forms/SubmitButton";

const WorkoutForm = ({ operation, setOperation }) => {
  const createWorkout = useWorkoutsStore((state) => state.createWorkout);
  const updateWorkout = useWorkoutsStore((state) => state.updateWorkout);
  const currentWorkout = useWorkoutsStore((state) => state.currentWorkout);
  const user = useAuthStore((state) => state.user);

  const setCurrentWorkout = useWorkoutsStore(
    (state) => state.setCurrentWorkout
  );

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🛠️ Ajout de `defaultValues` pour préremplir les inputs
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(workoutSchema),
    defaultValues: {
      id: currentWorkout?.id || 0, // 🟢 Valeur par défaut pour `id`
      title: currentWorkout?.title || "", // 🟢 Valeur par défaut pour `title`
      load: currentWorkout?.load || 0, // 🟢 Valeur par défaut pour `load`
      reps: currentWorkout?.reps || 0, // 🟢 Valeur par défaut pour `reps`
    },
  });

  // 🔄 Mettre à jour les valeurs par défaut si `currentWorkout` change
  useEffect(() => {
    reset({
      id: currentWorkout?.id || 0, // 🟢 Valeur par défaut pour `id`
      title: currentWorkout?.title || "",
      load: currentWorkout?.load || 0,
      reps: currentWorkout?.reps || 0,
    });
  }, [currentWorkout, reset]);

  useEffect(() => {
    reset({
      id: 0,
      title: "",
      load: 0,
      reps: 0,
    });
  }, []);

  const onSubmit = async (data) => {
    if (!user) {
      toast.error("Vous devez être connecté !");
      return;
    }

    setIsLoading(true);

    try {
      // CREATE
      if (data.id === 0) {
        // create
        const response = await apiRequest(
          "/workouts",
          "POST",
          data,
          user.token
        );
        createWorkout(response);
        toast.success("Ajouté avec succès !");
        reset();
        setError(null);
      } else {
        // UPDATE
        const response = await apiRequest(
          `/workouts/${data.id}`,
          "PATCH",
          data,
          user.token
        );
        updateWorkout(response);
        toast.success("Modifié avec succès !");
        reset({
          id: 0,
          title: "",
          load: 0,
          reps: 0,
        });
        setError(null);
      }
    } catch (error) {
      setError(error.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex justify-content-between">
        <div className="badge rounded-pill text-bg-light text-primary mb-2">
          <span className="h6">Ajouter un nouveau workout</span>
        </div>

        <div>
          <i
            onClick={() => {
              setCurrentWorkout({ id: 0, title: "", load: 0, reps: 0 });
              setOperation("add");
            }}
            role="button"
            className="bi bi-plus-lg btn btn-sm btn-outline-primary rounded-pill"
          ></i>
        </div>
      </div>

      {/* 🟢 Inputs avec les valeurs par défaut */}
      <FormInput
        type="number"
        id="id"
        label="Id"
        placeholder="Id"
        register={register}
        disabled={true}
        hidden
      />

      <FormInput
        type="text"
        id="title"
        label="Title"
        placeholder="Title"
        register={register}
        errors={errors}
      />

      <FormInput
        type="number"
        id="load"
        label="Load (kg)"
        placeholder="Load"
        register={register}
        errors={errors}
      />

      <FormInput
        type="number"
        id="reps"
        label="Reps"
        placeholder="Reps"
        register={register}
        errors={errors}
      />

      <SubmitButton isProcessing={isLoading} operation={operation} />
      <Error error={error} />
    </form>
  );
};

export default WorkoutForm;
