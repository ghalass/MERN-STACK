import { openModal } from "../../../utils/modal";
import { useSitesStore } from "../../../store/siteStore";

const SiteItem = ({ site }) => {
  const setOp = useSitesStore((state) => state.setOp);
  const setSelectedSite = useSitesStore((state) => state.setSelectedSite);

  return (
    <div className="d-flex align-items-center">
      <div className="mb-1">
        <div className="position-relative d-inline-block">
          <i
            className="bi bi-pencil me-1 btn btn-sm btn-outline-secondary rounded-circle"
            onClick={() => {
              setOp("update");
              setSelectedSite(site);
              openModal("sitesModal");
            }}
          ></i>
          <i
            className="bi bi-trash3 me-1 btn btn-sm btn-outline-danger rounded-circle"
            onClick={() => {
              setOp("delete");
              setSelectedSite(site);
              openModal("sitesModal");
            }}
          ></i>
        </div>

        {site.name}
      </div>
    </div>
  );
};

export default SiteItem;
