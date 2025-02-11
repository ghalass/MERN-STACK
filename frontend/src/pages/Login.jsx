import { useState } from "react";
import { Link } from "react-router-dom";

import { useLogin } from "../hooks/useLogin";
import Error from "../components/Error";
import SubmitBtn from "../components/forms/SubmitBtn";

const Login = () => {
  const [email, setEmail] = useState("mike@email.com");
  const [password, setPassword] = useState("mike@email.com");

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
              disabled={isLoading}
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
              disabled={isLoading}
            />
            <label htmlFor="password">Password</label>
          </div>

          <SubmitBtn isLoading={isLoading} text={"Log In"} />

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
