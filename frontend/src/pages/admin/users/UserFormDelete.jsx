import React from "react";
import { Button } from "react-bootstrap";
import LoaderSmall from "../../../components/ui/LoaderSmall";
import deleteUserQueryOptions from "../../../queryOptions/user/deleteUserQueryOptions";
import { useMutation } from "@tanstack/react-query";

const UserFormDelete = ({ currentUser, handleClose }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    mutationDelete.mutate(currentUser?.id);
  };

  const mutationDelete = useMutation(deleteUserQueryOptions(handleClose));

  return (
    <>
      <div className="text-center">
        <strong className="text-danger">
          Êtes vous sûres de vouloir supprimer cet utilsateur?
        </strong>
        <hr />
        <p> Nom : {currentUser?.name}</p>
        <p> Email : {currentUser?.email}</p>
        <p> Rôle : {currentUser?.role}</p>
      </div>

      <div className="d-flex gap-2 float-end mt-2">
        <Button
          disabled={mutationDelete.isPending}
          onClick={onSubmit}
          variant="outline-danger"
          size="sm"
        >
          <div className="d-flex gap-1 align-items-center justify-content-end">
            {mutationDelete.isPending && <LoaderSmall />} <span>Supprimer</span>
          </div>
        </Button>
      </div>
    </>
  );
};

export default UserFormDelete;
