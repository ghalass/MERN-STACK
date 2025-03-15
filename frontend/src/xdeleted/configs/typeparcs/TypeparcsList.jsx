import { useQuery } from "@tanstack/react-query";
import LoaderSmall from "../../ui/LoaderSmall";
import TypeparcItem from "./TypeparcItem";
import Error from "../../forms/Error";
import TypeparcsModal from "./TypeparcsModal";
import { openModal } from "../../../utils/modal";

import { useCrud } from "../../../hooks/useCrud";
import { useCrudStore } from "../../../store/crudStore";

const TypeparcsList = () => {
  const setOp = useCrudStore((state) => state.setOp);

  const { getAll } = useCrud("/typeparcs");

  const {
    isLoading,
    error,
    data: typeparcs,
    isError,
  } = useQuery({
    queryKey: ["typeparcsList"],
    queryFn: getAll,
    retry: 1, // Reduce retries for faster error detection
    retryDelay: 2000, // Wait before retrying
  });

  return (
    <div className="card">
      <div className="card-header">
        <div className="d-flex justify-content-between align-items-center">
          <span>Typeparcs ({typeparcs?.length})</span>
          <span>
            <i
              onClick={() => {
                openModal("typeparcsModal");
                setOp("add");
              }}
              className="bi bi-plus-lg btn btn-sm btn-outline-success rounded-circle me-1"
            ></i>
          </span>
        </div>
      </div>
      <div className="card-body">
        {!isLoading && !isError && typeparcs?.length === 0 && (
          <p>Aucune données disponible.</p>
        )}

        {isLoading && <LoaderSmall />}

        {isError && error && <Error error={error.message} />}

        {Array.isArray(typeparcs) &&
          typeparcs.length > 0 &&
          typeparcs.map((typeparc, index) => (
            <TypeparcItem key={index} typeparc={typeparc} />
          ))}
      </div>

      <TypeparcsModal />
    </div>
  );
};

export default TypeparcsList;
