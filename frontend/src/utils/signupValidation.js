import * as yup from "yup";

export const signupSchema = yup.object().shape({
    name: yup.string().required("Le nom est requis"),
    email: yup.string().email("Email invalide").required("L'email est requis"),
    password: yup.string().min(6, "Minimum 6 caractères").required("Le mot de passe est requis"),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Les mots de passe doivent correspondre")
        .required("La confirmation du mot de passe est requise"),
});
