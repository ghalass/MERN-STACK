import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Error from "../../../components/forms/Error";
import LoaderSmall from "../../../components/ui/LoaderSmall";
import { USER_TYPE } from "../../../utils/types";
import useUserStore from "../../../stores/useUserStore";
import { updateUserQuery } from "../../../hooks/useUsers";
import { toast } from "react-toastify";

const UserFormUpdate = () => {
  const { selectedUser, setSelectedUser, closeEditModal } = useUserStore();

  const deleteUserMutation = updateUserQuery(closeEditModal);

  const onSubmit = (e) => {
    e.preventDefault();
    const userToUpdate = {
      id: selectedUser.id,
      name: selectedUser.name,
      email: selectedUser.email,
      active: selectedUser.active,
      role: selectedUser.role,
    };
    deleteUserMutation.mutate(userToUpdate, {
      onSuccess: () => {
        closeEditModal();
        toast.success("Modifié avec succès.");
      },
    });
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <FloatingLabel
            controlId="floatingInputName"
            label="Nom d'utilsateur"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Nom d'utilsateur"
              value={selectedUser.name}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, name: e.target.value })
              }
              disabled={deleteUserMutation.isPending}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInputEmail"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
              disabled={deleteUserMutation.isPending}
            />
          </FloatingLabel>

          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label="Active"
            className="mb-3"
            checked={selectedUser.active}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, active: e.target.checked })
            }
            disabled={deleteUserMutation.isPending}
          />

          <FloatingLabel
            controlId="floatingSelect"
            label="Choisir un rôle"
            className="mb-3"
          >
            <Form.Select
              aria-label="Floating label select example"
              disabled={deleteUserMutation.isPending}
              defaultValue={selectedUser.role}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, role: e.target.value })
              }
            >
              <option>Liste des rôles</option>
              {USER_TYPE.map((u_type, index) => (
                <option key={index} value={u_type.value}>
                  {u_type.title}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>

          <div className="d-flex justify-content-end">
            <Button type="submit" variant="outline-primary" size="sm">
              <div className="d-flex gap-1 align-items-center justify-content-end">
                {deleteUserMutation.isPending && <LoaderSmall />}{" "}
                <span>Modifier</span>
              </div>
            </Button>
          </div>
        </Form.Group>

        <Error
          error={
            deleteUserMutation.isError ? deleteUserMutation.error.message : ""
          }
        />
      </Form>
    </div>
  );
};

export default UserFormUpdate;
