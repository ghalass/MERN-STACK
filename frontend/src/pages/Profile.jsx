import { useEffect, useState } from "react";
import { apiRequest } from "../utils/apiRequest";
import useAuthStore from "../store/authStore";

// components
import ProfileInfos from "../components/profile/ProfileInfos";
import ProfileChangePasswordModal from "../components/profile/ProfileChangePasswordModal";
import { openModal } from "../utils/modal";
import EditUserInfos from "../components/profile/EditUserInfos";

const Profile = () => {
  const user = useAuthStore((state) => state.user);

  const [userData, setUserData] = useState(null);
  const [usersList, setUsersList] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await apiRequest(
          `/user/getByEmail`,
          "POST",
          { email: user?.email },
          user?.token
        );
        setUserData(data);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      } finally {
        //
      }
    };

    const getAllUsers = async () => {
      try {
        const data = await apiRequest(`/user/users`, "GET", null, user?.token);
        if (!data?.error) setUsersList(data);
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs :", error);
      } finally {
        //
      }
      if (user?.role === "SUPER_ADMIN" || user?.role === "ADMIN") getAllUsers();
    };

    if (user) {
      getUser();
      getAllUsers();
    }
  }, [user]);

  return (
    <div className="mt-2 row">
      <div className="col-12 col-md-4">
        <ProfileInfos userData={userData} />
      </div>

      <div className="col-12 col-md-8 ">
        {/* ONLY FOR AMDMINS  */}
        {usersList && (
          <div className="list-group">
            <div
              className="list-group-item list-group-item-action active bg-body-secondary text-secondary"
              aria-current="true"
            >
              <span className="text-primary">Liste des utilisateurs</span>
            </div>
            {usersList.map((u, index) => (
              <div className="list-group-item " key={index}>
                <div className="d-flex justify-content-between">
                  {/*  */}

                  <EditBtn
                    u={u}
                    onClick={() => {
                      setSelectedUser(u);
                      openModal("editUserInfosModal");
                    }}
                  />

                  <div className="fst-italic d-flex gap-3">
                    <span className="">{u.role.replace("_", " ")}</span>

                    {u.active && (
                      <i
                        className="bi bi-toggle-on y ms-1 text-primary"
                        role="button"
                      ></i>
                    )}

                    {!u.active && (
                      <i
                        className="bi bi-toggle-off  ms-1 text-secondary"
                        role="button"
                      ></i>
                    )}
                  </div>
                </div>

                {/*  */}
              </div>
            ))}
          </div>
        )}

        {/*  */}
        {!usersList && (
          <>
            <h5>Gérer votre profile</h5>
          </>
        )}
      </div>

      <ProfileChangePasswordModal userData={userData} />
      <EditUserInfos selectedUser={selectedUser} />
    </div>
  );
};

const EditBtn = ({ u, onClick }) => {
  let icon, cls;
  switch (u.role) {
    case "ADMIN":
      icon = "person-check-fill";
      cls = "info";
      break;

    case "SUPER_ADMIN":
      icon = "person-check-fill";
      cls = "success";
      break;

    case "USER":
      icon = "person";
      cls = "primary";
      break;

    default:
      break;
  }
  return (
    <div className="d-flex gap-1" onClick={onClick}>
      <span className={`btn btn-sm rounded-pill btn-outline-${cls}`}>
        <i className={`bi bi-${icon}`}></i>
      </span>
      <span>{u.name}</span>
    </div>
  );
};

export default Profile;
