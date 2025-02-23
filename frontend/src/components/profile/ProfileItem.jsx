import { openModal } from "../../utils/modal";
import { useProfileStore } from "../../store/profileStore";
import { getUserRole } from "../../utils/func";
import { formatDateAgo } from "../../utils/func";
import { useProfile } from "../../hooks/useProfile";
import toast from "react-hot-toast";

const ProfileItem = ({ profileItem }) => {
  const setSelectedUser = useProfileStore((state) => state.setSelectedUser);

  const { userCan } = useProfile();

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

  const roleBadge = () => {
    let re = "";
    switch (profileItem?.role) {
      case "ADMIN":
        re = `info`;
        break;

      case "SUPER_ADMIN":
        re = `success`;
        break;

      case "UNASSIGNED":
        re = `danger`;
        break;

      case "USER":
        re = `warning`;
        break;

      default:
        re = `secondary`;
        break;
    }
    return re;
  };

  return (
    <div>
      <div className={`d-flex gap-1 justify-content-between`}>
        <div className="d-flex gap-2">
          <button
            onClick={() => {
              setSelectedUser(profileItem);

              if (userCan(["SUPER_ADMIN", "ADMIN"])) {
                openModal("editProfileInfosModal");
              } else {
                toast.error("Vous n'avez pas l'autorisation.");
              }
            }}
            role="button"
            className={btnCls()}
            disabled={!userCan(["SUPER_ADMIN", "ADMIN"])}
          ></button>

          <div className="d-flex gap-1">
            <span className="text-uppercase">{profileItem?.name}</span>
            <span className="fst-italic">({profileItem?.email})</span>
          </div>
        </div>

        <div className="fst-italic d-flex justify-content-end gap-3">
          <div>
            <span className={`badge rounded-pill text-bg-${roleBadge()}`}>
              {getUserRole(profileItem)}
            </span>
          </div>
        </div>
      </div>

      <div className="d-flex gap-2 fst-italic">
        <i
          className={`bi bi-toggle-${
            profileItem?.active ? "on" : "off"
          }  ms-1 text-${profileItem?.active ? "primary" : "secondary"}`}
        ></i>

        <div className="d-flex justify-content-between gap-2">
          <i
            className={`bi bi-${
              profileItem?.lastVisite
                ? "wifi text-success"
                : "wifi-off text-danger"
            }`}
          ></i>
          {profileItem?.lastVisite
            ? formatDateAgo(profileItem?.lastVisite)
            : "Jamais"}{" "}
          |{" "}
          <i
            className="bi bi-plus-circle-dotted text-success
"
          ></i>{" "}
          {profileItem?.createdAt && formatDateAgo(profileItem?.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default ProfileItem;
