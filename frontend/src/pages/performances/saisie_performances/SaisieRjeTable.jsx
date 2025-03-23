import LoaderSmall from "../../../components/ui/LoaderSmall";
import SaisieRjeTableItems from "./SaisieRjeTableItems";

const SaisieRjeTable = ({
  saisieRjeQuery,
  handleShowDeletePanneModal,
  setPanneToDelete,
  handleShowHuileModal,
}) => {
  return (
    <>
      <div className="d-flex justify-content-center">
        <table className="table table-sm table-hover table-responsive w-auto">
          <thead>
            <tr>
              <th>Panne</th>
              <th>Type</th>
              <th className="text-center">HIM</th>
              <th className="text-center">NI</th>
              <th className="text-center">Lubrifiants</th>
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
                handleShowHuileModal={handleShowHuileModal}
              />
            ) : (
              <>
                {!saisieRjeQuery.isLoading && (
                  <tr>
                    <td colSpan={6} className="text-center">
                      <h6 className="text-center">Aucune panne n'ai saisie</h6>
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SaisieRjeTable;
