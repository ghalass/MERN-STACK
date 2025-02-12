import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { useLogout } from "../hooks/useLogout";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/esm/Button";

function Header() {
  const user = useAuthStore((state) => state.user);

  const { logoutUser } = useLogout();
  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href={"/"}>APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={"/"} className="nav-link">
              Home
            </Link>

            <Link to={"/about"} className="nav-link">
              About
            </Link>
            <Link to={"/workouts"} className="nav-link">
              Workouts
            </Link>
          </Nav>

          {/*  */}
          {/*  */}
          <Nav className="ms-auto">
            {user && (
              <NavDropdown
                align="end"
                title={
                  <>
                    <span className="me-1">Bienvenue</span>
                    <span className="text-uppercase fw-bold">
                      {user && user.name}
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
                <NavDropdown.Item
                  as="button"
                  onClick={logoutUser}
                  className="text-danger"
                >
                  <i className="bi bi-power me-1"></i>
                  Déconnecter
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {/*  */}
            {/*  */}

            {!user && (
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
