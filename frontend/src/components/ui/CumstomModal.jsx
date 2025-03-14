import { useState } from "react";
import Modal from "react-bootstrap/Modal";

const CumstomModal = ({ show, handleClose, children, title }) => {
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        id={`${Math.random() * 1000}-${title}`}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </div>
  );
};

export default CumstomModal;
