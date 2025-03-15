import { Badge, Button, Form } from "react-bootstrap";
import LoaderSmall from "../../../components/ui/LoaderSmall";
import CumstomModal from "../../../components/ui/CumstomModal";
import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const SaisieRjeTable = ({ saisierje, isloading }) => {
  const [showHRMModal, setShowHRMModal] = useState(false);
  const handleCloseHRMModal = () => setShowHRMModal(false);
  const handleShowHRMModal = () => setShowHRMModal(true);

  const [hrm, setHrm] = useState(saisierje?.hrm);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(hrm);

    // const newUser = {
    //   name: user.name,
    //   email: user.email,
    //   password: user.password,
    // };
    // mutationCreate.mutate(newUser);
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between gap-1">
            <div>
              <Badge pill bg="primary">
                {saisierje?.Saisiehim?.length || 0}
              </Badge>{" "}
              Pannes
            </div>
            <div className="d-flex align-items-center gap-1">
              <span className="text-primary">
                {!saisierje?.hrm && "Aucun HRM saisie"}
              </span>
              <i className="bi bi-clock"></i>{" "}
              <span>HRM[h] : {saisierje?.hrm || " "}</span>
              <i className="bi bi-geo-alt"></i>{" "}
              <span>Site : {saisierje?.Site?.name || " "}</span>
            </div>
          </div>

          <div>
            <div className="d-flex gap-1 justify-content-between mt-1">
              <Button
                onClick={() => {}}
                variant="outline-danger"
                className="rounded-pill"
                size="sm"
              >
                <i className="bi bi-cone-striped"></i>
              </Button>

              <Button
                onClick={handleShowHRMModal}
                variant="outline-primary"
                className="rounded-pill"
                size="sm"
              >
                <i className="bi bi-clock-history"></i>
              </Button>
            </div>
            <table className="table table-sm table-hover table-responsive">
              <thead>
                <tr>
                  <th>Panne</th>
                  <th>HIM</th>
                  <th>NI</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {isloading && (
                  <tr>
                    <td colSpan={4} className="text-center">
                      {isloading && <LoaderSmall className="text-primary" />}
                    </td>
                  </tr>
                )}

                {!isloading && saisierje?.Saisiehim ? (
                  <>
                    {saisierje?.Saisiehim?.map((saisie_him, index) => (
                      <tr key={index}>
                        <td>{saisie_him?.Panne?.name}</td>
                        <td>{saisie_him?.him}</td>
                        <td>{saisie_him?.ni}</td>
                        <td></td>
                      </tr>
                    ))}
                    <tr className="">
                      <td></td>
                      <td>
                        <Badge pill bg="danger">
                          {saisierje?.Saisiehim?.reduce(
                            (acc, val) => (acc = acc + val?.him),
                            0
                          )}
                        </Badge>
                      </td>
                      <td>
                        <Badge pill bg="danger">
                          {saisierje?.Saisiehim?.reduce(
                            (acc, val) => (acc = acc + val?.ni),
                            0
                          )}
                        </Badge>
                      </td>
                      <td></td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">
                      <h6 className="text-center">Aucune panne n'ai saisie</h6>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* HRM **************************************/}
      <CumstomModal
        show={showHRMModal}
        handleClose={handleCloseHRMModal}
        title="HRM"
      >
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <FloatingLabel
              controlId="floatingInputName"
              label="HRM"
              className="mb-3"
            >
              <Form.Control
                type="number"
                step="0.1"
                min={0}
                placeholder="HRM"
                value={hrm}
                onChange={(e) => setHrm(e.target.value)}
              />
            </FloatingLabel>

            <div className="d-flex justify-content-end">
              <Button
                type="submit"
                variant="outline-primary"
                size="sm"
                // disabled={mutationCreate.isPending}
              >
                <div className="d-flex gap-1 align-items-center justify-content-end">
                  {/* {mutationCreate.isPending && <LoaderSmall />}  */}
                  <span>Enregistrer</span>
                </div>
              </Button>
            </div>
          </Form.Group>

          {/* <Error
  error={mutationCreate.isError ? mutationCreate.error.message : ""}
/> */}
        </Form>
      </CumstomModal>
    </>
  );
};

export default SaisieRjeTable;
