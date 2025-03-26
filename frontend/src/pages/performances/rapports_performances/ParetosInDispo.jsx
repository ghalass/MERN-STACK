import {
  getParetoIndispParcOptions,
  getParetoMtbfParcOptions,
} from "../../../hooks/useRapports";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button, FloatingLabel, Form, Table } from "react-bootstrap";
import { useParcs } from "../../../hooks/useParcs";
import LoaderSmall from "../../../components/ui/LoaderSmall";
import Chart from "../../../components/Chart";

import { getYear, getMonth, parseISO } from "date-fns";

const ParetosInDispo = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 7));
  const [selectedParc, setSelectedParc] = useState("");
  const [selectedParcName, setSelectedParcName] = useState("");

  const getAllParcsQuery = useQuery(useParcs());

  const [_, setShouldFetch] = useState(false);

  const getParetoIndispParc = useQuery(
    getParetoIndispParcOptions(selectedParc, date)
  );
  const getParetoMtbfParc = useQuery(
    getParetoMtbfParcOptions(selectedParc, date)
  );

  const handleClick = () => {
    setShouldFetch(true);
    getParetoIndispParc.refetch();
    getParetoMtbfParc.refetch();
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <FloatingLabel controlId="floatingSelect" label="Choisir un typeparc">
          <Form.Select
            aria-label="Floating label select example"
            value={selectedParc}
            onChange={(e) => {
              setSelectedParc(e.target.value);
              setSelectedParcName(
                e.target.value !== ""
                  ? e.target.options[e.target.selectedIndex].text
                  : ""
              );
            }}
            disabled={getParetoIndispParc.isFetching}
          >
            <option value="">Liste des parc</option>
            {getAllParcsQuery.data?.map((item, index) => (
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
            disabled={getParetoIndispParc.isFetching}
          />
        </FloatingLabel>

        <Button
          disabled={getParetoIndispParc.isFetching || selectedParc == ""}
          onClick={handleClick}
          variant="outline-secondary"
        >
          <div className="d-flex gap-1">
            {getParetoIndispParc.isFetching && <LoaderSmall />}
            <div> Générer le rapport</div>
          </div>
        </Button>
      </div>

      <div className="row">
        <div className="col-lg">
          <div className="d-flex flex-column">
            <div>
              <h6 className="text-center text-uppercase">
                pareto indispo du parc {selectedParcName} au mois :{" "}
                {date.split("-").reverse().join("-")}
              </h6>
              {getParetoIndispParc.isFetching && (
                <div className="text-center text-primary">
                  <LoaderSmall />
                </div>
              )}
              {!getParetoIndispParc.isFetching &&
              selectedParc !== "" &&
              getParetoIndispParc?.data &&
              getParetoIndispParc?.data?.length > 0 ? (
                <Chart
                  data={getParetoIndispParc?.data?.slice(0, 10)}
                  xDataKey={"panne"}
                  barDataKey={"indispo"}
                />
              ) : (
                <h6 className="text-center">
                  {selectedParc !== "" &&
                    "Aucune pannes n'est trouvées pour ce parc à cette date."}
                </h6>
              )}
            </div>

            <div>
              {!getParetoIndispParc.isFetching && (
                <Table
                  responsive
                  striped
                  bordered
                  hover
                  size="sm"
                  className="text-center text-uppercase"
                  id="tbl_etat_mensuel"
                >
                  <thead>
                    {selectedParc !== "" &&
                      getParetoIndispParc?.data &&
                      getParetoIndispParc?.data?.length > 0 && (
                        <tr>
                          <td colSpan={11}>
                            les 10 engins le plus affectés [HIM]
                          </td>
                        </tr>
                      )}
                  </thead>
                  <tbody>
                    {selectedParc !== "" &&
                      getParetoIndispParc?.data &&
                      getParetoIndispParc?.data?.length > 0 &&
                      getParetoIndispParc?.data
                        ?.slice(0, 9)
                        .map((panneObj, k) => (
                          <tr key={k}>
                            <td>{panneObj?.panne}</td>
                            {panneObj?.engins &&
                              panneObj?.engins?.length > 0 &&
                              panneObj?.engins?.map((e, r) => (
                                <td>
                                  {e?.him !== 0
                                    ? e?.name + " ( " + e?.him + " ) "
                                    : ""}
                                </td>
                              ))}
                          </tr>
                        ))}
                  </tbody>
                </Table>
              )}
            </div>
          </div>
        </div>

        <div className="col-sm">
          <div className="d-flex flex-column">
            <h6 className="text-center text-uppercase">
              évolution mtbf du parc {selectedParcName}
              {" - "}
              {getYear(parseISO(date))}
            </h6>

            {!getParetoIndispParc.isFetching &&
              selectedParc !== "" &&
              getParetoMtbfParc?.data &&
              getParetoMtbfParc?.data?.length > 0 && (
                <Chart
                  data={getParetoMtbfParc?.data}
                  xDataKey={"mois"}
                  barDataKey={"mtbf"}
                  type="line"
                />
              )}
          </div>

          <div>
            {getParetoIndispParc.isFetching && (
              <div className="text-center text-primary">
                <LoaderSmall />
              </div>
            )}

            {!getParetoIndispParc.isFetching && (
              <Table
                responsive
                striped
                bordered
                hover
                size="sm"
                className="text-center text-uppercase"
                id="tbl_etat_mensuel"
              >
                <thead>
                  {selectedParc !== "" &&
                    getParetoIndispParc?.data &&
                    getParetoIndispParc?.data?.length > 0 && (
                      <tr>
                        <td colSpan={11}>
                          les 10 engins le plus affectés [NI]
                        </td>
                      </tr>
                    )}
                </thead>
                <tbody>
                  {selectedParc !== "" &&
                    getParetoIndispParc?.data &&
                    getParetoIndispParc?.data?.length > 0 &&
                    getParetoIndispParc?.data
                      ?.slice(0, 9)
                      .map((panneObj, k) => (
                        <tr key={k}>
                          <td>{panneObj?.panne}</td>
                          {panneObj?.engins_mtbf &&
                            panneObj?.engins_mtbf?.length > 0 &&
                            panneObj?.engins_mtbf?.map((e, r) => (
                              <td>
                                {e?.ni !== 0
                                  ? e?.name + " ( " + e?.ni + " ) "
                                  : ""}
                              </td>
                            ))}
                        </tr>
                      ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParetosInDispo;
