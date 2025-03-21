import React from "react";
import { Button, Modal } from "react-bootstrap";
import useTypeparcStore from "../../../stores/useTypeparcStore";
import TypeparcForm from "./TypeparcForm";

const TypeparcModal = () => {
  const { isModalOpen, closeModal } = useTypeparcStore();

  return (
    <div>
      <Modal
        show={isModalOpen}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {/* {selectedSite ? "Modifier le site" : "Ajouter un site"} */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TypeparcForm />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={closeModal}
            // disabled={isProcessing}
          >
            Annuler
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TypeparcModal;
