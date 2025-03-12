import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import UserFormDelete from "./UserFormDelete";
import { useMutation } from "@tanstack/react-query";
import UserFormUpdate from "./UserFormUpdate";
import deleteUserQueryOptions from "../../../queryOptions/user/deleteUserQueryOptions";
import LoaderSmall from "../../../components/ui/LoaderSmall";

const UserItem = ({ user }) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // DELETE
  const handleDelete = () => mutationDelete.mutate(user?.id);
  const mutationDelete = useMutation(deleteUserQueryOptions(setShowDelete));

  // UPDATE
  const handleUpdate = () => {
    console.log("update", user);
  };

  return (
    <>
      <tr>
        <td>{user?.id}</td>
        <td>{user?.name}</td>
        <td>{user?.email}</td>
        <td>{user?.role}</td>
        <td>
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
                  onClick={() => setShowDelete(true)}
                  className="bi bi-trash3 btn btn-sm btn-outline-danger rounded-pill "
                ></i>
                <i
                  onClick={() => setShowUpdate(true)}
                  className="bi bi-pencil btn btn-sm btn-outline-success rounded-pill "
                ></i>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>

      {/* DELETE */}
      <Modal
        show={showDelete}
        onHide={() => setShowDelete(false)}
        backdrop="static"
        keyboard={false}
        id={"modalForDelete"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Supprimer Utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserFormDelete user={user} />
          <div className="d-flex gap-2 float-end mt-2">
            <Button
              disabled={mutationDelete.isPending}
              onClick={() => setShowDelete(false)}
              variant="outline-success"
              size="sm"
            >
              Annuler
            </Button>

            <Button
              disabled={mutationDelete.isPending}
              onClick={handleDelete}
              variant="outline-danger"
              size="sm"
            >
              <div className="d-flex gap-1 align-items-center justify-content-end">
                {mutationDelete.isPending && <LoaderSmall />}{" "}
                <span>Supprimer</span>
              </div>
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* UPDATE */}
      <Modal
        show={showUpdate}
        onHide={() => setShowUpdate(false)}
        backdrop="static"
        keyboard={false}
        id={"modalForUpdate"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifier un utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserFormUpdate currentUser={user} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserItem;
