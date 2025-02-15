import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Import du schéma de validation et de l'API utilitaire
import { workoutSchema } from "../../utils/workoutValidation";

// GLOBAL STATES
import { useWorkoutsStore } from "../../store/workoutStore";

// COMPONENTS
import Error from "../forms/Error";
import FormInput from "../../components/forms/FormInput";
import SubmitButton from "../forms/SubmitButton";
import { useWorkout } from "../../hooks/useWorkout";

const WorkoutForm = () => {
  const selectedWorkout = useWorkoutsStore((state) => state.selectedWorkout);

  const op = useWorkoutsStore((state) => state.op);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(workoutSchema),
    defaultValues: {
      id: selectedWorkout?.id || 0,
      title: selectedWorkout?.title || "",
      load: selectedWorkout?.load || 0,
      reps: selectedWorkout?.reps || 0,
    },
  });

  // Custom hook
  const { error, setError, isProcessing, goWorkout } = useWorkout({ reset });

  useEffect(() => {
    reset({
      id: selectedWorkout?.id || 0,
      title: selectedWorkout?.title || "",
      load: selectedWorkout?.load || 0,
      reps: selectedWorkout?.reps || 0,
    });
    setError(null);
  }, [selectedWorkout, reset, setError]);

  const onSubmit = async (data) => {
    await goWorkout(data);
  };

  return (
    <div>
      {/* ADD Or UPDATE */}
      {(op === "add" || op === "update") && (
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
      )}

      {/* DELETE */}
      {op === "delete" && (
        <div>
          <h5 className="text-danger">
            <i className="bi bi-exclamation-triangle"></i> Voulez-vous vraiment
            <span className="badge rounded-pill text-bg-danger mx-1 ">
              Supprimer
            </span>
            ce Workout ?
          </h5>
          <div className="text-primary text-center mt-4">
            <strong>{selectedWorkout?.title}</strong>
          </div>

          <SubmitButton
            onClick={onSubmit}
            isProcessing={isProcessing}
            operation={op}
          />
        </div>
      )}

      {op === "infos" && (
        <div>
          <small className="fst-italic">Title</small>
          <h6>{selectedWorkout.title}</h6>

          <small className="fst-italic">Load</small>
          <h6>{selectedWorkout.load}</h6>

          <small className="fst-italic">Reps</small>
          <h6>{selectedWorkout.reps}</h6>
        </div>
      )}

      {/* ERRORS FROM SERVER */}
      <Error error={error} />
    </div>
  );
};

export default WorkoutForm;
