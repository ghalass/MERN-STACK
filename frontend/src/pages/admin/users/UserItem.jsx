import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import DisplayComponentRequireRole from "../../../components/DisplayComponentRequireRole";

const UserItem = ({
  user,
  setSelectedUser,
  handleShowEditModal,
  handleShowDeleteModal,
}) => {
  return (
    <>
      <tr>
        <td>{user?.id}</td>
        <td>{user?.name}</td>
        <td>{user?.email}</td>
        <td className="d-none d-md-block">{user?.role?.replace("_", " ")}</td>
        <td className="text-center">
          {user?.active ? (
            <i className="bi bi-toggle2-on text-primary"></i>
          ) : (
            <i className="bi bi-toggle2-off text-secondary"></i>
          )}
        </td>
        <td className="text-end">
          {user?.role === "SUPER_ADMIN" || user?.role === "ADMIN" ? (
            <DisplayComponentRequireRole roles={["SUPER_ADMIN"]}>
              <Dropdown align="end" as={NavItem}>
                <Dropdown.Toggle as={NavLink}>
                  <i className="bi bi-three-dots-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="d-flex justify-content-center gap-2">
                    <i
                      onClick={() => {
                        setSelectedUser(user);
                        handleShowDeleteModal(true);
                      }}
                      className="bi bi-trash3 btn btn-sm btn-outline-danger rounded-pill "
                    ></i>
                    <i
                      onClick={() => {
                        setSelectedUser(user);
                        handleShowEditModal(true);
                      }}
                      className="bi bi-pencil btn btn-sm btn-outline-primary rounded-pill "
                    ></i>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </DisplayComponentRequireRole>
          ) : (
            <DisplayComponentRequireRole roles={["SUPER_ADMIN", "ADMIN"]}>
              <Dropdown align="end" as={NavItem}>
                <Dropdown.Toggle as={NavLink}>
                  <i className="bi bi-three-dots-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="d-flex justify-content-center gap-2">
                    <i
                      onClick={() => {
                        setSelectedUser(user);
                        handleShowDeleteModal(true);
                      }}
                      className="bi bi-trash3 btn btn-sm btn-outline-danger rounded-pill "
                    ></i>
                    <i
                      onClick={() => {
                        setSelectedUser(user);
                        handleShowEditModal(true);
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

export default UserItem;
