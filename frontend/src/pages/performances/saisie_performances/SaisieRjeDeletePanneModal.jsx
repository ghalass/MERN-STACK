import React from "react";
import { Button, Form } from "react-bootstrap";
import CumstomModal from "../../../components/ui/CumstomModal";
import LoaderSmall from "../../../components/ui/LoaderSmall";

const SaisieRjeDeletePanneModal = ({
  showDeletePanneModal,
  handleCloseDeletePanneModal,
  mutationDeletePanneHRM,
  handleDeletePanne,
  panneToDelete,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    handleDeletePanne();
  };

  return (
    <div>
      <CumstomModal
        show={showDeletePanneModal}
        handleClose={handleCloseDeletePanneModal}
        title="Supprimer une panne"
        isloading={mutationDeletePanneHRM.isPending}
      >
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <div className="text-center">
              <strong className="text-danger">
                Voulez-vous supprimer cette panne ?
              </strong>

              <div className="text-danger d-flex justify-content-center flex-column gap-1 mt-2">
                <span>
                  <span className="text-primary">PANNE: </span>
                  {panneToDelete?.Panne?.name}
                </span>
                <span>
                  <span className="text-primary">HIM:</span>{" "}
                  {panneToDelete?.him}
                </span>
                <span>
                  <span className="text-primary">NI:</span> {panneToDelete?.ni}
                </span>
                <span>
                  <span className="text-primary">TYPE: </span>
                  {panneToDelete?.Panne?.Typepanne?.name}
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <Button
                type="submit"
                variant="outline-primary"
                size="sm"
                disabled={mutationDeletePanneHRM.isPending}
              >
                <div className="d-flex gap-1 align-items-center justify-content-end">
                  {mutationDeletePanneHRM.isPending && <LoaderSmall />}{" "}
                  <span>Supprimer</span>
                </div>
              </Button>
            </div>
          </Form.Group>
        </Form>
      </CumstomModal>
    </div>
  );
};

export default SaisieRjeDeletePanneModal;
