import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Error from "../../../components/forms/Error";
import LoaderSmall from "../../../components/ui/LoaderSmall";
import { toast } from "react-toastify";
import useSiteStore from "../../../stores/useSiteStore";
import { useUpdateSite } from "../../../hooks/useSites";

const SiteFormUpdate = () => {
  const { selectedSite, setSelectedSite, closeEditModal } = useSiteStore();

  const updateSiteMutation = useUpdateSite();

  const onSubmit = (e) => {
    e.preventDefault();
    const siteToUpdate = {
      id: selectedSite.id,
      name: selectedSite.name,
    };
    console.log(siteToUpdate);

    updateSiteMutation.mutate(siteToUpdate, {
      onSuccess: () => {
        closeEditModal();
        toast.success("Modifié avec succès.");
      },
    });
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <FloatingLabel
            controlId="floatingInputName"
            label="Nom d'utilsateur"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Nom d'utilsateur"
              value={selectedSite.name}
              onChange={(e) =>
                setSelectedSite({ ...selectedSite, name: e.target.value })
              }
              disabled={updateSiteMutation.isPending}
            />
          </FloatingLabel>

          <div className="d-flex justify-content-end">
            <Button type="submit" variant="outline-primary" size="sm">
              <div className="d-flex gap-1 align-items-center justify-content-end">
                {updateSiteMutation.isPending && <LoaderSmall />}{" "}
                <span>Modifier</span>
              </div>
            </Button>
          </div>
        </Form.Group>

        <Error
          error={
            updateSiteMutation.isError ? updateSiteMutation.error.message : ""
          }
        />
      </Form>
    </div>
  );
};

export default SiteFormUpdate;
