import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string().email("Email invalide").required("L'email est requis"),
    password: yup.string().min(6, "Minimum 6 caractères").required("Le mot de passe est requis"),
});
