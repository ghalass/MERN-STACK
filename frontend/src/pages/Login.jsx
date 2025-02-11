import { useState } from "react";
import { Link } from "react-router-dom";

import { useLogin } from "../hooks/useLogin";
import Error from "../components/Error";

const Login = () => {
  const [email, setEmail] = useState("mike@email.com");
  const [password, setPassword] = useState("1234");

  const { loginUser, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await loginUser(email, password);
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-2">
        <form onSubmit={handleSubmit} style={{ width: "400px" }}>
          <h3 className="text-center mb-3">Log In</h3>
          <div className="form-floating mb-2">
            <input
              type="email"
              className={`form-control `}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="email"
            />
            <label htmlFor="email">E-mail</label>
          </div>

          <div className="form-floating mb-2">
            <input
              type="password"
              className={`form-control `}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="password"
            />
            <label htmlFor="password">Password</label>
          </div>

          <button
            disabled={isLoading}
            className="btn btn-outline-primary w-100"
          >
            <div className="d-flex justify-content-center align-items-center gap-2">
              {isLoading && (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
              <div>Log In</div>
            </div>
          </button>

          <p className="d-flex gap-1 mt-3">
            Your don't have an account?
            <Link to={"/signup"} className="nav-link text-primary fst-italic">
              Sign Up
            </Link>
          </p>

          <p className="d-flex gap-1">
            Go
            <Link to={"/"} className="nav-link text-primary fst-italic">
              Home
            </Link>
          </p>

          <Error error={error} />
        </form>
      </div>
    </>
  );
};

export default Login;
