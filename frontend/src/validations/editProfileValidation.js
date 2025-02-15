import * as yup from "yup";
import { fr } from "yup-locales";

// Appliquer la localisation française à Yup
yup.setLocale(fr);

export const editProfileSchema = yup.object().shape({
    email: yup.string().email("Email invalide").required("L'email est requis"),
    password: yup.string().min(6, "Minimum 6 caractères").required("Le mot de passe est requis"),
});
