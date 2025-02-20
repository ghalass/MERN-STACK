import { openModal } from "../../../utils/modal";
import { useCrudStore } from "../../../store/crudStore";

const EnginItem = ({ engin }) => {
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
              setSelectedItem(engin);
              openModal("enginsModal");
            }}
          ></i>
          <i
            className="bi bi-trash3 me-1 btn btn-sm btn-outline-danger rounded-circle"
            onClick={() => {
              setOp("delete");
              setSelectedItem(engin);
              openModal("enginsModal");
            }}
          ></i>
        </div>

        {engin?.name}
      </div>
    </div>
  );
};

export default EnginItem;
