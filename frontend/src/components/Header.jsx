import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { useLogout } from "../hooks/useLogout";

const Header = () => {
  const user = useAuthStore((state) => state.user);

  const { logoutUser } = useLogout();

  return (
    <div>
      <nav className="navbar navbar-expand-md bg-body-tertiary shadow-sm">
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

            <div className="d-flex gap-1 align-items-center">
              {user && (
                <>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {user && user.email}
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <Link to={"/profile"} className="dropdown-item">
                            <i className="bi bi-person me-1"></i>
                            Profile
                          </Link>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Another action
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>

                        <li>
                          <button
                            onClick={logoutUser}
                            className="dropdown-item text-danger"
                          >
                            <i className="bi bi-power me-1"></i>Se Déconnecter
                          </button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </>
              )}

              {!user && (
                <>
                  <Link
                    to={"/login"}
                    className="btn btn-sm btn-outline-success"
                  >
                    Log In
                  </Link>

                  <Link
                    to={"/signup"}
                    className="btn btn-sm btn-outline-primary"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
