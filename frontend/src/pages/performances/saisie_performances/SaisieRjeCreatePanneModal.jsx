import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import Error from "../../../components/forms/Error";
import CumstomModal from "../../../components/ui/CumstomModal";
import LoaderSmall from "../../../components/ui/LoaderSmall";

const SaisieRjeCreatePanneModal = ({
  showPanneModal,
  handleClosePanneModal,
  pannes,
  selectedPanne,
  setSelectedPanne,
  handleAddPanne,
  mutationAddPanneHRM,
}) => {
  const [error, setError] = useState("");

  // RESET INITIAL VALUES WHEN SHOW/HIDE MODAL OR DATA CHANGED
  useEffect(() => {
    mutationAddPanneHRM.reset();
    setError("");
    setSelectedPanne({
      ...selectedPanne,
      ni: "",
      him: "",
      id: "",
    });
  }, [showPanneModal]);

  const onSubmit = (e) => {
    setError("");
    e.preventDefault();
    if (
      !selectedPanne.id ||
      isNaN(selectedPanne.id) ||
      !selectedPanne.him ||
      isNaN(selectedPanne.him) ||
      !selectedPanne.ni ||
      isNaN(selectedPanne.ni)
    ) {
      setError("Panne Saisie n'est pas valide");
      return;
    }

    handleAddPanne();
  };

  return (
    <div>
      <CumstomModal
        show={showPanneModal}
        handleClose={handleClosePanneModal}
        title="Panne"
        isloading={mutationAddPanneHRM.isPending}
      >
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <div className="d-flex justify-content-between gap-1">
              <FloatingLabel
                controlId="floatingSelect"
                label="Choisir un parc"
                className="mb-3"
              >
                <Form.Select
                  aria-label="Floating label select example"
                  value={selectedPanne?.id}
                  onChange={(e) =>
                    setSelectedPanne({
                      ...selectedPanne,
                      id: e.target.value,
                    })
                  }
                  disabled={mutationAddPanneHRM.isLoading}
                >
                  <option value="">Liste des pannes</option>
                  {pannes?.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInputHim"
                label="HIM"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  step="0.5"
                  min={0}
                  max={24}
                  placeholder="HIM"
                  value={selectedPanne?.him}
                  onChange={(e) =>
                    setSelectedPanne({
                      ...selectedPanne,
                      him: e.target.value,
                    })
                  }
                  disabled={mutationAddPanneHRM.isLoading}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInputNi"
                label="NI"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  step="1"
                  min={0}
                  placeholder="NI"
                  value={selectedPanne?.ni}
                  onChange={(e) =>
                    setSelectedPanne({
                      ...selectedPanne,
                      ni: e.target.value,
                    })
                  }
                  disabled={mutationAddPanneHRM.isLoading}
                />
              </FloatingLabel>
            </div>

            <div className="d-flex justify-content-end">
              <Button
                type="submit"
                variant="outline-primary"
                size="sm"
                disabled={mutationAddPanneHRM.isPending}
              >
                <div className="d-flex gap-1 align-items-center justify-content-end">
                  {mutationAddPanneHRM.isPending && <LoaderSmall />}
                  <span>Enregistrer</span>
                </div>
              </Button>
            </div>
          </Form.Group>
        </Form>
        <Error
          error={
            error ||
            (mutationAddPanneHRM.isError
              ? mutationAddPanneHRM.error.message
              : "")
          }
        />
      </CumstomModal>
    </div>
  );
};

export default SaisieRjeCreatePanneModal;
