import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import Error from "../../../components/forms/Error";
import CumstomModal from "../../../components/ui/CumstomModal";
import LoaderSmall from "../../../components/ui/LoaderSmall";

const SaisieRjeCreateHrmModal = ({
  showHRMModal,
  handleCloseHRMModal,
  hrm,
  setHrm,
  handleUpsetHrm,
  mutationUpsetHRM,
  saisieRjeQuery,
}) => {
  const [error, setError] = useState("");

  // RESET INITIAL VALUES WHEN SHOW/HIDE MODAL OR DATA CHANGED
  useEffect(() => {
    setError("");
    setHrm(saisieRjeQuery.data?.[0]?.hrm);
    mutationUpsetHRM.reset();
  }, [showHRMModal, saisieRjeQuery.data]);

  const onSubmit = (e) => {
    setError("");
    e.preventDefault();

    if (!hrm || isNaN(hrm)) {
      setError("HRM Saisie n'est pas valide");
      return;
    }

    handleUpsetHrm();
  };

  return (
    <div>
      <CumstomModal
        show={showHRMModal}
        handleClose={handleCloseHRMModal}
        title="HRM"
        isloading={mutationUpsetHRM.isPending}
      >
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <FloatingLabel
              controlId="floatingInputName"
              label="HRM"
              className="mb-3"
            >
              <Form.Control
                type="number"
                step="0.5"
                min={0}
                max={24}
                placeholder="HRM"
                value={hrm || ""}
                onChange={(e) => setHrm(e.target.value)}
                disabled={mutationUpsetHRM.isPending}
              />
            </FloatingLabel>

            <div className="d-flex justify-content-end">
              <Button
                type="submit"
                variant="outline-primary"
                size="sm"
                disabled={mutationUpsetHRM.isPending}
              >
                <div className="d-flex gap-1 align-items-center justify-content-end">
                  {mutationUpsetHRM.isPending && <LoaderSmall />}{" "}
                  <span>Enregistrer</span>
                </div>
              </Button>
            </div>
          </Form.Group>
        </Form>
        <Error
          error={
            error ||
            (mutationUpsetHRM.isError ? mutationUpsetHRM.error.message : "")
          }
        />
      </CumstomModal>
    </div>
  );
};

export default SaisieRjeCreateHrmModal;
