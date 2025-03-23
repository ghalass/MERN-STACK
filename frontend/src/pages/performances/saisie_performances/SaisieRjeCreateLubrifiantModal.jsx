import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Toast } from "react-bootstrap";
import Error from "../../../components/forms/Error";
import CumstomModal from "../../../components/ui/CumstomModal";
import LoaderSmall from "../../../components/ui/LoaderSmall";
import { fecthLubrifiantsQuery } from "../../../hooks/useLubrifiants";
import { useQuery } from "@tanstack/react-query";
import {
  useCreateSaisieLubrifiant,
  useDeleteSaisieLubrifiant,
} from "../../../hooks/useSaisieLubrifiant";
import { toast } from "react-toastify";
import useSaisieRjeStore from "../../../stores/useSaisieRjeStore";

const SaisieRjeCreateLubrifiantModal = () => {
  const {
    setHrm,
    saisieRjeQueryStore,
    selectedSaisieHim,
    handleCloseLubModal,
    showLubModal,
    setSelectedSaisieHim,
  } = useSaisieRjeStore();
  const [error, setError] = useState("");

  // RESET INITIAL VALUES WHEN SHOW/HIDE MODAL OR DATA CHANGED
  useEffect(() => {
    setError("");
    setQte("");
    setObs("");
    setSelectedLubrifiant("");
    setHrm(saisieRjeQueryStore?.data?.[0]?.hrm);
    createSaisieLubrifiant.reset();
  }, [showLubModal, saisieRjeQueryStore?.data]);

  const [selectedLubrifiant, setSelectedLubrifiant] = useState("");
  const [qte, setQte] = useState("");
  const [obs, setObs] = useState("");

  const getAllLubrifiantsQuery = useQuery(fecthLubrifiantsQuery());

  const createSaisieLubrifiant = useCreateSaisieLubrifiant();
  const deleteSaisieLubrifiant = useDeleteSaisieLubrifiant();

  const onSubmit = (e) => {
    e.preventDefault();
    const newSaisieLubrifiant = {
      lubrifiantId: selectedLubrifiant,
      qte,
      obs,
      saisiehimId: selectedSaisieHim?.id,
    };

    createSaisieLubrifiant.mutate(newSaisieLubrifiant, {
      onSuccess: (res) => {
        setQte("");
        setObs("");
        setSelectedLubrifiant("");

        // PUSH THE ADDED LUB TO THE SELECTED HIM SAISIE 'BECAUSE REACT QUERY DONT REFRESH IT'
        selectedSaisieHim?.Saisielubrifiant.push(res);
        toast.success("Ajouté avec succès.");
      },
    });
  };

  const handleDeleteLub = (lub) => {
    deleteSaisieLubrifiant.mutate(
      { id: lub?.id },
      {
        onSuccess: () => {
          const idToRemove = lub?.id; // ID of the object to remove

          // PUSH THE ADDED LUB TO THE SELECTED HIM SAISIE 'BECAUSE REACT QUERY DONT REFRESH IT'
          const newArray = selectedSaisieHim?.Saisielubrifiant.filter(
            (item) => item.id !== idToRemove
          );

          setSelectedSaisieHim({
            ...selectedSaisieHim,
            Saisielubrifiant: newArray,
          });
          toast.success("Supprimé avec succès.");
        },
      }
    );
  };

  return (
    <div>
      <CumstomModal
        show={showLubModal}
        handleClose={handleCloseLubModal}
        title="Lubrifiants consommés"
        isloading={createSaisieLubrifiant.isPending}
        size="lg"
      >
        <div className="row">
          <div className="col-lg">
            <div className="mb-1">
              <p className="mb-0">
                <strong>Panne :</strong>{" "}
                <span className="text-danger">
                  {selectedSaisieHim?.Panne?.name}
                </span>
              </p>
              <p className="mb-0">
                <strong>Type de Panne : </strong>
                <span className="text-danger">
                  {selectedSaisieHim?.Panne?.Typepanne?.name}
                </span>
              </p>
            </div>
            <Form onSubmit={onSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <div className="d-flex gap-1">
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Choisir un parc"
                    className="mb-3"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      value={selectedLubrifiant}
                      onChange={(e) => setSelectedLubrifiant(e.target.value)}
                      disabled={
                        createSaisieLubrifiant.isPending ||
                        deleteSaisieLubrifiant.isPending
                      }
                    >
                      <option value="">Liste des Lubrifiants</option>
                      {getAllLubrifiantsQuery.data?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingInputHim"
                    label="Qté"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      step={0.1}
                      min={0}
                      placeholder="Qte"
                      value={qte}
                      onChange={(e) => setQte(e.target.value)}
                      disabled={
                        createSaisieLubrifiant.isPending ||
                        deleteSaisieLubrifiant.isPending
                      }
                    />
                  </FloatingLabel>
                </div>

                <FloatingLabel
                  controlId="floatingInputHim"
                  label="Obs"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Obs"
                    value={obs}
                    onChange={(e) => setObs(e.target.value)}
                    disabled={
                      createSaisieLubrifiant.isPending ||
                      deleteSaisieLubrifiant.isPending
                    }
                  />
                </FloatingLabel>

                <div className="d-flex justify-content-end">
                  <Button
                    type="submit"
                    variant="outline-primary"
                    size="sm"
                    disabled={createSaisieLubrifiant.isPending}
                  >
                    <div className="d-flex gap-1 align-items-center justify-content-end">
                      {createSaisieLubrifiant.isPending && <LoaderSmall />}{" "}
                      <span>Enregistrer</span>
                    </div>
                  </Button>
                </div>
              </Form.Group>
            </Form>

            <Error
              error={
                error ||
                (createSaisieLubrifiant.isError
                  ? createSaisieLubrifiant.error.message
                  : "")
              }
            />
          </div>

          <div className="col-lg">
            <table className="table table-sm table-hover">
              <thead>
                <tr>
                  <td></td>
                  <td>Lub</td>
                  <td>Type</td>
                  <td>Qté</td>
                  <td>OBS</td>
                </tr>
              </thead>
              <tbody>
                {selectedSaisieHim?.Saisielubrifiant?.map((saisie_lub, i) => (
                  <tr key={i}>
                    <td>
                      <Button
                        onClick={() => handleDeleteLub(saisie_lub)}
                        variant="outline-danger"
                        className="rounded-pill"
                        size="sm"
                        disabled={
                          createSaisieLubrifiant.isPending ||
                          deleteSaisieLubrifiant.isPending
                        }
                      >
                        <i className="bi bi-trash3"></i>
                      </Button>
                    </td>

                    <td>{saisie_lub?.Lubrifiant?.name}</td>
                    <td>{saisie_lub?.Lubrifiant?.Typelubrifiant?.name}</td>
                    <td>{saisie_lub?.qte}</td>
                    <td>{saisie_lub?.obs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CumstomModal>
    </div>
  );
};

export default SaisieRjeCreateLubrifiantModal;
