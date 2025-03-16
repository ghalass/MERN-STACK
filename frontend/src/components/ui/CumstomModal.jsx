import Modal from "react-bootstrap/Modal";

const CumstomModal = ({
  show,
  handleClose,
  children,
  title,
  isloading = false,
}) => {
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
        <Modal.Header closeButton={!isloading ? true : undefined}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </div>
  );
};

export default CumstomModal;
