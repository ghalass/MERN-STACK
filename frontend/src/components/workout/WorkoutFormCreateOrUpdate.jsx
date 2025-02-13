import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Import du schéma de validation et de l'API utilitaire
import { workoutSchema } from "../../utils/workoutValidation";
import { apiRequest } from "../../utils/apiRequest";

// GLOBAL STATES
import useAuthStore from "../../store/authStore";
import { useWorkoutsStore } from "../../store/workoutStore";

// COMPONENTS
import Error from "../forms/Error";
import FormInput from "../../components/forms/FormInput";
import SubmitButton from "../forms/SubmitButton";
import { closeModal } from "../../utils/utils";

const WorkoutFormCreateOrUpdate = () => {
  const createWorkout = useWorkoutsStore((state) => state.createWorkout);
  const updateWorkout = useWorkoutsStore((state) => state.updateWorkout);
  const currentWorkout = useWorkoutsStore((state) => state.currentWorkout);
  const user = useAuthStore((state) => state.user);

  const op = useWorkoutsStore((state) => state.op);
  const setOp = useWorkoutsStore((state) => state.setOp);

  // LOCAL STATES
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(workoutSchema),
    defaultValues: {
      id: currentWorkout?.id || 0,
      title: currentWorkout?.title || "",
      load: currentWorkout?.load || 0,
      reps: currentWorkout?.reps || 0,
    },
  });

  useEffect(() => {
    reset({
      id: currentWorkout?.id || 0,
      title: currentWorkout?.title || "",
      load: currentWorkout?.load || 0,
      reps: currentWorkout?.reps || 0,
    });
  }, [currentWorkout, reset]);

  const onSubmit = async (data) => {
    setIsProcessing(true);
    if (!user) {
      setIsProcessing(false);
      toast.error("Vous devez être connecté !");
      return;
    }

    try {
      // CREATE
      if (op === "add") {
        // create
        const response = await apiRequest(
          "/workouts",
          "POST",
          data,
          user.token
        );
        createWorkout(response);
        toast.success("Ajouté avec succès !");
      } else if (op === "update") {
        // UPDATE
        const response = await apiRequest(
          `/workouts/${data.id}`,
          "PATCH",
          data,
          user.token
        );
        updateWorkout(response);
        toast.success(`Modifié avec succès!`);
      } else {
        toast.error("Aucune opération n'est choisie !");
      }

      setError(null);
      setIsProcessing(false);
      setOp(null);
      reset();
      closeModal("workoutModal");
    } catch (error) {
      setError(error.error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <SubmitButton isProcessing={isProcessing} operation={op} />
        <Error error={error} />
      </form>
    </div>
  );
};

export default WorkoutFormCreateOrUpdate;
