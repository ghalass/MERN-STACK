import { lazy } from "react";
import { closeModal } from "../../utils/modal";

// COMPONENTS
const ProfileForm = lazy(() => import("../profile/ProfileForm"));
const ProfileModal = () => {
  return (
    <div
      className="modal fade"
      id="editProfileInfosModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="editProfileInfosModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="editProfileInfosModalLabel">
              Profile Informations
            </h1>

            {/* BTN CLOSE */}
            <button
              onClick={() => {
                closeModal("editProfileInfosModal");
              }}
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>

          {/* BODY START */}
          <div className="modal-body">
            <ProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
