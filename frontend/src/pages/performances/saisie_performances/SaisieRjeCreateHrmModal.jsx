import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import Error from "../../../components/forms/Error";
import CumstomModal from "../../../components/ui/CumstomModal";
import LoaderSmall from "../../../components/ui/LoaderSmall";
import useSaisieRjeStore from "../../../stores/useSaisieRjeStore";
import { useMutation } from "@tanstack/react-query";
import upsetHRMQueryOptions from "../../../queryOptions/saisie_performances/upsetHRMQueryOptions";

const SaisieRjeCreateHrmModal = () => {
  const {
    hrm,
    setHrm,
    saisieRjeQueryStore,
    showHRMModal,
    handleCloseHRMModal,
    selectedFields,
  } = useSaisieRjeStore();

  const [error, setError] = useState("");

  // RESET INITIAL VALUES WHEN SHOW/HIDE MODAL OR DATA CHANGED
  useEffect(() => {
    setError("");
    setHrm(saisieRjeQueryStore?.data?.[0]?.hrm);
    mutationUpsetHRM.reset();
  }, [showHRMModal, saisieRjeQueryStore?.data]);

  const onSubmit = (e) => {
    setError("");
    e.preventDefault();

    if (!hrm || isNaN(hrm)) {
      setError("HRM Saisie n'est pas valide");
      return;
    }

    const upsetHRM = {
      id: saisieRjeQueryStore.data?.[0]?.id || "",
      du: saisieRjeQueryStore.data?.[0]?.du || selectedFields?.du,
      enginId:
        saisieRjeQueryStore.data?.[0]?.enginId || selectedFields?.enginId,
      siteId: saisieRjeQueryStore.data?.[0]?.siteId || selectedFields?.siteId,
      hrm: hrm,
    };
    mutationUpsetHRM.mutate(upsetHRM);
  };

  const mutationUpsetHRM = useMutation(
    upsetHRMQueryOptions(handleCloseHRMModal)
  );

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
