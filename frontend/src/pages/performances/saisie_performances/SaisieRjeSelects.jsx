import { useQuery } from "@tanstack/react-query";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Form } from "react-bootstrap";
import fecthParcsQueryOptions from "../../../queryOptions/saisie_performances/fecthParcsQueryOptions";
import fectSitesQueryOptions from "../../../queryOptions/saisie_performances/fecthSitesQueryOptions";
import fectEnginsQueryOptions from "../../../queryOptions/saisie_performances/fecthEnginsQueryOptions";

const SaisieRjeSelects = ({ selectedFields, setSelectedFields }) => {
  const parcsQuery = useQuery(fecthParcsQueryOptions());
  const sitesQuery = useQuery(fectSitesQueryOptions());
  const enginsQuery = useQuery(
    fectEnginsQueryOptions(selectedFields?.parcId, selectedFields?.siteId)
  );

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
          value={selectedFields?.du}
          onChange={(e) =>
            setSelectedFields({ ...selectedFields, du: e.target.value })
          }
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
          value={selectedFields?.parcId}
          onChange={(e) =>
            setSelectedFields({
              ...selectedFields,
              parcId: e.target.value,
              enginId: "",
            })
          }
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
          value={selectedFields?.siteId}
          onChange={(e) =>
            setSelectedFields({
              ...selectedFields,
              siteId: e.target.value,
              enginId: "",
            })
          }
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
          value={selectedFields?.enginId}
          onChange={(e) =>
            setSelectedFields({
              ...selectedFields,
              enginId: e.target.value,
            })
          }
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
