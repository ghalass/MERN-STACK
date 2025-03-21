import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Error from "../../../components/forms/Error";
import LoaderSmall from "../../../components/ui/LoaderSmall";
import { useCreateSite } from "../../../hooks/useSites";
import useSiteStore from "../../../stores/useSiteStore";

const SiteFormCreate = () => {
  const [site, setSite] = useState({ name: "" });

  const { closeCreateModal } = useSiteStore();

  const createSiteMutation = useCreateSite(setSite, closeCreateModal);

  const onSubmit = (e) => {
    e.preventDefault();
    const newSite = {
      name: site.name,
    };

    createSiteMutation.mutate(newSite, {
      onSuccess: () => {
        setSite({ name: "" });
        closeCreateModal();
        toast.success("Ajouté avec succès.");
      },
    });
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <FloatingLabel
            controlId="floatingInputName"
            label="Nom du site"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Nom du site"
              value={site.name}
              onChange={(e) => setSite({ ...site, name: e.target.value })}
            />
          </FloatingLabel>

          <div className="d-flex justify-content-end">
            <Button
              type="submit"
              variant="outline-primary"
              size="sm"
              disabled={createSiteMutation.isPending}
            >
              <div className="d-flex gap-1 align-items-center justify-content-end">
                {createSiteMutation.isPending && <LoaderSmall />}{" "}
                <span>Ajouter</span>
              </div>
            </Button>
          </div>
        </Form.Group>

        <Error
          error={
            createSiteMutation.isError ? createSiteMutation.error.message : ""
          }
        />
      </Form>
    </>
  );
};

export default SiteFormCreate;
