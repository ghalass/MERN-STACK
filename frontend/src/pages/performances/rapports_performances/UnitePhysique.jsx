import React, { useState } from "react";
import { Button, FloatingLabel, Form, Table } from "react-bootstrap";
import { fecthSitesQuery } from "../../../hooks/useSites";
import { useQuery } from "@tanstack/react-query";
import { generateUnitePhysiqueQueryOptions } from "../../../hooks/useRapports";
import LoaderSmall from "../../../components/ui/LoaderSmall";
import { exportExcel } from "../../../utils/func";
import { RiFileExcel2Line } from "react-icons/ri";

const UnitePhysique = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 7));

  const getAllSitesQuery = useQuery(fecthSitesQuery());

  const [_, setShouldFetch] = useState(false);

  const generateUnitePhysiqueQuery = useQuery(
    generateUnitePhysiqueQueryOptions(date)
  );

  const handleClick = () => {
    setShouldFetch(true); // Activer la requête au clic
    generateUnitePhysiqueQuery.refetch(); // 🔥 Déclenche la requête au clic
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <div>
          <Button
            onClick={() =>
              exportExcel("tbl_unite_physique", "Rapport Unité Physique")
            }
            variant="outline-success"
            className="rounded-pill"
            size="sm"
            disabled={generateUnitePhysiqueQuery.isFetching}
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
            disabled={generateUnitePhysiqueQuery.isFetching}
          />
        </FloatingLabel>

        <Button
          disabled={generateUnitePhysiqueQuery.isFetching}
          onClick={handleClick}
          variant="outline-secondary"
        >
          <div className="d-flex gap-1">
            {generateUnitePhysiqueQuery.isFetching && <LoaderSmall />}
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
        id="tbl_unite_physique"
      >
        <thead>
          <tr>
            <td colSpan={Number(4 * getAllSitesQuery.data?.length + 6)}>
              Unité Physique du {date.split("-").reverse().join("-")}
            </td>
          </tr>

          <tr>
            <th colSpan={2}></th>

            {getAllSitesQuery.data?.map((site, i) => (
              <th key={i} colSpan={4}>
                {site?.name}
              </th>
            ))}

            <th colSpan={4}>TOTAL</th>
          </tr>

          <tr>
            <td colSpan={2}></td>

            {getAllSitesQuery.data?.map((site, i) => (
              <React.Fragment key={i}>
                <td colSpan={2}>HRM</td>
                <td colSpan={2}>HIM</td>
              </React.Fragment>
            ))}

            <td colSpan={2}>HRM</td>
            <td colSpan={2}>HIM</td>
          </tr>

          <tr>
            <td>Parc</td>
            <td>Nbre</td>

            {getAllSitesQuery.data?.map((site, i) => (
              <React.Fragment key={i}>
                <td>M</td>
                <td>A</td>
                <td>M</td>
                <td>A</td>
              </React.Fragment>
            ))}

            <td>M</td>
            <td>A</td>

            <td>M</td>
            <td>A</td>
          </tr>
        </thead>
        <tbody>
          {!generateUnitePhysiqueQuery.isFetching &&
            generateUnitePhysiqueQuery.data?.map((unitePhysique, i) => (
              <tr key={i}>
                <td>{unitePhysique?.parc}</td>
                <td>{unitePhysique?.nombre_d_engin}</td>

                {getAllSitesQuery.data?.map((site, i) => (
                  <React.Fragment key={i}>
                    <td>
                      {unitePhysique.par_site?.map(
                        (s, i) => s?.site === site?.name && s?.hrm_m
                      )}
                    </td>
                    <td>
                      {unitePhysique.par_site?.map(
                        (s, i) => s?.site === site?.name && s?.hrm_a
                      )}
                    </td>
                    <td>
                      {unitePhysique.par_site?.map(
                        (s, i) => s?.site === site?.name && s?.him_m
                      )}
                    </td>
                    <td>
                      {unitePhysique.par_site?.map(
                        (s, i) => s?.site === site?.name && s?.him_a
                      )}
                    </td>
                  </React.Fragment>
                ))}

                <td>{unitePhysique?.hrm_m_total}</td>
                <td>{unitePhysique?.hrm_a_total}</td>

                <td>{unitePhysique?.him_m_total}</td>
                <td>{unitePhysique?.him_a_total}</td>
              </tr>
            ))}

          {generateUnitePhysiqueQuery.isFetching && (
            <tr>
              <td
                colSpan={Number(4 * getAllSitesQuery.data?.length + 6)}
                className="text-center text-primary"
              >
                {generateUnitePhysiqueQuery.isFetching && (
                  <div>
                    <LoaderSmall /> Chargement...
                  </div>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default UnitePhysique;
