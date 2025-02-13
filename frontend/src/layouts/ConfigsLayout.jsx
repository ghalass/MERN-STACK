import { Link, Outlet, useLocation } from "react-router-dom";
import { Nav, Container } from "react-bootstrap";

export default function ConfigsLayout() {
  const location = useLocation(); // Get current route

  return (
    <Container fluid className="mt-1">
      <Nav variant="tabs" activeKey={location.pathname}>
        <Nav.Item>
          <Nav.Link as={Link} to="/configs" eventKey="/configs">
            Configs
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/configs/sites" eventKey="/configs/sites">
            Sites
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Outlet />
    </Container>
  );
}
