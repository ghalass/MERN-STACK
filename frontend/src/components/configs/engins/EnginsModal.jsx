import { closeModal } from "../../../utils/modal";

import EnginCreate from "./EnginCreate";
import EnginUpdate from "./EnginUpdate";
import EnginDelele from "./EnginDelete";

import { useCrudStore } from "../../../store/crudStore";

const EnginsModal = () => {
  const op = useCrudStore((state) => state.op);

  return (
    <div
      className="modal fade"
      id="enginsModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="enginsModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Gestion du parc</h1>
            <button
              onClick={() => {
                closeModal("enginsModal");
              }}
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {op === "add" && <EnginCreate />}

            {op === "update" && <EnginUpdate />}

            {op === "delete" && <EnginDelele />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnginsModal;
