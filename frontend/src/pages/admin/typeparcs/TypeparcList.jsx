import React from "react";
import { useDeleteTypeparc, useTypeparcs } from "../../../hooks/useTypeparcs";
import { Button } from "react-bootstrap";
import useTypeparcStore from "../../../stores/useTypeparcStore";

const TypeparcList = () => {
  const {
    data: typeparcs,
    isLoading: isFetchingTypeparcs,
    isError,
    error,
  } = useTypeparcs();
  const deleteTypeparcMutation = useDeleteTypeparc();
  const { openModal, setSelectedTypeparc } = useTypeparcStore();

  // État pour gérer l'affichage du modal de confirmation de suppression
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [typeparcToDelete, setTypeparcToDelete] = useState(null);

  // Ouvrir le modal de confirmation de suppression
  const handleDeleteClick = (siteId, siteName) => {
    setTypeparcToDelete({ id: siteId, name: siteName });
    setShowDeleteModal(true);
  };

  // Ouvrir le modal de mise à jour
  const handleUpdateClick = (typeparc) => {
    setSelectedTypeparc(typeparc); // Définir le site sélectionné
    openModal(); // Ouvrir le modal
  };

  // Confirmer la suppression
  const handleConfirmDelete = () => {
    if (typeparcToDelete) {
      deleteTypeparcMutation.mutate(typeparcToDelete.id, {
        onSuccess: () => {
          setShowDeleteModal(false); // Fermer le modal après la réussite
          setTypeparcToDelete(null); // Réinitialiser l'état
        },
        onError: () => {
          // Gérer l'erreur (facultatif)
        },
      });
    }
  };

  // Annuler la suppression
  const handleCancelDelete = () => {
    if (!deleteTypeparcMutation.isPending) {
      setShowDeleteModal(false); // Fermer le modal
      setTypeparcToDelete(null); // Réinitialiser l'état
    }
  };

  if (isFetchingTypeparcs) return <div>Chargement en cours...</div>;
  if (isError) return <div>Erreur : {error.message}</div>;

  return (
    <div>
      <table className="table table-sm table-hover">
        <thead>
          <th>Type parc</th>
          <th>Action</th>
        </thead>
        <tbody>
          {typeparcs?.map((typeparc, i) => (
            <tr>
              <td>{typeparc?.name}</td>
              <td>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="rounded-pill me-1"
                  onClick={() => handleUpdateClick(typeparc)}
                >
                  <i className="bi bi-trash3"> </i>
                </Button>

                <Button
                  variant="outline-primary"
                  size="sm"
                  className="rounded-pill"
                  onClick={() => handleDeleteClick(typeparc.id, typeparc.name)}
                >
                  <i className="bi bi-pencil"> </i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TypeparcList;
