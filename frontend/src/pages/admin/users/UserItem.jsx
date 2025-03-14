import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";

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
        <td>{user?.role?.replace("_", " ")}</td>
        <td className="text-center">
          {user?.active ? (
            <i className="bi bi-toggle2-on text-success"></i>
          ) : (
            <i className="bi bi-toggle2-off text-danger"></i>
          )}
        </td>
        <td className="text-end">
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
                  className="bi bi-pencil btn btn-sm btn-outline-success rounded-pill "
                ></i>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    </>
  );
};

export default UserItem;
