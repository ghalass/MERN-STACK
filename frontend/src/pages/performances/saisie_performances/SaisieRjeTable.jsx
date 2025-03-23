import LoaderSmall from "../../../components/ui/LoaderSmall";
import useSaisieRjeStore from "../../../stores/useSaisieRjeStore";
import SaisieRjeTableItems from "./SaisieRjeTableItems";

const SaisieRjeTable = () => {
  const { saisieRjeQueryStore } = useSaisieRjeStore();

  const isloading = saisieRjeQueryStore?.isLoading;

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
            {isloading && (
              <tr>
                <td colSpan={6} className="text-center">
                  {isloading && <LoaderSmall className="text-primary" />}
                </td>
              </tr>
            )}
            {!isloading && saisieRjeQueryStore?.data?.[0]?.Saisiehim ? (
              <SaisieRjeTableItems />
            ) : (
              <>
                {!isloading && (
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
