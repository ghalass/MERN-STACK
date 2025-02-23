import { Link, Outlet, useLocation } from "react-router-dom";
import { Nav, Container } from "react-bootstrap";

export default function PerformancesLayout() {
  const location = useLocation(); // Get current route

  return (
    <Container fluid className="mt-1">
      <Nav variant="tabs" activeKey={location.pathname}>
        <Nav.Item>
          <Nav.Link as={Link} to="/performances" eventKey="/performances">
            Performances
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/performances/saisierje"
            eventKey="/performances/saisierje"
          >
            Saisie
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Outlet />
    </Container>
  );
}
