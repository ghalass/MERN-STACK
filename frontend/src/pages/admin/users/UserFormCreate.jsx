import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Error from "../../../components/forms/Error";
import LoaderSmall from "../../../components/ui/LoaderSmall";
import useUserStore from "../../../stores/useUserStore";
import { createUserQuery } from "../../../hooks/useUsers";

const UserFormCreate = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const { closeCreateModal } = useUserStore();

  const createUserMutation = createUserQuery();

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    createUserMutation.mutate(newUser, {
      onSuccess: () => {
        setUser({ name: "", email: "", password: "" });
        closeCreateModal();
        toast.success("Ajouté avec succès.");
      },
    });
  };

  return (
    <>
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
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
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
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInputPassword"
            label="Mot de passe"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </FloatingLabel>

          <div className="d-flex justify-content-end">
            <Button
              type="submit"
              variant="outline-primary"
              size="sm"
              disabled={createUserMutation.isPending}
            >
              <div className="d-flex gap-1 align-items-center justify-content-end">
                {createUserMutation.isPending && <LoaderSmall />}{" "}
                <span>Ajouter</span>
              </div>
            </Button>
          </div>
        </Form.Group>

        <Error
          error={
            createUserMutation.isError ? createUserMutation.error.message : ""
          }
        />
      </Form>
    </>
  );
};

export default UserFormCreate;
