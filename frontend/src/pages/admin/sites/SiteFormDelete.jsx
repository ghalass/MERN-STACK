import React from "react";
import { Button } from "react-bootstrap";
import LoaderSmall from "../../../components/ui/LoaderSmall";
import { toast } from "react-toastify";
import useSiteStore from "../../../stores/useSiteStore";
import { useDeleteSite } from "../../../hooks/useSites";

const SiteFormDelete = () => {
  const { selectedSite, closeDeleteModal } = useSiteStore();

  const deletSiteMutation = useDeleteSite();

  const onSubmit = (e) => {
    e.preventDefault();
    deletSiteMutation.mutate(selectedSite, {
      onSuccess: () => {
        closeDeleteModal();
        toast.success("Supprimé avec succès.");
      },
    });
  };

  return (
    <>
      <div className="text-center">
        <strong className="text-danger">
          Êtes vous sûres de vouloir supprimer ce site?
        </strong>
        <hr />
        <p> Nom : {selectedSite?.name}</p>
      </div>

      <div className="d-flex gap-2 float-end mt-2">
        <Button
          disabled={deletSiteMutation.isPending}
          onClick={onSubmit}
          variant="outline-danger"
          size="sm"
        >
          <div className="d-flex gap-1 align-items-center justify-content-end">
            {deletSiteMutation.isPending && <LoaderSmall />}{" "}
            <span>Supprimer</span>
          </div>
        </Button>
      </div>
    </>
  );
};

export default SiteFormDelete;
