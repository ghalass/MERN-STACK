import { closeModal } from "../../../utils/modal";

import TypeparcCreate from "./TypeparcCreate";
import TypeparcUpdate from "./TypeparcUpdate";
import TypeparcDelele from "./TypeparcDelete";

import { useCrudStore } from "../../../store/crudStore";

const TypeparcsModal = () => {
  const op = useCrudStore((state) => state.op);

  return (
    <div
      className="modal fade"
      id="typeparcsModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="typeparcsModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Gestion du typeparc</h1>
            <button
              onClick={() => {
                closeModal("typeparcsModal");
              }}
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {op === "add" && <TypeparcCreate />}

            {op === "update" && <TypeparcUpdate />}

            {op === "delete" && <TypeparcDelele />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeparcsModal;
