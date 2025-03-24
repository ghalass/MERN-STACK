import React, { useState } from "react";
import { Button, FloatingLabel, Form, Table } from "react-bootstrap";
import { exportExcel } from "../../../utils/func";
import { RiFileExcel2Line } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { getRapportSpecLubOptions } from "../../../hooks/useRapports";
import LoaderSmall from "../../../components/ui/LoaderSmall";
import { useTypelubrifiants } from "../../../hooks/useTypelubrifiants";

const RapportSpecLub = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 7));
  const year = date.split("-")[0]; // Extrait l'année

  const [selectedTypelubrifiant, setSelectedTypelubrifiant] = useState("");

  const [_, setShouldFetch] = useState(false);

  const getAllTypelubrifiantsQuery = useQuery(useTypelubrifiants());

  const getRapportSpecLub = useQuery(
    getRapportSpecLubOptions(selectedTypelubrifiant, year)
  );

  const handleClick = () => {
    setShouldFetch(true); // Activer la requête au clic
    getRapportSpecLub.refetch(); // 🔥 Déclenche la requête au clic
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <div>
          <Button
            onClick={() =>
              exportExcel("tbl_rapport_speclub", "Rapport Spéc Lub")
            }
            variant="outline-success"
            className="rounded-pill"
            size="sm"
            disabled={getRapportSpecLub.isFetching}
          >
            Excel <RiFileExcel2Line className="mb-1" />
          </Button>
        </div>

        <FloatingLabel controlId="floatingSelect" label="Choisir un typeparc">
          <Form.Select
            aria-label="Floating label select example"
            value={selectedTypelubrifiant}
            onChange={(e) => setSelectedTypelubrifiant(e.target.value)}
            disabled={getRapportSpecLub.isFetching}
          >
            <option value="">Liste des typelubrifiants</option>
            {getAllTypelubrifiantsQuery?.data?.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel controlId="floatingInputDate" label="Date" className="">
          <Form.Control
            type="month"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={getRapportSpecLub.isFetching}
          />
        </FloatingLabel>

        <Button
          disabled={
            getRapportSpecLub.isFetching || selectedTypelubrifiant == ""
          }
          onClick={handleClick}
          variant="outline-secondary"
        >
          <div className="d-flex gap-1">
            {getRapportSpecLub.isFetching && <LoaderSmall />}
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
        id="tbl_rapport_speclub"
      >
        <thead>
          <tr>
            <th colSpan={3}>{year}</th>

            <th colSpan={3}>cumulé</th>

            <th colSpan={3} className="bg-secondary-subtle">
              janvier
            </th>

            <th colSpan={3}>février</th>

            <th colSpan={3} className="bg-secondary-subtle">
              mars
            </th>

            <th colSpan={3}>avril</th>

            <th colSpan={3} className="bg-secondary-subtle">
              mai
            </th>

            <th colSpan={3}>juin</th>

            <th colSpan={3} className="bg-secondary-subtle">
              juillet
            </th>

            <th colSpan={3}>août</th>

            <th colSpan={3} className="bg-secondary-subtle">
              septembre
            </th>

            <th colSpan={3}>octobre</th>

            <th colSpan={3} className="bg-secondary-subtle">
              novembre
            </th>

            <th colSpan={3}>décembre</th>
          </tr>

          <tr>
            <td>Parc</td>
            <td>NBR</td>
            <td>LUB</td>

            <td>HRM</td>
            <td>QTE</td>
            <td>SPE</td>

            <td className="bg-secondary-subtle">HRM</td>
            <td className="bg-secondary-subtle">QTE</td>
            <td className="bg-secondary-subtle">SPE</td>

            <td>HRM</td>
            <td>QTE</td>
            <td>SPE</td>

            <td className="bg-secondary-subtle">HRM</td>
            <td className="bg-secondary-subtle">QTE</td>
            <td className="bg-secondary-subtle">SPE</td>

            <td>HRM</td>
            <td>QTE</td>
            <td>SPE</td>

            <td className="bg-secondary-subtle">HRM</td>
            <td className="bg-secondary-subtle">QTE</td>
            <td className="bg-secondary-subtle">SPE</td>

            <td>HRM</td>
            <td>QTE</td>
            <td>SPE</td>

            <td className="bg-secondary-subtle">HRM</td>
            <td className="bg-secondary-subtle">QTE</td>
            <td className="bg-secondary-subtle">SPE</td>

            <td>HRM</td>
            <td>QTE</td>
            <td>SPE</td>

            <td className="bg-secondary-subtle">HRM</td>
            <td className="bg-secondary-subtle">QTE</td>
            <td className="bg-secondary-subtle">SPE</td>

            <td>HRM</td>
            <td>QTE</td>
            <td>SPE</td>

            <td className="bg-secondary-subtle">HRM</td>
            <td className="bg-secondary-subtle">QTE</td>
            <td className="bg-secondary-subtle">SPE</td>

            <td>HRM</td>
            <td>QTE</td>
            <td>SPE</td>
          </tr>
        </thead>
        <tbody>
          {!getRapportSpecLub.isFetching &&
            getRapportSpecLub.data?.map((item, i) => (
              <tr key={i}>
                <td>{item?.parc}</td>
                <td>{item?.nombe_engin}</td>
                <td>{item?.typelubrifiant}</td>

                <td>{item?.hrm_total}</td>
                <td>{item?.qte_total}</td>
                <td>{item?.spec_total}</td>

                <td className="bg-secondary-subtle">{item?.hrm_1}</td>
                <td className="bg-secondary-subtle">{item?.qte_1}</td>
                <td className="bg-secondary-subtle">{item?.spec_1}</td>

                <td>{item?.hrm_2}</td>
                <td>{item?.qte_2}</td>
                <td>{item?.spec_2}</td>

                <td className="bg-secondary-subtle">{item?.hrm_3}</td>
                <td className="bg-secondary-subtle">{item?.qte_3}</td>
                <td className="bg-secondary-subtle">{item?.spec_3}</td>

                <td>{item?.hrm_4}</td>
                <td>{item?.qte_4}</td>
                <td>{item?.spec_4}</td>

                <td className="bg-secondary-subtle">{item?.hrm_5}</td>
                <td className="bg-secondary-subtle">{item?.qte_5}</td>
                <td className="bg-secondary-subtle">{item?.spec_5}</td>

                <td>{item?.hrm_6}</td>
                <td>{item?.qte_6}</td>
                <td>{item?.spec_6}</td>

                <td className="bg-secondary-subtle">{item?.hrm_7}</td>
                <td className="bg-secondary-subtle">{item?.qte_7}</td>
                <td className="bg-secondary-subtle">{item?.spec_7}</td>

                <td>{item?.hrm_8}</td>
                <td>{item?.qte_8}</td>
                <td>{item?.spec_8}</td>

                <td className="bg-secondary-subtle">{item?.hrm_9}</td>
                <td className="bg-secondary-subtle">{item?.qte_9}</td>
                <td className="bg-secondary-subtle">{item?.spec_9}</td>

                <td>{item?.hrm_10}</td>
                <td>{item?.qte_10}</td>
                <td>{item?.spec_10}</td>

                <td className="bg-secondary-subtle">{item?.hrm_11}</td>
                <td className="bg-secondary-subtle">{item?.qte_11}</td>
                <td className="bg-secondary-subtle">{item?.spec_11}</td>

                <td>{item?.hrm_12}</td>
                <td>{item?.qte_12}</td>
                <td>{item?.spec_12}</td>
              </tr>
            ))}

          {getRapportSpecLub.isFetching && (
            <tr>
              <td colSpan={21} className="text-center text-primary">
                {getRapportSpecLub.isFetching && (
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

export default RapportSpecLub;
