import { useState } from "react";
import loginQueryOptions from "../../queryOptions/user/loginQueryOptions";
import { useMutation } from "@tanstack/react-query";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// COMPONENTS
import LoaderSmall from "../../components/ui/LoaderSmall";
import Error from "../../components/forms/Error";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "ghalass@gmail.com",
    password: "gh@l@ss@dmin",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({ email: user.email, password: user.password });
  };

  const loginMutation = useMutation(loginQueryOptions());

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card">
        <div className="card-body">
          <Form onSubmit={onSubmit} style={{ width: "400px" }}>
            <h3 className="text-center mb-3">Se connecter</h3>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
                  disabled={loginMutation.isPending}
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
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  disabled={loginMutation.isPending}
                />
              </FloatingLabel>

              <div className="d-flex justify-content-between">
                <div className="d-flex gap-2">
                  <span> Allez à la</span>
                  <Link className="nav-link text-primary fst-italic" to={"/"}>
                    Page d'acceuil
                  </Link>
                </div>

                <Button
                  type="submit"
                  variant="outline-primary"
                  size="sm"
                  disabled={loginMutation.isPending}
                >
                  <div className="d-flex gap-1 align-items-center justify-content-end">
                    {loginMutation.isPending && <LoaderSmall />}{" "}
                    <span>Se connecter</span>
                  </div>
                </Button>
              </div>
            </Form.Group>
            <Error
              error={loginMutation.isError ? loginMutation.error.message : ""}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
