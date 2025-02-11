import { useState } from "react";
import { API } from "../../utils/constants";
import { useWorkoutsStore } from "../../store/workoutStore";
import Error from "../Error";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { fr } from "yup-locales";
yup.setLocale(fr);

// 🏋️‍♂️ Schéma de validation avec Yup
const workoutSchema = yup.object().shape({
  title: yup.string().min(2).required(),
  load: yup
    .number()
    .typeError("Load doit être un nombre")
    .positive()
    .integer()
    .required(),
  reps: yup
    .number()
    .typeError("Reps doit être un nombre")
    .positive()
    .integer()
    .required(),
});

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

  const onSubmit = async (data) => {
    if (!user) {
      toast.error("Vous devez être connecté !");
      return;
    }

    try {
      const response = await fetch(`${API}/workouts`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        if (json.emptyFields) {
          setEmptyFields(json.emptyFields);
        }

        // toast.error(json.error || "Une erreur est survenue");
      } else {
        reset(); // Réinitialise le formulaire après succès
        createWorkout(json);
        setError(null);
        setEmptyFields([]);
        toast.success("Ajouté avec succès !");
      }
    } catch (error) {
      setError(error);
      // toast.error("Erreur lors de la connexion au serveur.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className="badge rounded-pill text-bg-light">
          <h6>Ajouter un nouveau workout</h6>
        </span>

        <div className="form-floating mb-2">
          <input
            type="text"
            className={`form-control ${
              emptyFields.includes("title") ? "is-invalid" : ""
            } ${errors.title ? "is-invalid" : ""}`}
            id="title"
            placeholder="title"
            {...register("title")}
          />
          <label htmlFor="title">Title</label>
          {errors.title && (
            <div className="invalid-feedback">{errors.title.message}</div>
          )}
        </div>

        <div className="form-floating mb-2">
          <input
            type="number"
            className={`form-control ${
              emptyFields.includes("load") ? "is-invalid" : ""
            } ${errors.load ? "is-invalid" : ""}`}
            id="load"
            placeholder="load"
            {...register("load")}
          />
          <label htmlFor="load">Load</label>
          {errors.load && (
            <div className="invalid-feedback">{errors.load.message}</div>
          )}
        </div>

        <div className="form-floating mb-2">
          <input
            type="number"
            className={`form-control ${
              emptyFields.includes("reps") ? "is-invalid" : ""
            } ${errors.reps ? "is-invalid" : ""}`}
            id="reps"
            placeholder="reps"
            {...register("reps")}
          />
          <label htmlFor="reps">Peps</label>
          {errors.reps && (
            <div className="invalid-feedback">{errors.reps.message}</div>
          )}
        </div>

        <button className="btn btn-outline-primary w-100">Save</button>
        <Error error={error} />
      </form>
    </div>
  );
};

export default WorkoutForm;
