import React, { useEffect } from "react";
import { Badge } from "react-bootstrap";
import useSaisieRjeStore from "../../../stores/useSaisieRjeStore";

const SaisieRjeTableHeaderInfos = () => {
  const { saisieRjeQueryStore, setHrm } = useSaisieRjeStore();

  // HRM
  useEffect(() => {
    setHrm(saisieRjeQueryStore?.data?.[0]?.hrm || "");
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center gap-4">
        <div>
          <Badge pill bg="primary">
            {saisieRjeQueryStore?.data?.[0]?.Saisiehim?.length || 0}
          </Badge>{" "}
          Pannes
        </div>

        <div className="d-flex align-items-center gap-1">
          <span className="text-primary">
            {!saisieRjeQueryStore?.data?.[0]?.hrm && "Aucun HRM saisie"}
          </span>
          <i className="bi bi-clock"></i>{" "}
          <span>HRM : {saisieRjeQueryStore?.data?.[0]?.hrm || " "}</span>
          <i className="bi bi-geo-alt"></i>{" "}
          <span>
            Site : {saisieRjeQueryStore?.data?.[0]?.Site?.name || " "}
          </span>
        </div>
      </div>
    </>
  );
};

export default SaisieRjeTableHeaderInfos;
