import { openModal } from "../../../utils/modal";

const SiteItem = ({ site }) => {
  return (
    <div className="d-flex justify-content-between cardItem">
      <div>{site.name}</div>
      <div className="crudOperation">
        <i
          onClick={() => openModal("sitesModal")}
          className="bi bi-pencil btn btn-sm btn-outline-info rounded-circle me-1"
        ></i>
        <i className="bi bi-trash3 btn btn-sm btn-outline-danger rounded-circle me-1"></i>
      </div>
    </div>
  );
};

export default SiteItem;
