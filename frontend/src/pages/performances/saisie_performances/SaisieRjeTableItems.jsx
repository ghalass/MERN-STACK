import React from "react";
import SaisieRjeTableTotalRow from "./SaisieRjeTableTotalRow";
import { Button } from "react-bootstrap";
import useSaisieRjeStore from "../../../stores/useSaisieRjeStore";

const SaisieRjeTableItems = () => {
  const {
    saisieRjeQueryStore,
    handleShowLubModal,
    handleShowDeletePanneModal,
    setSelectedSaisieHim,
    handleShowEditPanneModal,
  } = useSaisieRjeStore();

  return (
    <>
      {saisieRjeQueryStore.data?.[0].Saisiehim?.map((saisie_him, index) => (
        <tr key={index}>
          <td>
            <button
              onClick={() => handleShowEditPanneModal(saisie_him)}
              className="btn btn-sm btn-outline-success rounded-pill me-2"
            >
              <i className="bi bi-pencil"></i>
            </button>

            <button
              onClick={() => handleShowDeletePanneModal(saisie_him)}
              className="btn btn-sm btn-outline-danger rounded-pill"
              disabled={saisie_him?.Saisielubrifiant?.length > 0}
            >
              <i className="bi bi-trash3"></i>
            </button>
            <span> {saisie_him?.Panne?.name}</span>
          </td>
          <td>{saisie_him?.Panne?.Typepanne?.name}</td>
          <td className="text-center">{saisie_him?.him}</td>
          <td className="text-center">{saisie_him?.ni}</td>
          <td className="text-center">
            <Button
              onClick={() => {
                handleShowLubModal();
                setSelectedSaisieHim(saisie_him);
              }}
              variant="outline-secondary"
              className="rounded-pill"
              size="sm"
              // disabled={disableAddPanneButton}
            >
              {saisie_him?.Saisielubrifiant?.length > 0 ? (
                <i className={`bi bi-droplet-fill me-2`}></i>
              ) : (
                <i className={`bi bi-droplet me-2`}></i>
              )}
              <span>{saisie_him?.Saisielubrifiant?.length}</span>
            </Button>
          </td>
        </tr>
      ))}
      <SaisieRjeTableTotalRow />
    </>
  );
};

export default SaisieRjeTableItems;
