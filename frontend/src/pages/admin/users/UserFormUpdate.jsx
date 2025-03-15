import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import updateUserQueryOptions from "../../../queryOptions/user/updateUserQueryOptions";
import Error from "../../../components/forms/Error";
import LoaderSmall from "../../../components/ui/LoaderSmall";
import { USER_TYPE } from "../../../utils/types";

const UserFormUpdate = ({ currentUser, setSelectedUser, handleClose }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const userToUpdate = {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      active: currentUser.active,
      role: currentUser.role,
    };
    mutationUpdate.mutate(userToUpdate);
  };

  const mutationUpdate = useMutation(updateUserQueryOptions(handleClose));

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
              value={currentUser.name}
              onChange={(e) =>
                setSelectedUser({ ...currentUser, name: e.target.value })
              }
              disabled={mutationUpdate.isPending}
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
              value={currentUser.email}
              onChange={(e) =>
                setSelectedUser({ ...currentUser, email: e.target.value })
              }
              disabled={mutationUpdate.isPending}
            />
          </FloatingLabel>

          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label="Active"
            className="mb-3"
            checked={currentUser.active}
            onChange={(e) =>
              setSelectedUser({ ...currentUser, active: e.target.checked })
            }
            disabled={mutationUpdate.isPending}
          />

          <FloatingLabel
            controlId="floatingSelect"
            label="Choisir un rôle"
            className="mb-3"
          >
            <Form.Select
              aria-label="Floating label select example"
              disabled={mutationUpdate.isPending}
              defaultValue={currentUser.role}
              onChange={(e) =>
                setSelectedUser({ ...currentUser, role: e.target.value })
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
                {mutationUpdate.isPending && <LoaderSmall />}{" "}
                <span>Modifier</span>
              </div>
            </Button>
          </div>
        </Form.Group>

        <Error
          error={mutationUpdate.isError ? mutationUpdate.error.message : ""}
        />
      </Form>
    </div>
  );
};

export default UserFormUpdate;
