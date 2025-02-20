import * as yup from "yup";
import { fr } from "yup-locales";

// Appliquer la localisation française à Yup
yup.setLocale(fr);

// Appliquer la localisation française à Yup
yup.setLocale(fr);


export const enginValidation = yup.object().shape({
    name: yup.string().min(2).required().label("Nom de l'engin"),
    active: yup.string().required().label('Active'),
    parcId: yup.string().required().label('Parc'),
    siteId: yup.string().required().label('Site'),
});