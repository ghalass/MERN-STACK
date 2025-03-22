import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getRapportHeuresChassisOptions } from "../../../hooks/useRapports";
import { Button, FloatingLabel, Form, Table } from "react-bootstrap";
import { exportExcel } from "../../../utils/func";
import { RiFileExcel2Line } from "react-icons/ri";
import LoaderSmall from "../../../components/ui/LoaderSmall";

const HeuresChassis = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 7));

  const [_, setShouldFetch] = useState(false);

  const getRapportHeuresChassis = useQuery(
    getRapportHeuresChassisOptions(date)
  );

  const handleClick = () => {
    setShouldFetch(true); // Activer la requête au clic
    getRapportHeuresChassis.refetch(); // 🔥 Déclenche la requête au clic
  };
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <div>
          <Button
            onClick={() =>
              exportExcel("tbl_heures_chassis", "Rapport Heures Chassis")
            }
            variant="outline-success"
            className="rounded-pill"
            size="sm"
            disabled={getRapportHeuresChassis.isFetching}
          >
            Excel <RiFileExcel2Line className="mb-1" />
          </Button>
        </div>

        <FloatingLabel controlId="floatingInputDate" label="Date" className="">
          <Form.Control
            type="month"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={getRapportHeuresChassis.isFetching}
          />
        </FloatingLabel>

        <Button
          disabled={getRapportHeuresChassis.isFetching}
          onClick={handleClick}
          variant="outline-secondary"
        >
          <div className="d-flex gap-1">
            {getRapportHeuresChassis.isFetching && <LoaderSmall />}
            <div> Générer le rapport</div>
          </div>
        </Button>
      </div>

      <Table
        responsive
        striped
        bordered
        hover
        size="sm"
        className="text-center text-uppercase"
        id="tbl_heures_chassis"
      >
        <thead>
          <tr>
            <td colSpan={6}>
              rapport heures châssis du {date.split("-").reverse().join("-")}
            </td>
          </tr>

          <tr>
            <th>Type</th>
            <th>Parc</th>
            <th>Engin</th>
            <th>HRM_M</th>
            <th>H_CHASSI</th>
            <th>Site</th>
          </tr>
        </thead>
        <tbody>
          {!getRapportHeuresChassis.isFetching &&
            getRapportHeuresChassis.data?.map((item, index) => (
              <tr key={index}>
                <td>{item?.typeparc}</td>
                <td>{item?.parc}</td>
                <td>{item?.engin}</td>
                <td>{item?.hrm_m}</td>
                <td>{item?.heuresChassis}</td>
                <td>{item?.site}</td>
              </tr>
            ))}

          {getRapportHeuresChassis.isFetching && (
            <tr>
              <td colSpan={6} className="text-center text-primary">
                {getRapportHeuresChassis.isFetching && (
                  <div>
                    <LoaderSmall /> Chargement...
                  </div>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default HeuresChassis;
