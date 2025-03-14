import Modal from "react-bootstrap/Modal";

const CumstomModal = ({ show, handleClose, children, title }) => {
  const id = Math.random() * 100 + title.replaceAll(" ", "");

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        id={id}
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
