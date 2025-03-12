import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../utils/apiRequest";
import toast from "react-hot-toast";
import { API_PATHS } from "../../../utils/apiPaths";

const UserFormUpdate = ({ currentUser }) => {
  const [user, setUser] = useState({
    id: currentUser?.id,
    name: currentUser?.name,
    email: currentUser?.email,
    password: currentUser?.password,
  });

  const updateUser = async (data) => {
    return await apiRequest(API_PATHS.AUTH.UPDATE_USER, "PATCH", data);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
    mutation.mutate(updatedUser);
  };

  // Mutations;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      setUser({ name: "", email: "", password: "" });
      handleClose();
      toast.success("Modifié avec succès.");
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["usersList"] });
    },
  });

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

          <div className="d-flex gap-2 float-end mt-2">
            <Button type="submit" variant="outline-primary" size="sm">
              Modifier
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default UserFormUpdate;
