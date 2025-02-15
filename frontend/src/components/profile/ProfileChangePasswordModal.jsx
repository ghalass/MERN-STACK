import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { closeModal } from "../../utils/modal";

import { newPasswordSchema } from "../../validations/changePasswordValidation";

// COMPONENTS
import Error from "../forms/Error";
import SubmitButton from "../../components/forms/SubmitButton";
import FormInput from "../forms/FormInput";

import { useProfile } from "../../hooks/useProfile";

const ProfileChangePasswordModal = () => {
  const { error, setError, isLoading, userProfile, chagePassword } =
    useProfile();

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
      email: userProfile?.email,
      newPassword: data?.newPassword,
      oldPassword: data?.oldPassword,
    };

    await chagePassword(newData);
  };

  useEffect(() => {
    setError(null);
    reset();
  }, []);

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
