import { openModal } from "../../utils/modal";
import ProfileChangePasswordModal from "../../components/profile/ProfileChangePasswordModal";
import { useProfileStore } from "../../store/profileStore";
import { formatDateAgo, getUserRole } from "../../utils/func";

const ProfileInfos = () => {
  const userProfile = useProfileStore((state) => state.userProfile);

  return (
    <>
      <div className="card mb-1">
        <div className="card-body text-center">
          <div className="d-flex justify-content-end">
            <button
              onClick={() => openModal("userProfileChangePassword")}
              className="btn btn-sm btn-outline-danger rounded rounded-circle"
            >
              <i className="bi bi-key"></i>
            </button>
          </div>

          <div className=" text-primary">
            <img
              className="border border-2 rounded-circle border-secondary-subtle "
              src="icons8-user-100.png"
              alt="user img"
            />
            <div className="">
              <div>Welcome</div>
              <strong className="text-uppercase">{userProfile?.name}</strong>
            </div>
          </div>

          <div className="">
            <p className="mb-1 fst-italic"> {userProfile?.email}</p>
            <hr className="py-0 my-0 w-50 m-auto text-primary" />
          </div>

          <div className="">
            <p className="mb-1 fst-italic">{getUserRole(userProfile)}</p>
            <hr className="py-0 my-0 w-50 m-auto text-primary" />
          </div>

          <div>
            <i
              className={`me-2 bi bi-${
                userProfile?.lastVisite
                  ? "wifi text-success"
                  : "wifi-off text-danger"
              }`}
            ></i>
            {userProfile?.lastVisite
              ? formatDateAgo(userProfile?.lastVisite)
              : "Jamais"}
            <hr className="py-0 my-0 w-50 m-auto text-primary" />
          </div>

          <div>
            <i
              className="me-2 bi bi-plus-circle-dotted text-success
          "
            ></i>
            {userProfile?.createdAt && formatDateAgo(userProfile?.createdAt)}
            <hr className="py-0 my-0 w-50 m-auto text-primary" />
          </div>

          <div>
            <i
              className={`me-2 bi bi-toggle-${
                userProfile?.active ? "on" : "off"
              }  ms-1 text-${userProfile?.active ? "primary" : "secondary"}`}
            ></i>
            {userProfile?.active ? "Active" : "InActive"}
            <hr className="py-0 my-0 w-50 m-auto text-primary" />
          </div>
        </div>
      </div>

      <ProfileChangePasswordModal />
    </>
  );
};

export default ProfileInfos;
