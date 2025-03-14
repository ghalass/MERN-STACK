import React, { useState } from "react";
import { Button, Offcanvas, Nav } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavLinkClick = () => {
    if (window.innerWidth < 992) handleClose();
  };

  return (
    <>
      {/* Button to toggle the sidebar (only visible on smaller screens) */}
      <Button
        variant="outline-primary"
        onClick={handleShow}
        className="d-md-none" // Only show the button on smaller screens
      >
        <i className="bi-ui-checks-grid"></i>
      </Button>

      {/* Offcanvas Sidebar, always visible on md+ screens and toggled on smaller screens */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="start"
        responsive="md" // Automatically hide on screens smaller than 'md'
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>ADMIN</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav defaultActiveKey="/admin" className="flex-column">
            {LIST_SIDEBAR.map((item, index) => (
              <div className="d-flex align-items-center" key={index}>
                {location.pathname === item.link && (
                  <i className="bi bi-grip-vertical text-primary "></i>
                )}
                <Nav.Link
                  as={Link}
                  to={item.link}
                  onClick={() => {
                    navigate(item.link);
                    handleNavLinkClick();
                  }}
                  className={`nav-link ${
                    location.pathname === item.link && "ps-0"
                  }`}
                >
                  <i className={`bi ${item?.icon} me-2`}></i>
                  {item.title}
                </Nav.Link>
              </div>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;

const LIST_SIDEBAR = [
  { link: "/admin", title: "Dashboard", icon: "bi-speedometer" },
  { link: "/admin/users", title: "Utilisateurs", icon: "bi-people" },
  { link: "/admin/sites", title: "Sites", icon: "bi-geo-alt-fill" },
];
