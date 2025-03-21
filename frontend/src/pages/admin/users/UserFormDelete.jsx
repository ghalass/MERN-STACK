import React from "react";
import { Button } from "react-bootstrap";
import LoaderSmall from "../../../components/ui/LoaderSmall";
import useUserStore from "../../../stores/useUserStore";
import { deleteUserQuery } from "../../../hooks/useUsers";
import { toast } from "react-toastify";

const UserFormDelete = () => {
  const { selectedUser, closeDeleteModal } = useUserStore();

  const deleteUserMutation = deleteUserQuery(closeDeleteModal);

  const onSubmit = (e) => {
    e.preventDefault();
    deleteUserMutation.mutate(selectedUser?.id, {
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
          Êtes vous sûres de vouloir supprimer cet utilsateur?
        </strong>
        <hr />
        <p> Nom : {selectedUser?.name}</p>
        <p> Email : {selectedUser?.email}</p>
        <p> Rôle : {selectedUser?.role}</p>
      </div>

      <div className="d-flex gap-2 float-end mt-2">
        <Button
          disabled={deleteUserMutation.isPending}
          onClick={onSubmit}
          variant="outline-danger"
          size="sm"
        >
          <div className="d-flex gap-1 align-items-center justify-content-end">
            {deleteUserMutation.isPending && <LoaderSmall />}{" "}
            <span>Supprimer</span>
          </div>
        </Button>
      </div>
    </>
  );
};

export default UserFormDelete;
