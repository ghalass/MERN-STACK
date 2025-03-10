import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
// import { useLogout } from "../hooks/useLogout";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/esm/Button";
// import { isTokenExpired } from "../utils/authUtils";
import { useAuth } from "../context/Auth";
import Cookies from "universal-cookie";

// import Cookies from "js-cookie";

function Header() {
  // const accessToken = Cookies.get("accessToken");

  const user = useAuthStore((state) => state.user);

  const location = useLocation(); // Get current route
  // const { logoutUser } = useLogout();

  const auth = useAuth();
  const cookie = new Cookies();
  const navigate = useNavigate();

  const handlelogout = () => {
    // remove token from cookie
    cookie.remove("Bearer");
    cookie.remove("refreshToken");
    // remove token from context
    auth.logout();
    // redirect to home page
    navigate("/");
  };

  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <Nav.Link
            as={Link}
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            <i className="bi bi-columns-gap  text-primary me-2"></i>
            APP
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/workouts"
              className={`nav-link ${
                location.pathname === "/workouts" ? "active" : ""
              }`}
            >
              Workouts
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/configs"
              className={`nav-link ${
                location.pathname === "/configs" ? "active" : ""
              }`}
            >
              <i className="bi bi-gear me-1"></i>
              Configs
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/performances"
              className={`nav-link ${
                location.pathname === "/performances" ? "active" : ""
              }`}
            >
              <i className="bi bi-gear me-1"></i>
              Performances
            </Nav.Link>
          </Nav>

          {/*  */}
          {/*  */}
          <Nav className="ms-auto">
            {/* user && !isTokenExpired(user?.token) */}
            {auth.user ? (
              <NavDropdown
                align="end"
                title={
                  <>
                    <span className="me-1">Bienvenue</span>
                    <span className="text-uppercase fw-bold">
                      {auth.user && auth.user?.name}
                    </span>
                  </>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  <i className="bi bi-person me-1"></i>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />

                <button
                  onClick={handlelogout}
                  className=" btn text-danger dropdown-item"
                >
                  <i className="bi bi-power me-1"></i>
                  Déconnecter
                </button>
              </NavDropdown>
            ) : (
              <div>
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-success"
                  size="sm"
                >
                  Log In
                </Button>

                <Button
                  as={Link}
                  to="/signup"
                  variant="outline-primary"
                  size="sm"
                  className="ms-2"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
