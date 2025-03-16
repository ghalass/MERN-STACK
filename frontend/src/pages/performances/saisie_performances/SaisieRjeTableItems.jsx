import React from "react";
import SaisieRjeTableTotalRow from "./SaisieRjeTableTotalRow";

const SaisieRjeTableItems = ({
  saisieRjeQuery,
  handleShowDeletePanneModal,
}) => {
  return (
    <>
      {saisieRjeQuery.data?.[0].Saisiehim?.map((saisie_him, index) => (
        <tr key={index}>
          <td>{saisie_him?.Panne?.name}</td>
          <td>{saisie_him?.him}</td>
          <td>{saisie_him?.ni}</td>
          <td className="text-end">
            <button
              onClick={() => handleShowDeletePanneModal(saisie_him)}
              className="btn btn-sm btn-outline-danger rounded-pill"
            >
              <i className="bi bi-trash3"></i>
            </button>
          </td>
        </tr>
      ))}
      <SaisieRjeTableTotalRow saisieRjeQuery={saisieRjeQuery} />
    </>
  );
};

export default SaisieRjeTableItems;
