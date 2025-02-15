import * as yup from "yup";
import { fr } from "yup-locales";

// Appliquer la localisation française à Yup
yup.setLocale(fr);

// Appliquer la localisation française à Yup
yup.setLocale(fr);


export const newPasswordSchema = yup.object().shape({
    oldPassword: yup.string().min(6).required().label("Mot de passe actuel"),
    newPassword: yup.string().min(6).required().label("Nouveau mot de passe"),
});