import { openModal } from "../../utils/modal";
import { useProfileStore } from "../../store/profileStore";

const ProfileItem = ({ profileItem }) => {
  const setSelectedUser = useProfileStore((state) => state.setSelectedUser);

  // LOCAL VARS
  const btnClsPartOne = "btn btn-sm bi rounded-pill ";
  const btnClsPartTwo = "btn-outline";

  const btnCls = () => {
    let re = "";
    switch (profileItem?.role) {
      case "ADMIN":
        re = `${btnClsPartOne} bi-person-check-fill ${btnClsPartTwo}-info`;
        break;

      case "SUPER_ADMIN":
        re = `${btnClsPartOne} bi-person-gear ${btnClsPartTwo}-success`;
        break;

      case "UNASSIGNED":
        re = `${btnClsPartOne} bi-person-x ${btnClsPartTwo}-danger`;
        break;

      case "USER":
        re = `${btnClsPartOne} bi-person ${btnClsPartTwo}-warning`;
        break;

      default:
        re = `${btnClsPartOne} bi-person ${btnClsPartTwo}-secondary`;
        break;
    }
    return re;
  };

  const role = () => {
    let re = "";
    switch (profileItem?.role) {
      case "ADMIN":
        re = `Administrateur`;
        break;

      case "SUPER_ADMIN":
        re = `Super Administrateur`;
        break;

      case "USER":
        re = `Utilisateur`;
        break;

      case "USER":
        re = `Visiteur`;
        break;

      default:
        re = `Visiteur`;
        break;
    }
    return re;
  };

  return (
    <div className={`d-flex gap-1 justify-content-between`}>
      <div className="d-flex gap-2">
        <i
          onClick={() => {
            setSelectedUser(profileItem);
            openModal("editProfileInfosModal");
          }}
          role="button"
          className={btnCls()}
        ></i>

        <span>{profileItem?.name}</span>
      </div>

      <div className="fst-italic d-flex gap-3">
        <span className="">{role()}</span>

        <i
          className={`bi bi-toggle-${
            profileItem?.active ? "on" : "off"
          }  ms-1 text-${profileItem?.active ? "primary" : "secondary"}`}
        ></i>
      </div>
    </div>
  );
};

export default ProfileItem;
