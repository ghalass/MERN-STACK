import React, { useState } from "react";
import { Button, Offcanvas, Nav } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

const DefaultSidebar = () => {
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
        variant="outline-primary mb-1"
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
        className=""
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>ADMIN</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="w-100">
            <Nav defaultActiveKey="/admin" className="flex-column gap-1 ">
              {LIST_SIDEBAR.map((item, index) => (
                <Nav.Link
                  key={index}
                  as={Link}
                  to={item.link}
                  onClick={() => {
                    navigate(item.link);
                    handleNavLinkClick();
                  }}
                  className={`nav-link p-0`}
                >
                  <div
                    className={`p-2 d-flex align-items-center ${
                      location.pathname === item.link &&
                      "border-bottom border-primary border-2 bg-primary-subtle rounded-3 "
                    }`}
                  >
                    <i className={`bi ${item?.icon} me-2`}></i>
                    {item.title}
                  </div>
                </Nav.Link>
              ))}
            </Nav>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default DefaultSidebar;

const LIST_SIDEBAR = [
  { link: "/", title: "Acceuil", icon: "bi-speedometer" },
  {
    link: "/saisie_performances",
    title: "Saisie performances",
    icon: "bi-people",
  },
  { link: "/donnees_saisies", title: "Données saisies", icon: "bi-people" },
  { link: "/performances", title: "Performances", icon: "bi-people" },
];
