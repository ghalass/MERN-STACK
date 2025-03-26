import React, { useState } from "react";
import { Button, FloatingLabel, Form, Table } from "react-bootstrap";
import { exportExcel } from "../../../utils/func";
import { RiFileExcel2Line } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { useGetSaisieHrmDay } from "../../../hooks/useSaisieRje";
import LoaderSmall from "../../../components/ui/LoaderSmall";

const DonneesSaisieHrm = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const getSaisieHrmDay = useQuery(useGetSaisieHrmDay(date));

  const [searchByTypeparc, setSearchByTypeparc] = useState("");
  const [searchByParc, setSearchByParc] = useState("");
  const [searchByEngin, setSearchByEngin] = useState("");
  const [searchBySite, setSearchBySite] = useState("");
  const [searchByPanne, setSearchByPanne] = useState("");

  const handleClick = () => {
    getSaisieHrmDay.refetch();
  };

  const filteredData = getSaisieHrmDay?.data?.filter(
    (item) =>
      item.typeparc?.toLowerCase().includes(searchByTypeparc.toLowerCase()) &&
      item.parc?.toLowerCase().includes(searchByParc.toLowerCase()) &&
      item.engin?.toLowerCase().includes(searchByEngin.toLowerCase()) &&
      item.site?.toLowerCase().includes(searchBySite.toLowerCase()) &&
      item.panne?.toLowerCase().includes(searchByPanne.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <Button
          onClick={() => exportExcel("tbl_donnees_saisies", "Données saisies")}
          variant="outline-success"
          className="rounded-pill"
          size="sm"
          disabled={getSaisieHrmDay.isFetching}
        >
          Excel <RiFileExcel2Line className="mb-1" />
        </Button>

        <FloatingLabel controlId="floatingInputDate" label="Date">
          <Form.Control
            type="date"
            placeholder="Date de saisie"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={getSaisieHrmDay.isFetching}
          />
        </FloatingLabel>

        <Button
          disabled={getSaisieHrmDay.isFetching}
          onClick={handleClick}
          variant="outline-secondary"
        >
          <div className="d-flex gap-1">
            {getSaisieHrmDay.isFetching && <LoaderSmall />}
            <div> Générer le rapport</div>
          </div>
        </Button>
      </div>

      <div className="d-flex gap-1 mb-2">
        <input
          type="search"
          className="form-control form-control-sm"
          placeholder="Typeparc..."
          value={searchByTypeparc}
          onChange={(e) => setSearchByTypeparc(e.target.value)}
        />

        <input
          type="search"
          className="form-control form-control-sm"
          placeholder="Parc..."
          value={searchByParc}
          onChange={(e) => setSearchByParc(e.target.value)}
        />

        <input
          type="search"
          className="form-control form-control-sm"
          placeholder="Engin..."
          value={searchByEngin}
          onChange={(e) => setSearchByEngin(e.target.value)}
        />

        <input
          type="search"
          className="form-control form-control-sm"
          placeholder="Site..."
          value={searchBySite}
          onChange={(e) => setSearchBySite(e.target.value)}
        />

        <input
          type="search"
          className="form-control form-control-sm"
          placeholder="Panne..."
          value={searchByPanne}
          onChange={(e) => setSearchByPanne(e.target.value)}
        />
      </div>

      <Table
        responsive
        striped
        bordered
        hover
        size="sm"
        className="text-center text-uppercase"
        id="tbl_donnees_saisies"
      >
        <thead>
          <tr>
            <td colSpan={10}>
              les données hrm/him saisies pour la journée du{" "}
              {date.split("-").reverse().join("-")}
            </td>
          </tr>

          <tr>
            <th>Date</th>
            <th>Typeparc</th>
            <th>Parc</th>
            <th>Engin</th>
            <th>Site</th>
            <th>HRM</th>
            <th>Panne</th>
            <th>HIM</th>
            <th>NI</th>
            <th>LUB</th>
          </tr>
        </thead>
        <tbody>
          {!getSaisieHrmDay.isFetching &&
            filteredData?.map((r, i) => (
              <tr key={i}>
                <td>{r?.date}</td>
                <td>{r?.typeparc}</td>
                <td>{r?.parc}</td>
                <td>{r?.engin}</td>
                <td>{r?.site}</td>
                <td>{r?.hrm}</td>
                <td className="text-start">{r?.panne}</td>
                <td>{r?.him}</td>
                <td>{r?.ni}</td>
                <td>
                  {r?.lubrifiants?.map((lub, j) => (
                    <span key={j}>
                      {lub?.name} ({lub?.qte}) |{" "}
                    </span>
                  ))}
                </td>
              </tr>
            ))}

          {getSaisieHrmDay.isFetching && (
            <tr>
              <td colSpan={10} className="text-center text-primary">
                <LoaderSmall /> Chargement...
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default DonneesSaisieHrm;
