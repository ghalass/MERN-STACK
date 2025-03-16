import React from "react";
import { Button } from "react-bootstrap";

const SaisieRjeTableHeaderButtons = ({
  selectedFields,
  handleShowHRMModal,
  handleShowPanneModal,
  saisieRjeQuery,
}) => {
  // DISABLE ADD PANNE BUTTON WHEN NO HRM AND NO ENGIN SELECTED
  const disableAddPanneButton = !(
    !!selectedFields.enginId && !!saisieRjeQuery.data?.[0]?.hrm
  );

  return (
    <>
      <hr className="my-1" />
      <div className="d-flex gap-1 justify-content-between">
        <Button
          onClick={handleShowPanneModal}
          variant="outline-danger"
          className="rounded-pill"
          size="sm"
          disabled={disableAddPanneButton}
        >
          <i className="bi bi-cone-striped"></i>
        </Button>

        <Button
          onClick={handleShowHRMModal}
          variant="outline-primary"
          className="rounded-pill"
          size="sm"
          disabled={!selectedFields.enginId}
        >
          <i className="bi bi-clock-history"></i>
        </Button>
      </div>
    </>
  );
};

export default SaisieRjeTableHeaderButtons;
