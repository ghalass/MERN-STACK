import React, { useState } from "react";
import { Button, FloatingLabel, Form, Table } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import LoaderSmall from "../../../components/ui/LoaderSmall";
import { generateRjeQueryOptions } from "../../../hooks/useRapports";
import { exportExcel } from "../../../utils/func";
import { RiFileExcel2Line } from "react-icons/ri";

const RapportRje = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [_, setShouldFetch] = useState(false);

  const generateRjeQuery = useQuery(generateRjeQueryOptions(date));

  const handleClick = () => {
    setShouldFetch(true); // Activer la requête au clic
    generateRjeQuery.refetch(); // 🔥 Déclenche la requête au clic
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <div>
          <Button
            onClick={() => exportExcel("tbl_rje", "Rapport RJE")}
            variant="outline-success"
            className="rounded-pill"
            size="sm"
            disabled={generateRjeQuery.isFetching}
          >
            Excel <RiFileExcel2Line className="mb-1" />
          </Button>
        </div>

        <FloatingLabel controlId="floatingInputDate" label="Date" className="">
          <Form.Control
            type="date"
            placeholder="Date de saisie"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={generateRjeQuery.isFetching}
          />
        </FloatingLabel>

        <Button
          disabled={generateRjeQuery.isFetching}
          onClick={handleClick}
          variant="outline-secondary"
        >
          <div className="d-flex gap-1">
            {generateRjeQuery.isFetching && <LoaderSmall />}
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
        id="tbl_rje"
      >
        <thead>
          <tr>
            <td colSpan={22}>
              Rapport Journalier Engins RJE du{" "}
              {date.split("-").reverse().join("-")}
            </td>
          </tr>
          <tr>
            <td></td>

            <td className="text-center" colSpan={7}>
              JOURNALIER
            </td>

            <td className="text-center" colSpan={7}>
              MENSUEL
            </td>

            <td className="text-center" colSpan={7}>
              ANNUEL
            </td>
          </tr>

          <tr>
            <td>Engin</td>

            <td>NHO</td>
            <td>HRM</td>
            <td>HIM</td>
            <td>NI</td>
            <td>DISP</td>
            <td>MTBF</td>
            <td>TDM</td>

            <td>NHO</td>
            <td>HRM</td>
            <td>HIM</td>
            <td>NI</td>
            <td>DISP</td>
            <td>MTBF</td>
            <td>TDM</td>

            <td>NHO</td>
            <td>HRM</td>
            <td>HIM</td>
            <td>NI</td>
            <td>DISP</td>
            <td>MTBF</td>
            <td>TDM</td>
          </tr>
        </thead>
        <tbody className="text-end">
          {!generateRjeQuery.isFetching &&
            generateRjeQuery.data?.map((r, i) => (
              <tr key={i}>
                <td>{r?.engin}</td>

                <td>{r?.nho_j}</td>
                <td>{r?.hrm_j}</td>
                <td>{r?.him_j}</td>
                <td>{r?.ni_j}</td>
                <td>{r?.dispo_j}</td>
                <td>{r?.mtbf_j}</td>
                <td>{r?.tdm_j}</td>

                <td>{r?.nho_m}</td>
                <td>{r?.hrm_m}</td>
                <td>{r?.him_m}</td>
                <td>{r?.ni_m}</td>
                <td>{r?.dispo_m}</td>
                <td>{r?.mtbf_m}</td>
                <td>{r?.tdm_m}</td>

                <td>{r?.nho_a}</td>
                <td>{r?.hrm_a}</td>
                <td>{r?.him_a}</td>
                <td>{r?.ni_a}</td>
                <td>{r?.dispo_a}</td>
                <td>{r?.mtbf_a}</td>
                <td>{r?.tdm_a}</td>
              </tr>
            ))}

          {generateRjeQuery.isFetching && (
            <tr>
              <td colSpan={23} className="text-center text-primary">
                {generateRjeQuery.isFetching && (
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

export default RapportRje;

const rje = [
  {
    engin: "326",
    site: "PG11",
    nho_j: 24,
    dispo_j: "97.92",
    mtbf_j: "22.50",
    tdm_j: "93.75",
    him_j: 0.5,
    hrm_j: 22.5,
    ni_j: 1,
    nho_m: 384,
    dispo_m: "97.53",
    mtbf_m: "18.83",
    tdm_m: "14.71",
    him_m: 9.5,
    hrm_m: 56.5,
    ni_m: 3,
    nho_a: 1800,
    dispo_a: "99.17",
    mtbf_a: "15.25",
    tdm_a: "5.08",
    him_a: 15,
    hrm_a: 91.5,
    ni_a: 6,
  },
  {
    engin: "327",
    site: "TO14",
    nho_j: 24,
    dispo_j: "87.50",
    mtbf_j: "10.50",
    tdm_j: "87.50",
    him_j: 3,
    hrm_j: 21,
    ni_j: 2,
    nho_m: 384,
    dispo_m: "99.22",
    mtbf_m: "10.50",
    tdm_m: "5.47",
    him_m: 3,
    hrm_m: 21,
    ni_m: 2,
    nho_a: 1800,
    dispo_a: "99.83",
    mtbf_a: "10.50",
    tdm_a: "1.17",
    him_a: 3,
    hrm_a: 21,
    ni_a: 2,
  },
  {
    engin: "966",
    site: "PG11",
    nho_j: 24,
    dispo_j: "50.00",
    mtbf_j: "7.75",
    tdm_j: "64.58",
    him_j: 12,
    hrm_j: 15.5,
    ni_j: 2,
    nho_m: 384,
    dispo_m: "96.88",
    mtbf_m: "7.75",
    tdm_m: "4.04",
    him_m: 12,
    hrm_m: 15.5,
    ni_m: 2,
    nho_a: 1800,
    dispo_a: "99.33",
    mtbf_a: "8.30",
    tdm_a: "0.92",
    him_a: 12,
    hrm_a: 16.6,
    ni_a: 2,
  },
];
