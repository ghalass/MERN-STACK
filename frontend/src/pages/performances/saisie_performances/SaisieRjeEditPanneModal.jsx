import React, { useEffect, useState } from "react";
import CumstomModal from "../../../components/ui/CumstomModal";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import Error from "../../../components/forms/Error";
import { usePannesByTypePanne } from "../../../hooks/usePannes";
import useSaisieRjeStore from "../../../stores/useSaisieRjeStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTypepannes } from "../../../hooks/useTypepannes";
import LoaderSmall from "../../../components/ui/LoaderSmall";
import { useUpdateSaisiePanne } from "../../../hooks/useSaisieRje";

const SaisieRjeEditPanneModal = () => {
  const { showEditPanneModal, handleCloseEditPanneModal, panneToEdit } =
    useSaisieRjeStore();

  const [selectedTypepanne, setSelectedTypepanne] = useState();
  const [selectedPanne, setSelectedPanne] = useState();
  const [him, setHim] = useState();
  const [ni, setNi] = useState();

  // RESET INITIAL VALUES WHEN SHOW/HIDE MODAL OR DATA CHANGED
  useEffect(() => {
    mutationUpdatePanneHRM.reset();
    setSelectedTypepanne(panneToEdit?.Panne?.Typepanne?.id);
    setSelectedPanne(panneToEdit?.panneId);
    setHim(panneToEdit?.him);
    setNi(panneToEdit?.ni);
  }, [showEditPanneModal]);

  const typepannesQuery = useQuery(useTypepannes());
  const pannesByTypepanneQuery = useQuery(
    usePannesByTypePanne(selectedTypepanne)
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const panneToUpdate = {
      id: panneToEdit?.id,
      panneId: selectedPanne,
      him: him,
      ni: ni,
      saisiehrmId: panneToEdit?.saisiehrmId,
    };

    mutationUpdatePanneHRM.mutate(panneToUpdate);
  };

  const mutationUpdatePanneHRM = useMutation(
    useUpdateSaisiePanne(handleCloseEditPanneModal)
  );

  const isloading =
    typepannesQuery.isLoading ||
    pannesByTypepanneQuery.isLoading ||
    mutationUpdatePanneHRM.isPending;

  return (
    <div>
      <CumstomModal
        show={showEditPanneModal}
        handleClose={handleCloseEditPanneModal}
        title="Modifier une panne"
        isloading={isloading}
      >
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <div className="d-flex flex-row justify-content-center gap-1">
              <FloatingLabel
                controlId="floatingSelect"
                label="Choisir un typepanne"
                className="mb-3"
              >
                <Form.Select
                  aria-label="Floating label select example"
                  value={selectedTypepanne}
                  onChange={(e) => setSelectedTypepanne(e.target.value)}
                  disabled={isloading}
                >
                  <option value="">Liste des Typepannes</option>
                  {typepannesQuery?.data?.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingSelect"
                label="Choisir un parc"
                className="mb-3"
              >
                <Form.Select
                  aria-label="Floating label select example"
                  value={selectedPanne}
                  onChange={(e) => setSelectedPanne(e.target.value)}
                  disabled={isloading}
                >
                  <option value="">Liste des Pannes</option>
                  {pannesByTypepanneQuery?.data?.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </div>
            <div className="d-flex  justify-content-center gap-1">
              <FloatingLabel
                controlId="floatingInputHim"
                label="HIM"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  step="0.5"
                  min={0}
                  placeholder="HIM"
                  value={him}
                  onChange={(e) => setHim(e.target.value)}
                  disabled={isloading}
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
                  value={ni}
                  onChange={(e) => setNi(e.target.value)}
                  disabled={isloading}
                />
              </FloatingLabel>
            </div>

            <div className="d-flex justify-content-end">
              <Button
                type="submit"
                variant="outline-primary"
                size="sm"
                disabled={isloading}
              >
                <div className="d-flex gap-1 align-items-center justify-content-end">
                  {isloading && <LoaderSmall />}
                  <span>Enregistrer</span>
                </div>
              </Button>
            </div>
          </Form.Group>
        </Form>
        <Error
          error={
            mutationUpdatePanneHRM.isError &&
            mutationUpdatePanneHRM.error.message
          }
        />
      </CumstomModal>
    </div>
  );
};

export default SaisieRjeEditPanneModal;
