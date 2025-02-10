import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-md bg-body-tertiary">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand">
            APP
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/about"} className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/workouts"} className="nav-link">
                  Workouts
                </Link>
              </li>
            </ul>

            <div className="d-flex gap-1">
              <button className="btn btn-sm btn-outline-success" type="submit">
                Login
              </button>
              <button className="btn btn-sm btn-outline-primary" type="submit">
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
