import * as yup from "yup";
import { fr } from "yup-locales";

// Appliquer la localisation française à Yup
yup.setLocale(fr);

// 🏋️‍♂️ Schéma de validation pour le formulaire Workout
export const workoutSchema = yup.object().shape({
    id: yup.number().optional(),
    title: yup.string().min(2).required().label("Nom de Workout"),
    load: yup
        .number()
        .typeError("Load doit être un nombre")
        .positive()
        .integer()
        .required()
        .label("Charge (kg)"),
    reps: yup
        .number()
        .typeError("Reps doit être un nombre")
        .positive()
        .integer()
        .required()
        .label("Répétitions"),
});
