import * as yup from "yup";
import { fr } from "yup-locales";

// Appliquer la localisation française à Yup
yup.setLocale(fr);

// Appliquer la localisation française à Yup
yup.setLocale(fr);


export const saisierjeValidation = yup.object().shape({
    enginId: yup
        .number()
        .typeError("Engin est requis") // Si l'utilisateur entre une valeur non numérique
        .required("Engin est requis")
        .label("Engin"),

    hrm: yup
        .number()
        .typeError("HRM doit être un nombre") // Assure qu'on ne peut pas entrer de texte
        .required("HRM est requis")
        .min(0, "HRM doit être supérieur ou égal à 0")
        .max(24, "HRM ne peut pas dépasser 24 heures")
        .label("Heures de marche"),

    date_saisie: yup
        .date()
        .typeError("La date de saisie est invalide") // Si l'utilisateur entre un format incorrect
        .required("La date de saisie est requise")
        .label("Date de saisie"),
});
