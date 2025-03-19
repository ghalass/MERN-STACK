import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import Error from "../../../components/forms/Error";
import CumstomModal from "../../../components/ui/CumstomModal";
import LoaderSmall from "../../../components/ui/LoaderSmall";

const SaisieRjeCreateHuileModal = ({
  showHuileModal,
  handleCloseHuileModal,
  hrm,
  setHrm,
  handleUpsetHrm,
  mutationUpsetHRM,
  saisieRjeQuery,
  selectedSaisieHim,
}) => {
  const [error, setError] = useState("");

  // RESET INITIAL VALUES WHEN SHOW/HIDE MODAL OR DATA CHANGED
  useEffect(() => {
    setError("");
    setHrm(saisieRjeQuery.data?.[0]?.hrm);
    mutationUpsetHRM.reset();
  }, [showHuileModal, saisieRjeQuery.data]);

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
        show={showHuileModal}
        handleClose={handleCloseHuileModal}
        title="Lubrifiants consommés"
        isloading={mutationUpsetHRM.isPending}
      >
        {selectedSaisieHim?.Panne?.name}

        <table className="table table-sm table-hover">
          <thead>
            <tr>
              <td>Lub</td>
              <td>Type</td>
              <td>Qté</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {selectedSaisieHim?.Saisielubrifiant?.map((saisie_lub, i) => (
              <tr key={i}>
                <td>{saisie_lub?.Lubrifiant?.name}</td>
                <td>{saisie_lub?.Lubrifiant?.Typelubrifiant?.name}</td>
                <td>{saisie_lub?.qte}</td>
                <td>
                  <Button
                    // onClick={handleShowPanneModal}
                    variant="outline-danger"
                    className="rounded-pill"
                    size="sm"
                    // disabled={disableAddPanneButton}
                  >
                    <i className="bi bi-trash3"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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

export default SaisieRjeCreateHuileModal;
