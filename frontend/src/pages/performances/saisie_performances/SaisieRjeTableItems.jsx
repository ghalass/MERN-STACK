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
          <td>
            <button
              onClick={() => handleShowDeletePanneModal(saisie_him)}
              className="btn btn-sm btn-outline-danger rounded-pill"
            >
              <i className="bi bi-trash3"></i>
            </button>
            <span> {saisie_him?.Panne?.name}</span>
          </td>
          <td>{saisie_him?.Panne?.Typepanne?.name}</td>
          <td className="text-center">{saisie_him?.him}</td>
          <td className="text-center">{saisie_him?.ni}</td>
          {/* <td className="text-end">
            
          </td> */}
        </tr>
      ))}
      <SaisieRjeTableTotalRow saisieRjeQuery={saisieRjeQuery} />
    </>
  );
};

export default SaisieRjeTableItems;
