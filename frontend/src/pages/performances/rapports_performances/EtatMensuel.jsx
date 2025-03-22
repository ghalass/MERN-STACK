import React, { useState } from "react";
import { Button, FloatingLabel, Form, Table } from "react-bootstrap";
import { RiFileExcel2Line } from "react-icons/ri";
import { exportExcel } from "../../../utils/func";
import { generateEtatMensuelOptions } from "../../../hooks/useRapports";
import { useQuery } from "@tanstack/react-query";
import LoaderSmall from "../../../components/ui/LoaderSmall";

const EtatMensuel = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [_, setShouldFetch] = useState(false);

  const generateEtatMensuelQuery = useQuery(generateEtatMensuelOptions(date));

  const handleClick = () => {
    setShouldFetch(true); // Activer la requête au clic
    generateEtatMensuelQuery.refetch(); // 🔥 Déclenche la requête au clic
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <div>
          <Button
            onClick={() =>
              exportExcel("tbl_etat_mensuel", "Rapport Etat Mensuel")
            }
            variant="outline-success"
            className="rounded-pill"
            size="sm"
            disabled={generateEtatMensuelQuery.isFetching}
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
            disabled={generateEtatMensuelQuery.isFetching}
          />
        </FloatingLabel>

        <Button
          disabled={generateEtatMensuelQuery.isFetching}
          onClick={handleClick}
          variant="outline-secondary"
        >
          <div className="d-flex gap-1">
            {generateEtatMensuelQuery.isFetching && <LoaderSmall />}
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
        className="text-center"
        id="tbl_etat_mensuel"
      >
        <thead>
          <tr>
            <th colSpan={3}></th>

            <th colSpan={2}>NHO </th>

            <th colSpan={2}>HRM </th>

            <th colSpan={2}>HIM </th>

            <th colSpan={2}>NI </th>

            <th colSpan={2}>HRD </th>

            <th colSpan={2}>MTTR </th>

            <th colSpan={2}>DISP </th>

            <th colSpan={2}>TDM </th>

            <th colSpan={2}>MTBF </th>

            <th colSpan={2}>UTIL </th>
          </tr>
          <tr>
            <td>Type</td>
            <td>Parc</td>
            <td>Engins</td>

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
          {!generateEtatMensuelQuery.isFetching &&
            generateEtatMensuelQuery.data?.map((item, index) => (
              <tr key={index}>
                <td>{item.typeparc}</td>
                <td>{item.parc}</td>
                <td>{item.nombre_d_engin}</td>

                <td>{item.nho_m}</td>
                <td>{item.nho_a}</td>

                <td>{item.hrm_m}</td>
                <td>{item.hrm_a}</td>

                <td>{item.him_m}</td>
                <td>{item.him_a}</td>

                <td>{item.ni_m}</td>
                <td>{item.ni_a}</td>

                <td>{item.hrd_m}</td>
                <td>{item.hrd_a}</td>

                <td>{item.mttr_m}</td>
                <td>{item.mttr_a}</td>

                <td>{item.dispo_m}</td>
                <td>{item.dispo_a}</td>

                <td>{item.tdm_m}</td>
                <td>{item.tdm_a}</td>

                <td>{item.mtbf_m}</td>
                <td>{item.mtbf_a}</td>

                <td>{item.util_m}</td>
                <td>{item.util_a}</td>
              </tr>
            ))}

          {generateEtatMensuelQuery.isFetching && (
            <tr>
              <td colSpan={23} className="text-center text-primary">
                {generateEtatMensuelQuery.isFetching && (
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

export default EtatMensuel;
