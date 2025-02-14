import { useState, useEffect, Suspense } from "react";
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
import { closeModal } from "../../utils/modal";

const WorkoutForm = () => {
  const createWorkout = useWorkoutsStore((state) => state.createWorkout);
  const updateWorkout = useWorkoutsStore((state) => state.updateWorkout);
  const deleteWorkout = useWorkoutsStore((state) => state.deleteWorkout);
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
    if (!user) {
      setIsProcessing(false);
      toast.error("Vous devez être connecté !");
      return;
    }

    try {
      setIsProcessing(true);
      // CREATE
      if (op === "add") {
        // create
        const response = await apiRequest(
          "/workouts",
          "POST",
          data,
          user?.token
        );
        // check if no error
        if (!response?.error) {
          createWorkout(response);
          toast.success("Ajouté avec succès !");
        } else {
          setError(response?.error);
          return;
        }
      } else if (op === "update") {
        // UPDATE
        const response = await apiRequest(
          `/workouts/${data.id}`,
          "PATCH",
          data,
          user.token
        );

        // check if no error
        if (!response?.error) {
          updateWorkout(response);
          toast.success("Modifié avec succès !");
        } else {
          setError(response?.error);
          return;
        }
      } else if (op === "delete") {
        const response = await apiRequest(
          `/workouts/${currentWorkout.id}`,
          "DELETE",
          null,
          user.token
        );
        // check if no error
        if (!response?.error) {
          deleteWorkout(response);
          toast.success("Supprimé avec succès !");
        } else {
          setError(response?.error);
          return;
        }
      } else {
        toast.error("Aucune opération n'est choisie !");
      }

      setError(null);
      setOp(null);
      reset();
      closeModal("workoutModal");
    } catch (error) {
      console.log(error);
      setError(error.error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      {op !== "delete" ? (
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
        </form>
      ) : (
        <div>
          <h5 className="text-danger">
            <i className="bi bi-exclamation-triangle"></i> Voulez-vous vraiment
            <span className="badge rounded-pill text-bg-danger mx-1 ">
              Supprimer
            </span>
            ce Workout ?
          </h5>
          <div className="text-primary text-center mt-4">
            <strong>{currentWorkout?.title}</strong>
          </div>

          <SubmitButton
            onClick={onSubmit}
            isProcessing={isProcessing}
            operation={op}
          />
        </div>
      )}

      {/* ERRORS FROM SERVER */}
      <Error error={error} />
    </div>
  );
};

export default WorkoutForm;
