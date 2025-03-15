import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Form } from "react-bootstrap";
import fecthParcsQueryOptions from "../../../queryOptions/saisie_performances/fecthParcsQueryOptions";
import fectSitesQueryOptions from "../../../queryOptions/saisie_performances/fecthSitesQueryOptions";
import fectEnginsQueryOptions from "../../../queryOptions/saisie_performances/fecthEnginsQueryOptions";
import fecthSaisieRjeQueryOptions from "../../../queryOptions/saisie_performances/fecthSaisieRjeQueryOptions";

const SaisieRjeSelects = ({ setSaisierje, setIsloading }) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [parc, setParc] = useState("");
  const [site, setSite] = useState("");
  const [engin, setEngin] = useState("");

  const parcsQuery = useQuery(fecthParcsQueryOptions());
  const sitesQuery = useQuery(fectSitesQueryOptions());
  const enginsQuery = useQuery(fectEnginsQueryOptions(parc, site));

  const saisieRjeQuery = useQuery(fecthSaisieRjeQueryOptions(date, engin));
  // setIsloading(saisieRjeQuery.isLoading);

  useEffect(() => {
    if (saisieRjeQuery.data) {
      setSaisierje(saisieRjeQuery.data[0]);
    }
  }, [saisieRjeQuery.data]);

  useEffect(() => {
    setIsloading(saisieRjeQuery.isLoading);
  }, [saisieRjeQuery.isLoading]);

  const isLoading =
    enginsQuery.isLoading || parcsQuery.isLoading || sitesQuery.isLoading;

  return (
    <div className="d-flex gap-1">
      <FloatingLabel
        controlId="floatingInputDate"
        label="Date de saisie"
        className="mb-3"
      >
        <Form.Control
          type="date"
          placeholder="Date de saisie"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={isLoading}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingSelect"
        label="Choisir un parc"
        className="mb-3"
      >
        <Form.Select
          aria-label="Floating label select example"
          // disabled={mutationUpdate.isPending}
          defaultValue={parc}
          onChange={(e) => setParc(e.target.value)}
          disabled={isLoading}
        >
          <option value="">Liste des parcs</option>
          {parcsQuery?.data?.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingSelect"
        label="Choisir un site"
        className="mb-3"
      >
        <Form.Select
          aria-label="Floating label select example"
          // disabled={mutationUpdate.isPending}
          defaultValue={site}
          onChange={(e) => setSite(e.target.value)}
          disabled={isLoading}
        >
          <option value="">Liste des sites</option>
          {sitesQuery?.data?.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingSelect"
        label="Choisir un engin"
        className="mb-3"
      >
        <Form.Select
          aria-label="Floating label select example"
          // disabled={mutationUpdate.isPending}
          defaultValue={engin}
          onChange={(e) => setEngin(e.target.value)}
          disabled={isLoading}
        >
          <option value="">Liste des engins</option>
          {enginsQuery?.data?.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
    </div>
  );
};

export default SaisieRjeSelects;
