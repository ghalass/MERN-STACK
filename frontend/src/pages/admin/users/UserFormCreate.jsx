import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Error from "../../../components/forms/Error";
import createUserQueryOptions from "../../../queryOptions/user/createUserQueryOptions";
import LoaderSmall from "../../../components/ui/LoaderSmall";

const UserFormCreate = ({ handleClose }) => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    mutationCreate.mutate(newUser);
  };

  const mutationCreate = useMutation(
    createUserQueryOptions(setUser, handleClose)
  );

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
              disabled={mutationCreate.isPending}
            >
              <div className="d-flex gap-1 align-items-center justify-content-end">
                {mutationCreate.isPending && <LoaderSmall />}{" "}
                <span>Ajouter</span>
              </div>
            </Button>
          </div>
        </Form.Group>

        <Error
          error={mutationCreate.isError ? mutationCreate.error.message : ""}
        />
      </Form>
    </>
  );
};

export default UserFormCreate;
