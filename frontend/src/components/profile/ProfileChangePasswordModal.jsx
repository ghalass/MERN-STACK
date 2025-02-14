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
import { useState } from "react";
import useAuthStore from "../../store/authStore";

// COMPONENTS
import Error from "../forms/Error";
import SubmitButton from "../../components/forms/SubmitButton";

const newPasswordSchema = yup.object().shape({
  oldPassword: yup.string().min(6).required().label("Mot de passe actuel"),
  newPassword: yup.string().min(6).required().label("Nouveau mot de passe"),
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
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setError("Mot de passe de confirmation n'est identique au nouveau.");
      return;
    }
    const newData = {
      email: userData?.email,
      newPassword: data?.newPassword,
      oldPassword: data?.oldPassword,
    };
    try {
      setIsLoading(true);
      const response = await apiRequest(
        `/user/changePassword`,
        "POST",
        newData,
        user?.token
      );

      if (!response?.error) {
        toast.success("Mot de passe modifié avec succès !");
        closeModal("userProfileChangePassword");
        reset();
      } else {
        setError(response?.error);
        return;
      }
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
                  setError(null);
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

              <FormInput
                type="password"
                id="confirmPassword"
                label="Confirmer le nouveau mot de passe"
                placeholder="Confirmer le nouveau mot de passe"
                register={register}
                errors={errors}
              />

              <Error error={error} />
            </div>

            <div className="modal-footer">
              <SubmitButton
                disabled={isLoading}
                type="submit"
                isProcessing={isLoading}
                text="Modifier"
                operation={"non"}
                icon="bi bi-upload"
                cls="danger"
                fullWidth={false}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileChangePasswordModal;
