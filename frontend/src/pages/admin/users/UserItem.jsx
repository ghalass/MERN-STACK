import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import UserFormDelete from "./UserFormDelete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../utils/apiRequest";
import toast from "react-hot-toast";
import UserFormUpdate from "./UserFormUpdate";

const UserItem = ({ user }) => {
  const handleDelete = () => {
    mutation.mutate();
  };
  const handleUpdate = () => {
    console.log("update", user);
  };

  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const deleteUser = async () => {
    return await apiRequest(`/user/${user?.id}`, "DELETE");
  };

  // Mutations;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      setShowDelete(false);
      toast.success("Supprimé avec succès.");
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["usersList"] });
    },
  });

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
              onClick={() => setShowDelete(false)}
              variant="outline-success"
              size="sm"
            >
              Annuler
            </Button>
            <Button onClick={handleDelete} variant="outline-danger" size="sm">
              Supprimer
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
