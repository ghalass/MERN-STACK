import React from "react";
import { Badge } from "react-bootstrap";
import LoaderSmall from "../../../components/ui/LoaderSmall";

const SaisieRjeTableHeaderInfos = ({ saisieRjeQuery }) => {
  return (
    <>
      <div className="d-flex justify-content-center gap-4">
        <div>
          <Badge pill bg="primary">
            {saisieRjeQuery.data?.[0]?.Saisiehim?.length || 0}
          </Badge>{" "}
          Pannes
        </div>

        <div className="d-flex align-items-center gap-1">
          <span className="text-primary">
            {!saisieRjeQuery.data?.[0]?.hrm && "Aucun HRM saisie"}
          </span>
          <i className="bi bi-clock"></i>{" "}
          <span>HRM[h] : {saisieRjeQuery.data?.[0]?.hrm || " "}</span>
          <i className="bi bi-geo-alt"></i>{" "}
          <span>Site : {saisieRjeQuery.data?.[0]?.Site?.name || " "}</span>
          <i className="bi bi-fuel-pump-diesel"></i>
          <span>GO[hl] : 0</span>
        </div>
      </div>
    </>
  );
};

export default SaisieRjeTableHeaderInfos;
