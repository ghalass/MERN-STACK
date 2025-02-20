import { useQuery } from "@tanstack/react-query";
import LoaderSmall from "../../ui/LoaderSmall";
import ParcItem from "./ParcItem";
import Error from "../../forms/Error";
import ParcsModal from "./ParcsModal";
import { openModal } from "../../../utils/modal";
import { useCrud } from "../../../hooks/useCrud";
import { useCrudStore } from "../../../store/crudStore";

const ParcsList = () => {
  const setOp = useCrudStore((state) => state.setOp);

  const { getAll } = useCrud("/parcs");

  const {
    isLoading,
    error,
    data: parcs,
    isError,
  } = useQuery({
    queryKey: ["parcsList"],
    queryFn: getAll,
    retry: 1, // Reduce retries for faster error detection
    retryDelay: 2000, // Wait before retrying
  });

  return (
    <div className="card">
      <div className="card-header">
        <div className="d-flex justify-content-between align-items-center">
          <span>Parcs ({parcs?.length})</span>
          <span>
            <i
              onClick={() => {
                openModal("parcsModal");
                setOp("add");
              }}
              className="bi bi-plus-lg btn btn-sm btn-outline-success rounded-circle me-1"
            ></i>
          </span>
        </div>
      </div>
      <div className="card-body">
        {!isLoading && !isError && parcs?.length === 0 && (
          <p>Aucune données disponible.</p>
        )}

        {isLoading && <LoaderSmall />}

        {isError && error && <Error error={error.message} />}

        {Array.isArray(parcs) &&
          parcs.length > 0 &&
          parcs.map((parc, index) => <ParcItem key={index} parc={parc} />)}
      </div>

      <ParcsModal />
    </div>
  );
};

export default ParcsList;
