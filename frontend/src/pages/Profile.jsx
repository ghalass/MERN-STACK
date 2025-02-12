import { useEffect, useState } from "react";
import { apiRequest } from "../utils/apiRequest";
import useAuthStore from "../store/authStore";

// components
import ProfileInfos from "../components/profile/ProfileInfos";
import ProfileChangePasswordModal from "../components/profile/ProfileChangePasswordModal";

const Profile = () => {
  const user = useAuthStore((state) => state.user);

  const [userData, setUserData] = useState(null);

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

    if (user) {
      getUser();
    }
  }, [user]);

  return (
    <div className="mt-2">
      <div className="mx-auto" style={{ width: "300px" }}>
        <ProfileInfos userData={userData} />
      </div>

      <ProfileChangePasswordModal userData={userData} />
    </div>
  );
};

export default Profile;
