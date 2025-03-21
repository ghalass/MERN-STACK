import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import DisplayComponentRequireRole from "../../../components/DisplayComponentRequireRole";
import useSiteStore from "../../../stores/useSiteStore";

const SiteItem = ({ item }) => {
  const { openEditModal, openDeleteModal, setSelectedSite } = useSiteStore();
  return (
    <>
      <tr>
        <td>{item?.name}</td>
        <td className="text-end">
          {/* ONLY SUPER_ADMIN CAN EDIT OR DELETE AN ADMIN/SUPER_ADMIN */}
          {item?.role === "SUPER_ADMIN" || item?.role === "ADMIN" ? (
            <DisplayComponentRequireRole roles={["SUPER_ADMIN"]}>
              <Dropdown align="end" as={NavItem}>
                <Dropdown.Toggle as={NavLink}>
                  <i className="bi bi-three-dots-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="d-flex justify-content-center gap-2">
                    <i
                      onClick={() => {
                        setSelectedSite(item);
                        openDeleteModal();
                      }}
                      className="bi bi-trash3 btn btn-sm btn-outline-danger rounded-pill "
                    ></i>
                    <i
                      onClick={() => {
                        setSelectedSite(item);
                        openEditModal();
                      }}
                      className="bi bi-pencil btn btn-sm btn-outline-primary rounded-pill "
                    ></i>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </DisplayComponentRequireRole>
          ) : (
            //  {/* ONLY SUPER_ADMIN CAN EDIT OR DELETE ALL ROLES */}
            <DisplayComponentRequireRole roles={["SUPER_ADMIN", "ADMIN"]}>
              <Dropdown align="end" as={NavItem}>
                <Dropdown.Toggle as={NavLink}>
                  <i className="bi bi-three-dots-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="d-flex justify-content-center gap-2">
                    <i
                      onClick={() => {
                        setSelectedSite(item);
                        openDeleteModal();
                      }}
                      className="bi bi-trash3 btn btn-sm btn-outline-danger rounded-pill "
                    ></i>
                    <i
                      onClick={() => {
                        setSelectedSite(item);
                        openEditModal();
                      }}
                      className="bi bi-pencil btn btn-sm btn-outline-primary rounded-pill "
                    ></i>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </DisplayComponentRequireRole>
          )}
        </td>
      </tr>
    </>
  );
};

export default SiteItem;
