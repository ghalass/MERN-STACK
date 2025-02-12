import { openModal } from "../../utils/utils";

const ProfileInfos = ({ userData }) => {
  return (
    <div>
      <div className="card">
        <div className="card-body text-center">
          <div className="d-flex justify-content-end">
            <button
              onClick={() => openModal("userProfileChangePassword")}
              className="btn btn-sm btn-outline-danger rounded rounded-circle"
            >
              <i className="bi bi-key"></i>
            </button>
          </div>
          <div className=" text-primary mb-2">
            <img
              className="border border-2 rounded-circle border-secondary-subtle "
              src="icons8-user-100.png"
              alt="user img"
            />
            <div className="">
              <div>Welcome</div>
              <strong className="text-uppercase">{userData?.name}</strong>
            </div>
          </div>

          <div className="mt-2">
            <strong>Email</strong>
            <hr className="py-0 my-0 w-50 m-auto text-primary" />
            <p className="mb-1 fst-italic"> {userData?.email}</p>
          </div>

          <div className="mt-2">
            <strong>Rôle</strong>
            <hr className="py-0 my-0 w-50 m-auto text-primary" />
            <p className="mb-1 fst-italic">
              {userData?.role ?? (
                <span className="text-secondary">Non défini</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfos;
