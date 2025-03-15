import { openModal } from "../../utils/modal";
import ProfileChangePasswordModal from "../../components/profile/ProfileChangePasswordModal";
import { getUserRole } from "../../utils/func";
import { useAuth } from "../../context/Auth";

const ProfileInfos = () => {
  const auth = useAuth();

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
              <strong className="text-uppercase">{auth?.user?.name}</strong>
            </div>
          </div>

          <div className="">
            <p className="mb-1 fst-italic"> {auth?.user?.email}</p>
            <hr className="py-0 my-0 w-50 m-auto text-primary" />
          </div>

          <div className="">
            <p className="mb-1 fst-italic">{getUserRole(auth?.user)}</p>
            <hr className="py-0 my-0 w-50 m-auto text-primary" />
          </div>
        </div>
      </div>

      <ProfileChangePasswordModal />
    </>
  );
};

export default ProfileInfos;
