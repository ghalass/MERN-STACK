// import { useState } from "react";
// import { useWorkoutsStore } from "../../store/workoutStore";
// import Error from "../Error";
// import useAuthStore from "../../store/authStore";
// import toast from "react-hot-toast";

// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

// // Import du schéma de validation et de l'API utilitaire
// import { workoutSchema } from "../../utils/workoutValidation";
// import { apiRequest } from "../../utils/apiRequest";

// import FormInput from "../../components/forms/FormInput";
// import SubmitBtn from "../../components/forms/SubmitBtn";

// const WorkoutForm = () => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(workoutSchema),
//   });

//   const createWorkout = useWorkoutsStore((state) => state.createWorkout);
//   const user = useAuthStore((state) => state.user);
//   const currentWorkout = useWorkoutsStore((state) => state.currentWorkout);

//   const [error, setError] = useState(null);
//   const [emptyFields, setEmptyFields] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const onSubmit = async (data) => {
//     if (!user) {
//       toast.error("Vous devez être connecté !");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await apiRequest("/workouts", "POST", data, user.token);
//       reset(); // Réinitialise le formulaire après succès
//       createWorkout(response);
//       setError(null);
//       setEmptyFields([]);
//       toast.success("Ajouté avec succès !");
//     } catch (error) {
//       setError(error.error);
//       if (error.emptyFields) {
//         setEmptyFields(error.emptyFields);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="badge rounded-pill text-bg-light text-primary mb-2">
//           <span className="h6">Ajouter un nouveau workout</span>
//         </div>
//         <FormInput
//           type="text"
//           id="title"
//           label="Title"
//           placeholder="title"
//           register={register}
//           errors={errors}
//         />

//         <FormInput
//           type="number"
//           id="load"
//           label="Load"
//           placeholder="load"
//           register={register}
//           errors={errors}
//         />

//         <FormInput
//           type="number"
//           id="reps"
//           label="Reps"
//           placeholder="reps"
//           register={register}
//           errors={errors}
//         />

//         <SubmitBtn isLoading={isLoading} text={"Ajouter"} />
//         <Error error={error} />
//       </form>
//     </div>
//   );
// };

// export default WorkoutForm;

import { useState, useEffect } from "react";
import { useWorkoutsStore } from "../../store/workoutStore";
import Error from "../Error";
import useAuthStore from "../../store/authStore";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Import du schéma de validation et de l'API utilitaire
import { workoutSchema } from "../../utils/workoutValidation";
import { apiRequest } from "../../utils/apiRequest";

import FormInput from "../../components/forms/FormInput";
import SubmitBtn from "../../components/forms/SubmitBtn";

const WorkoutForm = () => {
  const createWorkout = useWorkoutsStore((state) => state.createWorkout);
  const currentWorkout = useWorkoutsStore((state) => state.currentWorkout);
  const user = useAuthStore((state) => state.user);

  const setCurrentWorkout = useWorkoutsStore(
    (state) => state.setCurrentWorkout
  );

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
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

  const onSubmit = async (data) => {
    if (!user) {
      toast.error("Vous devez être connecté !");
      return;
    }

    setIsLoading(true);

    try {
      if (data.id === 0) {
        // create
        const response = await apiRequest(
          "/workouts",
          "POST",
          data,
          user.token
        );
        reset(); // Réinitialise le formulaire après succès
        createWorkout(response);
        toast.success("Ajouté avec succès !");

        setError(null);
        setEmptyFields([]);
      } else {
        // update
        const response = await apiRequest(
          `/workouts/${data.id}`,
          "PATCH",
          data,
          user.token
        );
        toast.success("Modifié avec succès !");
      }
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
        <div className="d-flex justify-content-between">
          <div className="badge rounded-pill text-bg-light text-primary mb-2">
            <span className="h6">Ajouter un nouveau workout</span>
          </div>

          <div>
            <i
              onClick={() => {
                setCurrentWorkout({ id: 0, title: "", load: 0, reps: 0 });
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

        <SubmitBtn
          isLoading={isLoading}
          text={<OperationType currentWorkout={currentWorkout} />}
        />
        <Error error={error} />
      </form>
    </div>
  );
};

const OperationType = ({ currentWorkout }) => {
  return (
    <>
      {currentWorkout?.id === 0 ? (
        <div>
          <span>Ajouter</span>
          <i className="bi bi-plus-circle ms-2"></i>
        </div>
      ) : (
        <div>
          <span>Modifier</span>
          <i className="bi bi-plus-circle ms-2"></i>
        </div>
      )}
    </>
  );
};

export default WorkoutForm;
