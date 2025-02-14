import { closeModal } from "../../utils/modal";

const EditUserInfos = ({ selectedUser }) => {
  return (
    <div
      className="modal fade"
      id="editUserInfosModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="editUserInfosModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <form
        // onSubmit={handleSubmit(onSubmit)}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editUserInfosModalLabel">
                Données d'un utilisateur
              </h1>
              <button
                onClick={() => {
                  closeModal("editUserInfosModal");
                  // reset();
                  // setError(null);
                }}
                // disabled={isLoading}
                type="button"
                className="btn-close"
                // data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Nom</p>
              <h6>{selectedUser?.name}</h6>
              body
              {/* <FormInput
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

              <Error error={error} /> */}
            </div>

            <div className="modal-footer">
              footer
              {/* <SubmitButton
                disabled={isLoading}
                type="submit"
                isProcessing={isLoading}
                text="Modifier"
                operation={"non"}
                icon="bi bi-upload"
                cls="danger"
                fullWidth={false}
              /> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserInfos;
