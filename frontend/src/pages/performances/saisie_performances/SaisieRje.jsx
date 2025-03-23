import { useEffect } from "react";
import SaisieRjeSelects from "./SaisieRjeSelects";
import { useQuery } from "@tanstack/react-query";

import SaisieRjeTable from "./SaisieRjeTable";
import fecthSaisieRjeQueryOptions from "../../../queryOptions/saisie_performances/fecthSaisieRjeQueryOptions";
import SaisieRjeCreateHrmModal from "./SaisieRjeCreateHrmModal";
import SaisieRjeTableHeaderButtons from "./SaisieRjeTableHeaderButtons";
import SaisieRjeTableHeaderInfos from "./SaisieRjeTableHeaderInfos";
import SaisieRjeCreatePanneModal from "./SaisieRjeCreatePanneModal";
import SaisieRjeDeletePanneModal from "./SaisieRjeDeletePanneModal";
import SaisieRjeCreateLubrifiantModal from "./SaisieRjeCreateLubrifiantModal";
import useSaisieRjeStore from "../../../stores/useSaisieRjeStore";
import SaisieRjeEditPanneModal from "./SaisieRjeEditPanneModal";

const SaisieRje = () => {
  const { selectedFields, setSaisieRjeQueryStore } = useSaisieRjeStore();
  /***** */

  const saisieRjeQuery = useQuery(
    fecthSaisieRjeQueryOptions(selectedFields?.du, selectedFields?.enginId)
  );

  useEffect(() => {
    setSaisieRjeQueryStore(saisieRjeQuery);
  }, [saisieRjeQuery.isSuccess, saisieRjeQuery.isRefetching]);

  return (
    <>
      {/* SELECTION FIELDS */}
      <SaisieRjeSelects />

      {/* INFOS : PANNES NUMBER + HRM + SITE *************/}
      <SaisieRjeTableHeaderInfos />

      <hr className="my-2 w-25 mx-auto" />

      {/* OPTIONS BUTTONS *************/}
      <SaisieRjeTableHeaderButtons />

      {/* LISTE *************/}
      <SaisieRjeTable />

      {/* ADD HRM MODAL *************/}
      <SaisieRjeCreateHrmModal />

      {/* ADD PANNE MODAL *************/}
      <SaisieRjeCreatePanneModal />

      {/* UPDATE PANNE MODAL *************/}
      <SaisieRjeEditPanneModal />

      {/* DELETE PANNE */}
      <SaisieRjeDeletePanneModal />

      {/* ADD LUB MODAL *************/}
      <SaisieRjeCreateLubrifiantModal />
    </>
  );
};

export default SaisieRje;
