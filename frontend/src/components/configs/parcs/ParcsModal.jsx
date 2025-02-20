import { closeModal } from "../../../utils/modal";

import ParcCreate from "./ParcCreate";
import ParcUpdate from "./ParcUpdate";
import ParcDelele from "./ParcDelete";

import { useCrudStore } from "../../../store/crudStore";

const ParcsModal = () => {
  const op = useCrudStore((state) => state.op);

  return (
    <div
      className="modal fade"
      id="parcsModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="parcsModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Gestion du parc</h1>
            <button
              onClick={() => {
                closeModal("parcsModal");
              }}
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {op === "add" && <ParcCreate />}

            {op === "update" && <ParcUpdate />}

            {op === "delete" && <ParcDelele />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcsModal;
