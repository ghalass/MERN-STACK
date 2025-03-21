// components/SiteModal.js
import { Button, Modal } from "react-bootstrap";
import useSiteStore from "../../../stores/useSiteStore";
import SiteForm from "./SiteForm";

import React from "react";
import { useCreateSite, useUpdateSite } from "../../../hooks/useSites";

const SiteModal = () => {
  const { isModalOpen, closeModal, selectedSite } = useSiteStore();
  const createSiteMutation = useCreateSite();
  const updateSiteMutation = useUpdateSite();

  // Désactiver la fermeture du modal pendant le traitement
  const isProcessing =
    createSiteMutation.isPending || updateSiteMutation.isPending;

  return (
    <Modal
      show={isModalOpen}
      onHide={!isProcessing ? closeModal : undefined}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedSite ? "Modifier le site" : "Ajouter un site"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SiteForm />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={closeModal}
          disabled={isProcessing}
        >
          Annuler
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SiteModal;
