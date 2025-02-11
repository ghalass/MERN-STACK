import { useState } from "react";
import { useWorkoutsStore } from "../../store/workoutStore";
import Error from "../Error";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Import du schéma de validation et de l'API utilitaire
import { workoutSchema } from "../../utils/workoutValidation";
import { apiRequest } from "../../utils/apiRequest";

import FormInput from "../../components/forms/FormInput";
import SubmitBtn from "../../components/forms/SubmitBtn";

const WorkoutForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(workoutSchema),
  });

  const createWorkout = useWorkoutsStore((state) => state.createWorkout);
  const user = useAuthStore((state) => state.user);

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    if (!user) {
      toast.error("Vous devez être connecté !");
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiRequest("/workouts", "POST", data, user.token);
      reset(); // Réinitialise le formulaire après succès
      createWorkout(response);
      setError(null);
      setEmptyFields([]);
      toast.success("Ajouté avec succès !");
    } catch (error) {
      setError(error.error);
      if (error.emptyFields) {
        setEmptyFields(error.emptyFields);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="badge rounded-pill text-bg-light text-primary mb-2">
          <span className="h6">Ajouter un nouveau workout</span>
        </div>

        <FormInput
          type="text"
          id="title"
          label="Title"
          placeholder="title"
          register={register}
          errors={errors}
        />

        <FormInput
          type="number"
          id="load"
          label="Load"
          placeholder="load"
          register={register}
          errors={errors}
        />

        <FormInput
          type="number"
          id="reps"
          label="Reps"
          placeholder="reps"
          register={register}
          errors={errors}
        />

        <SubmitBtn isLoading={isLoading} text={"Ajouter"} />
        <Error error={error} />
      </form>
    </div>
  );
};

export default WorkoutForm;
