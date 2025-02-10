import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { email, password };

    console.log(user);
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <form onSubmit={handleSubmit} style={{ width: "400px" }}>
          <h3 className="text-center mb-3">Sign Up</h3>
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

          <div className="form-floating mb-2">
            <input
              type="password"
              className={`form-control `}
              id="passwordConfirm"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              value={passwordConfirm}
              placeholder="passwordConfirm"
            />
            <label htmlFor="passwordConfirm">Password Confirm</label>
          </div>

          <button className="btn btn-outline-primary w-100">Sign Up</button>

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
        </form>
      </div>
    </>
  );
};

export default Signup;
