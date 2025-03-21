import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// COMPONENTS
import LoaderSmall from "../../components/ui/LoaderSmall";
import Error from "../../components/forms/Error";
import { useLocation, useNavigate } from "react-router-dom";
import { loginQuery } from "../../hooks/useUsers";
import { toast } from "react-toastify";
import { useAuth } from "../../context/Auth";

const Login = () => {
  const loginMutation = loginQuery();

  const [user, setUser] = useState({
    email: "ghalass@gmail.com",
    password: "gh@l@ss@dmin",
  });

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";

  const onSubmit = (e) => {
    e.preventDefault();
    const loginData = { email: user.email, password: user.password };
    loginMutation.mutate(loginData, {
      onSuccess: (response) => {
        const token = response.token;
        auth.login(response?.user);
        auth.setToken(token);
        navigate(redirectPath, { replace: true });

        toast.success("Connecté avec succès.");
      },
    });
  };

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

              <div className="d-flex justify-content-end">
                {/* <div className="d-flex gap-2">
                  <span> Allez à la</span>
                  <Link className="nav-link text-primary fst-italic" to={"/"}>
                    Page d'acceuil
                  </Link>
                </div> */}

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
