import { openModal } from "../../../utils/modal";
import { useCrudStore } from "../../../store/crudStore";

const TypeparcItem = ({ typeparc }) => {
  const setOp = useCrudStore((state) => state.setOp);
  const setSelectedItem = useCrudStore((state) => state.setSelectedItem);

  return (
    <div className="d-flex align-items-center">
      <div className="mb-1">
        <div className="position-relative d-inline-block">
          <i
            className="bi bi-pencil me-1 btn btn-sm btn-outline-secondary rounded-circle"
            onClick={() => {
              setOp("update");
              setSelectedItem(typeparc);
              openModal("typeparcsModal");
            }}
          ></i>
          <i
            className="bi bi-trash3 me-1 btn btn-sm btn-outline-danger rounded-circle"
            onClick={() => {
              setOp("delete");
              setSelectedItem(typeparc);
              openModal("typeparcsModal");
            }}
          ></i>
        </div>

        {typeparc.name}
      </div>
    </div>
  );
};

export default TypeparcItem;
