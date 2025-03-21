import React from "react";
import useTypeparcStore from "../../../stores/useTypeparcStore";
import {
  useCreateTypeparc,
  useUpdateTypeparc,
} from "../../../hooks/useTypeparcs";
import { Button, Form } from "react-bootstrap";

const TypeparcForm = () => {
  const { selectedTypeparc, closeModal } = useTypeparcStore();
  const createTypeparcMutation = useCreateTypeparc();
  const updateTypeparcMutation = useUpdateTypeparc();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const typeparcData = { name: formData.get("name") };

    if (selectedTypeparc) {
      // Mettre à jour le site existant
      updateTypeparcMutation.mutate(
        { ...selectedTypeparc, ...typeparcData },
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
      createTypeparcMutation.mutate(typeparcData, {
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
        <Form.Label>Nom du typeparc</Form.Label>
        <Form.Control
          name="name"
          defaultValue={selectedTypeparc?.name || ""}
          required
          className="mb-2"
        />

        <Button
          type="submit"
          disabled={
            createTypeparcMutation.isPending || updateTypeparcMutation.isPending
          }
        >
          {selectedTypeparc
            ? updateTypeparcMutation.isPending
              ? "Modification en cours..."
              : "Modifier"
            : createTypeparcMutation.isPending
            ? "Ajout en cours..."
            : "Ajouter"}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default TypeparcForm;
