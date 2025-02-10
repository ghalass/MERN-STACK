import { useState } from "react";
import { Link } from "react-router-dom";

import { useSignup } from "../hooks/useSignup";
import Error from "../components/Error";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(name, email, password);
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-2">
        <form onSubmit={handleSubmit} style={{ width: "400px" }}>
          <h3 className="text-center mb-3">Sign Up</h3>

          <div className="form-floating mb-2">
            <input
              type="text"
              className={`form-control `}
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="name"
            />
            <label htmlFor="name">Name</label>
          </div>

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

          {/* <div className="form-floating mb-2">
            <input
              type="password"
              className={`form-control `}
              id="passwordConfirm"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              value={passwordConfirm}
              placeholder="passwordConfirm"
            />
            <label htmlFor="passwordConfirm">Password Confirm</label>
          </div> */}

          <button
            disabled={isLoading}
            className="btn btn-outline-primary w-100"
          >
            Sign Up
          </button>

          <p className="d-flex gap-1 mt-3">
            Your have an account?
            <Link to={"/login"} className="nav-link text-primary fst-italic">
              Login
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

export default Signup;
