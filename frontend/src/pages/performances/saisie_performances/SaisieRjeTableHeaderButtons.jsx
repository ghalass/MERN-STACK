import React from "react";
import { Button } from "react-bootstrap";
import useSaisieRjeStore from "../../../stores/useSaisieRjeStore";

const SaisieRjeTableHeaderButtons = () => {
  const {
    selectedFields,
    saisieRjeQueryStore,
    handleShowHRMModal,
    handleShowPanneModal,
  } = useSaisieRjeStore();

  // DISABLE ADD PANNE BUTTON WHEN NO HRM AND NO ENGIN SELECTED
  const disableAddPanneButton = !(
    !!selectedFields.enginId && !!saisieRjeQueryStore?.data?.[0]?.hrm
  );

  return (
    <>
      <div className="d-flex gap-4 justify-content-center ">
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
