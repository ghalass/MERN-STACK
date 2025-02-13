import { apiRequest } from "../../utils/apiRequest";

import * as yup from "yup";
import { fr } from "yup-locales";

// Appliquer la localisation française à Yup
yup.setLocale(fr);

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { closeModal } from "../../utils/modal";

import toast from "react-hot-toast";
import FormInput from "../forms/FormInput";
import Error from "../forms/Error";
import { useState } from "react";
import useAuthStore from "../../store/authStore";

const newPasswordSchema = yup.object().shape({
  oldPassword: yup.string().min(6).required().label("Mot de passe actuel"),
  newPassword: yup
    .string()
    .min(6)
    .required()
    // .oneOf(
    //   [yup.ref("oldPassword"), null],
    //   "Les mots de passe doivent correspondre"
    // )

    .label("Nouveau mot de passe"),
});

const ProfileChangePasswordModal = ({ userData }) => {
  const [isLoading, setIsLoading] = useState(false);

  const user = useAuthStore((state) => state.user);

  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newPasswordSchema),
    defaultValues: {
      newPassword: "",
      oldPassword: "",
    },
  });

  const onSubmit = async (data) => {
    const newData = {
      email: userData?.email,
      newPassword: data?.newPassword,
      oldPassword: data?.oldPassword,
    };
    setIsLoading(true);
    try {
      await apiRequest(`/user/changePassword`, "POST", newData, user?.token);
      closeModal("userProfileChangePassword");
      reset();
      toast.success("Mot de passe changé avec succès!");
    } catch (err) {
      setError(err.error);
      console.error("Erreur lors changement de mot de passe :", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="userProfileChangePassword"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="userProfileChangePasswordLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="userProfileChangePasswordLabel"
              >
                Changer votre mot de passe
              </h1>
              <button
                onClick={() => {
                  closeModal("userProfileChangePassword");
                  reset();
                }}
                disabled={isLoading}
                type="button"
                className="btn-close"
                // data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <FormInput
                type="password"
                id="oldPassword"
                label="Mot de passe actuel"
                placeholder="Mot de passe actuel"
                register={register}
                errors={errors}
              />

              <FormInput
                type="password"
                id="newPassword"
                label="Nouveau mot de passe"
                placeholder="Nouveau mot de passe"
                register={register}
                errors={errors}
              />

              <Error error={error} />
            </div>

            <div className="modal-footer">
              <button
                onClick={() => {
                  closeModal("userProfileChangePassword");
                  reset();
                  setError(null);
                }}
                disabled={isLoading}
                type="button"
                className="btn btn-sm btn-outline-secondary"
                // data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={isLoading}
                type="submit"
                className="btn btn-sm btn-outline-danger"
              >
                <div className="d-flex justify-content-center align-items-center gap-2">
                  {isLoading && (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                  <div>
                    Modifier <i className="bi bi-upload"></i>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileChangePasswordModal;
