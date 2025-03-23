import { useState } from "react";
import SaisieRjeSelects from "./SaisieRjeSelects";
import { useMutation, useQuery } from "@tanstack/react-query";

import SaisieRjeTable from "./SaisieRjeTable";
import fecthSaisieRjeQueryOptions from "../../../queryOptions/saisie_performances/fecthSaisieRjeQueryOptions";
import upsetHRMQueryOptions from "../../../queryOptions/saisie_performances/upsetHRMQueryOptions";
import SaisieRjeCreateHrmModal from "./SaisieRjeCreateHrmModal";
import SaisieRjeTableHeaderButtons from "./SaisieRjeTableHeaderButtons";
import SaisieRjeTableHeaderInfos from "./SaisieRjeTableHeaderInfos";
import SaisieRjeCreatePanneModal from "./SaisieRjeCreatePanneModal";
import fecthPannesQueryOptions from "../../../queryOptions/saisie_performances/fecthPannesQueryOptions";
import addPanneQueryOptions from "../../../queryOptions/saisie_performances/addPanneQueryOptions";
import SaisieRjeDeletePanneModal from "./SaisieRjeDeletePanneModal";
import deletePanneQueryOptions from "../../../queryOptions/saisie_performances/deletePanneQueryOptions";
import SaisieRjeCreateLubrifiantModal from "./SaisieRjeCreateLubrifiantModal";

const SaisieRje = () => {
  const [showHRMModal, setShowHRMModal] = useState(false);
  const handleCloseHRMModal = () => setShowHRMModal(false);
  const handleShowHRMModal = () => setShowHRMModal(true);

  const [showPanneModal, setShowPanneModal] = useState(false);
  const handleClosePanneModal = () => setShowPanneModal(false);
  const handleShowPanneModal = () => setShowPanneModal(true);

  const [selectedSaisieHim, setSelectedSaisieHim] = useState({});
  const [showHuileModal, setShowHuileModal] = useState(false);
  const handleCloseHuileModal = () => setShowHuileModal(false);
  const handleShowHuileModal = (d) => {
    console.log(d);
    setSelectedSaisieHim(d);
    setShowHuileModal(true);
  };

  const [panneToDelete, setPanneToDelete] = useState(null);

  const [showDeletePanneModal, setShowDeletePanneModal] = useState(false);
  const handleCloseDeletePanneModal = () => setShowDeletePanneModal(false);
  const handleShowDeletePanneModal = (p) => {
    setShowDeletePanneModal(true);
    setPanneToDelete(p);
  };

  const [selectedFields, setSelectedFields] = useState({
    du: new Date().toISOString().split("T")[0],
    enginId: "",
    siteId: "",
  });

  const saisieRjeQuery = useQuery(
    fecthSaisieRjeQueryOptions(selectedFields?.du, selectedFields?.enginId)
  );

  // HRM
  const [hrm, setHrm] = useState(saisieRjeQuery.data?.[0]?.hrm || "");
  const handleUpsetHrm = () => {
    const upsetHRM = {
      id: saisieRjeQuery.data?.[0]?.id || "",
      du: saisieRjeQuery.data?.[0]?.du || selectedFields?.du,
      enginId: saisieRjeQuery.data?.[0]?.enginId || selectedFields?.enginId,
      siteId: saisieRjeQuery.data?.[0]?.siteId || selectedFields?.siteId,
      hrm: hrm,
    };
    mutationUpsetHRM.mutate(upsetHRM);
  };
  const mutationUpsetHRM = useMutation(
    upsetHRMQueryOptions(handleCloseHRMModal)
  );

  // PANNES
  const pannes = useQuery(fecthPannesQueryOptions(selectedFields?.parcId));
  const [selectedPanne, setSelectedPanne] = useState({
    id: "",
    him: "",
    ni: "",
  });
  const handleAddPanne = () => {
    const panneToAdd = {
      saisiehrmId: saisieRjeQuery.data?.[0]?.id,
      panneId: selectedPanne.id,
      him: selectedPanne.him,
      ni: selectedPanne.ni,
    };
    mutationAddPanneHRM.mutate(panneToAdd);
  };
  const mutationAddPanneHRM = useMutation(
    addPanneQueryOptions(handleClosePanneModal)
  );

  const handleDeletePanne = () => {
    const data = {
      id: panneToDelete?.id,
    };

    mutationDeletePanneHRM.mutate(data);
  };
  const mutationDeletePanneHRM = useMutation(
    deletePanneQueryOptions(handleCloseDeletePanneModal)
  );

  return (
    <>
      <SaisieRjeSelects
        selectedFields={selectedFields}
        setSelectedFields={setSelectedFields}
      />

      <SaisieRjeTableHeaderInfos saisieRjeQuery={saisieRjeQuery} />

      <hr className="my-2 w-25 mx-auto" />

      <SaisieRjeTableHeaderButtons
        selectedFields={selectedFields}
        handleShowHRMModal={handleShowHRMModal}
        handleShowPanneModal={handleShowPanneModal}
        saisieRjeQuery={saisieRjeQuery}
      />

      <SaisieRjeTable
        saisieRjeQuery={saisieRjeQuery}
        handleShowDeletePanneModal={handleShowDeletePanneModal}
        setPanneToDelete={setPanneToDelete}
        handleShowHuileModal={handleShowHuileModal}
      />

      {/* HRM MODAL *****************************/}
      <SaisieRjeCreateHrmModal
        showHRMModal={showHRMModal}
        handleCloseHRMModal={handleCloseHRMModal}
        hrm={hrm}
        setHrm={setHrm}
        handleUpsetHrm={handleUpsetHrm}
        mutationUpsetHRM={mutationUpsetHRM}
        saisieRjeQuery={saisieRjeQuery}
      />

      {/* PANNE MODAL *****************************/}
      <SaisieRjeCreatePanneModal
        showPanneModal={showPanneModal}
        handleClosePanneModal={handleClosePanneModal}
        mutationAddPanneHRM={mutationAddPanneHRM}
        pannes={pannes.data}
        selectedPanne={selectedPanne}
        setSelectedPanne={setSelectedPanne}
        handleAddPanne={handleAddPanne}
      />

      <SaisieRjeDeletePanneModal
        showDeletePanneModal={showDeletePanneModal}
        handleCloseDeletePanneModal={handleCloseDeletePanneModal}
        handleDeletePanne={handleDeletePanne}
        mutationDeletePanneHRM={mutationDeletePanneHRM}
        panneToDelete={panneToDelete}
      />

      {/* HUILE MODAL *****************************/}
      <SaisieRjeCreateLubrifiantModal
        showHuileModal={showHuileModal}
        handleCloseHuileModal={handleCloseHuileModal}
        selectedSaisieHim={selectedSaisieHim}
        hrm={hrm}
        setHrm={setHrm}
        handleUpsetHrm={handleUpsetHrm}
        mutationUpsetHRM={mutationUpsetHRM}
        saisieRjeQuery={saisieRjeQuery}
      />
    </>
  );
};

export default SaisieRje;
