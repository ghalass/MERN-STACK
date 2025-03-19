// components/DeleteConfirmationModal.js
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmationModal = ({
  show,
  onHide,
  onConfirm,
  siteName,
  isLoading,
}) => {
  return (
    <Modal
      show={show}
      onHide={!isLoading ? onHide : undefined}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirmer la suppression</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Êtes-vous sûr de vouloir supprimer le site <strong>{siteName}</strong> ?
        Cette action est irréversible.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={isLoading}>
          Annuler
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? "Suppression en cours..." : "Supprimer"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
