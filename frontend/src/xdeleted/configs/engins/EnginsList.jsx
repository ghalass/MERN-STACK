import { useQuery } from "@tanstack/react-query";
import LoaderSmall from "../../ui/LoaderSmall";
import EnginItem from "./EnginItem";
import Error from "../../forms/Error";
import EnginsModal from "./EnginsModal";
import { openModal } from "../../../utils/modal";
import { useCrud } from "../../../hooks/useCrud";
import { useCrudStore } from "../../../store/crudStore";

const EnginsList = () => {
  const setOp = useCrudStore((state) => state.setOp);
  const setSelectedItem = useCrudStore((state) => state.setSelectedItem);

  const { getAll } = useCrud("/engins");

  const {
    isLoading,
    error,
    data: engins,
    isError,
  } = useQuery({
    queryKey: ["enginsList"],
    queryFn: getAll,
    retry: 1, // Reduce retries for faster error detection
    retryDelay: 2000, // Wait before retrying
  });

  return (
    <div className="card">
      <div className="card-header">
        <div className="d-flex justify-content-between align-items-center">
          <span>Engins ({engins?.length})</span>
          <span>
            <i
              onClick={() => {
                setOp("add");
                setSelectedItem(null);
                openModal("enginsModal");
              }}
              className="bi bi-plus-lg btn btn-sm btn-outline-success rounded-circle me-1"
            ></i>
          </span>
        </div>
      </div>
      <div
        className="card-body  overflow-auto custom-scrollbar"
        style={{ height: "400px" }}
      >
        {!isLoading && !isError && engins?.length === 0 && (
          <p>Aucune données disponible.</p>
        )}

        {isLoading && <LoaderSmall />}

        {isError && error && <Error error={error.message} />}

        {Array.isArray(engins) &&
          engins.length > 0 &&
          engins.map((engin, index) => <EnginItem key={index} engin={engin} />)}
      </div>

      <EnginsModal />
    </div>
  );
};

export default EnginsList;
