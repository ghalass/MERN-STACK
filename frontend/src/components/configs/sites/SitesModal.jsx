import { closeModal } from "../../../utils/modal";

import SiteCreate from "./SiteCreate";
import SiteUpdate from "./SiteUpdate";
import SiteDelele from "./SiteDelete";

import { useSitesStore } from "../../../store/siteStore";

const SitesModal = () => {
  const op = useSitesStore((state) => state.op);

  return (
    <div
      className="modal fade"
      id="sitesModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="sitesModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Gestion du site</h1>
            <button
              onClick={() => {
                closeModal("sitesModal");
              }}
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {op === "add" && <SiteCreate />}

            {op === "update" && <SiteUpdate />}

            {op === "delete" && <SiteDelele />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitesModal;
