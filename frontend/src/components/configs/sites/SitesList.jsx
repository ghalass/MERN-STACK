import { useQuery } from "@tanstack/react-query";
import LoaderSmall from "../../ui/LoaderSmall";
import SiteItem from "./SiteItem";
import Error from "../../forms/Error";
import SitesModal from "./SitesModal";
import { openModal } from "../../../utils/modal";
import { useCrud } from "../../../hooks/useCrud";
import { useCrudStore } from "../../../store/crudStore";

const SitesList = () => {
  const setOp = useCrudStore((state) => state.setOp);

  const { getAll } = useCrud("/sites");

  const {
    isLoading,
    error,
    data: sites,
    isError,
  } = useQuery({
    queryKey: ["sitesList"],
    queryFn: getAll,
    retry: 1, // Reduce retries for faster error detection
    retryDelay: 2000, // Wait before retrying
  });

  return (
    <div className="card">
      <div className="card-header">
        <div className="d-flex justify-content-between align-items-center">
          <span>Sites ({sites?.length})</span>
          <span>
            <i
              onClick={() => {
                openModal("sitesModal");
                setOp("add");
              }}
              className="bi bi-plus-lg btn btn-sm btn-outline-success rounded-circle me-1"
            ></i>
          </span>
        </div>
      </div>
      <div className="card-body">
        {!isLoading && !isError && sites?.length === 0 && (
          <p>Aucune données disponible.</p>
        )}

        {isLoading && <LoaderSmall />}

        {isError && error && <Error error={error.message} />}

        {Array.isArray(sites) &&
          sites.length > 0 &&
          sites.map((site, index) => <SiteItem key={index} site={site} />)}
      </div>

      <SitesModal />
    </div>
  );
};

export default SitesList;
