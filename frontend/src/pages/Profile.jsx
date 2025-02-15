import { Suspense, useEffect } from "react";
import useAuthStore from "../store/authStore";

// components
import ProfileInfos from "../components/profile/ProfileInfos";
import { useProfile } from "../hooks/useProfile";
import ProfileItem from "../components/profile/ProfileItem";
import LoaderSpinner from "../components/ui/LoaderSpinner";
import ProfileModal from "../components/profile/ProfileModal";

const Profile = () => {
  const user = useAuthStore((state) => state.user);

  const { usersList, getUserProfile, getAllUsers } = useProfile();

  useEffect(() => {
    if (user) {
      getUserProfile();
      getAllUsers();
    }
  }, [user]);

  return (
    <div className="mt-2 row">
      <div className="col-12 col-md-4">
        <ProfileInfos />
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
            <Suspense fallback={<LoaderSpinner />}>
              {usersList.map((u, index) => (
                <div className="list-group-item " key={index}>
                  <ProfileItem profileItem={u} />
                </div>
              ))}
            </Suspense>
          </div>
        )}

        {/*  */}
        {!usersList && (
          <>
            <h5>Gérer votre profile</h5>
          </>
        )}
      </div>

      <ProfileModal />
    </div>
  );
};

export default Profile;
