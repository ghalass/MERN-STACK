import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";

const UserItem = ({ user }) => {
  const handleDelete = (user) => {
    console.log("delete", user);
  };
  const handleUpdate = (user) => {
    console.log("update", user);
  };

  return (
    <tr>
      <td>{user?.id}</td>
      <td>{user?.name}</td>
      <td>{user?.email}</td>
      <td>{user?.role}</td>
      <td className="text-end">
        <Dropdown align="end" as={NavItem}>
          <Dropdown.Toggle as={NavLink}>
            <i className="bi bi-three-dots-vertical"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <div className="d-flex justify-content-center gap-2">
              <i
                onClick={() => handleDelete(user)}
                className="bi bi-trash3 btn btn-sm btn-outline-danger rounded-pill "
              ></i>
              <i
                onClick={() => handleUpdate(user)}
                className="bi bi-pencil btn btn-sm btn-outline-success rounded-pill "
              ></i>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
};

export default UserItem;
