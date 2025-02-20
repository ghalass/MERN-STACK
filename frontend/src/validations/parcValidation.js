import * as yup from "yup";
import { fr } from "yup-locales";

// Appliquer la localisation française à Yup
yup.setLocale(fr);

// Appliquer la localisation française à Yup
yup.setLocale(fr);


export const parcValidation = yup.object().shape({
    name: yup.string().min(2).required().label("Nom du parc"),
});