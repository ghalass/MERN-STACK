// components/SiteForm.js
import useSiteStore from "../../../stores/useSiteStore";
import { useCreateSite, useUpdateSite } from "../../../hooks/useSites";
import { Button, Form } from "react-bootstrap";

import React from "react";

const SiteForm = () => {
  const { selectedSite, closeModal } = useSiteStore();
  const createSiteMutation = useCreateSite();
  const updateSiteMutation = useUpdateSite();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const siteData = { name: formData.get("name") };

    if (selectedSite) {
      // Mettre à jour le site existant
      updateSiteMutation.mutate(
        { ...selectedSite, ...siteData },
        {
          onSuccess: () => {
            closeModal(); // Fermer le modal après la réussite
          },
          onError: () => {
            // Gérer l'erreur (facultatif)
          },
        }
      );
    } else {
      // Créer un nouveau site
      createSiteMutation.mutate(siteData, {
        onSuccess: () => {
          closeModal(); // Fermer le modal après la réussite
        },
        onError: () => {
          // Gérer l'erreur (facultatif)
        },
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Nom du site</Form.Label>
        <Form.Control
          name="name"
          defaultValue={selectedSite?.name || ""}
          required
        />
      </Form.Group>
      <Button
        type="submit"
        disabled={createSiteMutation.isPending || updateSiteMutation.isPending}
      >
        {selectedSite
          ? updateSiteMutation.isPending
            ? "Modification en cours..."
            : "Modifier"
          : createSiteMutation.isPending
          ? "Ajout en cours..."
          : "Ajouter"}
      </Button>
    </Form>
  );
};

export default SiteForm;
