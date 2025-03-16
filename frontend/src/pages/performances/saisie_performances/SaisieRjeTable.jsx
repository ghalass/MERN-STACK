import LoaderSmall from "../../../components/ui/LoaderSmall";
import SaisieRjeTableItems from "./SaisieRjeTableItems";

const SaisieRjeTable = ({
  saisieRjeQuery,
  handleShowDeletePanneModal,
  setPanneToDelete,
}) => {
  return (
    <>
      <div className="card mt-1">
        <div className="card-body">
          <div>
            <table className="table table-sm table-hover table-responsive">
              <thead>
                <tr>
                  <th>Panne</th>
                  <th>HIM</th>
                  <th>NI</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {saisieRjeQuery.isLoading && (
                  <tr>
                    <td colSpan={4} className="text-center">
                      {saisieRjeQuery.isLoading && (
                        <LoaderSmall className="text-primary" />
                      )}
                    </td>
                  </tr>
                )}
                {!saisieRjeQuery.isLoading &&
                saisieRjeQuery.data?.[0]?.Saisiehim ? (
                  <SaisieRjeTableItems
                    saisieRjeQuery={saisieRjeQuery}
                    handleShowDeletePanneModal={handleShowDeletePanneModal}
                    setPanneToDelete={setPanneToDelete}
                  />
                ) : (
                  <>
                    {!saisieRjeQuery.isLoading && (
                      <tr>
                        <td colSpan={4} className="text-center">
                          <h6 className="text-center">
                            Aucune panne n'ai saisie
                          </h6>
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaisieRjeTable;
