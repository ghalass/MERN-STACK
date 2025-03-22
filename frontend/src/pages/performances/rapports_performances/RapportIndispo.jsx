import React, { useState } from "react";
import { Button, FloatingLabel, Form, Table } from "react-bootstrap";
import { exportExcel } from "../../../utils/func";
import { RiFileExcel2Line } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { getRapportIndispoOptions } from "../../../hooks/useRapports";
import LoaderSmall from "../../../components/ui/LoaderSmall";

const RapportIndispo = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [_, setShouldFetch] = useState(false);

  const getRapportIndis = useQuery(getRapportIndispoOptions(date));

  const handleClick = () => {
    setShouldFetch(true); // Activer la requête au clic
    getRapportIndis.refetch(); // 🔥 Déclenche la requête au clic
  };
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <div>
          <Button
            onClick={() =>
              exportExcel("tbl_rapportindispo", "Rapport D'indisponibilité")
            }
            variant="outline-success"
            className="rounded-pill"
            size="sm"
            disabled={getRapportIndis.isFetching}
          >
            Excel <RiFileExcel2Line className="mb-1" />
          </Button>
        </div>

        <FloatingLabel
          controlId="floatingInputDate"
          label="Date de saisie"
          className=""
        >
          <Form.Control
            type="date"
            placeholder="Date de saisie"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={getRapportIndis.isFetching}
          />
        </FloatingLabel>

        <Button
          disabled={getRapportIndis.isFetching}
          onClick={handleClick}
          variant="outline-secondary"
        >
          <div className="d-flex gap-1">
            {getRapportIndis.isFetching && <LoaderSmall />}
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
        id="tbl_rapportindispo"
      >
        <thead>
          <tr>
            <th colSpan={4}></th>

            <th colSpan={2}>NHO</th>

            <th colSpan={2}>NI</th>

            <th colSpan={2}>HIM</th>

            <th colSpan={2}>INDISP</th>

            <th colSpan={2}>COEF</th>
          </tr>

          <tr>
            <td>Type</td>
            <td>Parc</td>
            <td>Nbr</td>
            <td>Panne</td>

            <td>M</td>
            <td>A</td>

            <td>M</td>
            <td>A</td>

            <td>M</td>
            <td>A</td>

            <td>M</td>
            <td>A</td>

            <td>M</td>
            <td>A</td>
          </tr>
        </thead>
        <tbody>
          {!getRapportIndis.isFetching &&
            getRapportIndis.data?.map((rapp, i) => (
              <tr key={i}>
                <td>{rapp?.typeparc}</td>
                <td>{rapp?.parc}</td>
                <td>{rapp?.nombre_d_engin}</td>
                <td>{rapp?.panne}</td>

                <td>{rapp?.nho_m}</td>
                <td>{rapp?.nho_a}</td>

                <td>{rapp?.ni_m}</td>
                <td>{rapp?.ni_a}</td>

                <td>{rapp?.him_m}</td>
                <td>{rapp?.him_a}</td>

                <td>{rapp?.indisp_m}</td>
                <td>{rapp?.indisp_a}</td>

                <td>{rapp?.coef_indispo_m}</td>
                <td>{rapp?.coef_indispo_a}</td>
              </tr>
            ))}

          {getRapportIndis.isFetching && (
            <tr>
              <td colSpan={14} className="text-center text-primary">
                {getRapportIndis.isFetching && (
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

export default RapportIndispo;
