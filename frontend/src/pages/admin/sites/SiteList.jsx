// components/SiteList.js
import { useSites, useDeleteSite } from "../../../hooks/useSites";

import React, { useState } from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import useSiteStore from "../../../stores/useSiteStore";

const SiteList = () => {
  const {
    data: sites,
    isLoading: isFetchingSites,
    isError,
    error,
  } = useSites();
  const deleteSiteMutation = useDeleteSite();
  const { openModal, setSelectedSite } = useSiteStore();

  // État pour gérer l'affichage du modal de confirmation de suppression
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [siteToDelete, setSiteToDelete] = useState(null);

  // Ouvrir le modal de confirmation de suppression
  const handleDeleteClick = (siteId, siteName) => {
    setSiteToDelete({ id: siteId, name: siteName });
    setShowDeleteModal(true);
  };

  // Ouvrir le modal de mise à jour
  const handleUpdateClick = (site) => {
    setSelectedSite(site); // Définir le site sélectionné
    openModal(); // Ouvrir le modal
  };

  // Confirmer la suppression
  const handleConfirmDelete = () => {
    if (siteToDelete) {
      deleteSiteMutation.mutate(siteToDelete.id, {
        onSuccess: () => {
          setShowDeleteModal(false); // Fermer le modal après la réussite
          setSiteToDelete(null); // Réinitialiser l'état
        },
        onError: () => {
          // Gérer l'erreur (facultatif)
        },
      });
    }
  };

  // Annuler la suppression
  const handleCancelDelete = () => {
    if (!deleteSiteMutation.isPending) {
      setShowDeleteModal(false); // Fermer le modal
      setSiteToDelete(null); // Réinitialiser l'état
    }
  };

  if (isFetchingSites) return <div>Chargement en cours...</div>;
  if (isError) return <div>Erreur : {error.message}</div>;

  return (
    <div>
      <ul>
        {sites?.map((site) => (
          <li key={site.id}>
            {site.name}
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => handleUpdateClick(site)}
            >
              Modifier
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleDeleteClick(site.id, site.name)}
              disabled={deleteSiteMutation.isPending}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      {sites?.length === 0 && <p>Aucun site n'est trouvé</p>}

      {/* Modal de confirmation de suppression */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        onHide={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        siteName={siteToDelete?.name || ""}
        isLoading={deleteSiteMutation.isPending}
      />
    </div>
  );
};

export default SiteList;
