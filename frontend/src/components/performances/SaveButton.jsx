import { useMutation } from "@tanstack/react-query";
import { useCrud } from "../../hooks/useCrud";
import useAuthStore from "../../store/authStore";
import { useSaisierjeStore } from "../../store/saisierjeStore";
import { apiRequest } from "../../utils/apiRequest";
import toast from "react-hot-toast";

const SaveButton = () => {
  const user = useAuthStore((state) => state.user);

  const hrmSelects = useSaisierjeStore.getState()?.hrmSelects;
  const saisiehrmId = useSaisierjeStore.getState()?.saisiehrm?.id;
  const pannes = useSaisierjeStore.getState()?.pannesLists;
  const saisiehrm = useSaisierjeStore((state) => state.saisiehrm);

  // Mutations;
  const { create } = useCrud("/saisiehrm/saveSaisiehrm");
  const { mutate } = useMutation({
    mutationFn: create,
    onSuccess: () => {
      toast.success("Saisie avec succès!");
    },
  });

  const saveAll = async () => {
    const hrmToSaisie = {
      du: hrmSelects.du,
      enginId: parseInt(hrmSelects.enginId),
      siteId: parseInt(hrmSelects.siteId),
      hrm: parseFloat(saisiehrm?.hrm) || 0,
    };

    // saisie hrm
    if (saisiehrmId) {
      // update
      console.log("update saisie HRM");
    } else {
      // create
      console.log("create saisie HRM");
      try {
        // const response = await apiRequest(
        //   `/saisiehrm/createSaisieHrm`,
        //   "POST",
        //   hrmToSaisie,
        //   user?.token
        // );
        mutate(hrmToSaisie);
        if (response) {
          useSaisierjeStore.setState((state) => ({
            saisiehrm: {
              ...state.saisiehrm,
              id: response?.id,
              du: response?.du,
              enginId: response?.enginId,
              siteId: response?.siteId,
              hrm: response?.hrm,
            },
          }));
        }
      } catch (error) {
        console.error("Erreur lors de la requête :", error);
        return;
      }
    }
    // saisie him
    if (saisiehrm?.id) {
      pannes?.map(async (panne) => {
        try {
          const himToSaisie = {
            panneId: panne.panneId,
            him: panne.him,
            ni: panne.ni,
            saisiehrmId: saisiehrm?.id,
          };

          // console.log(himToSaisie);

          const response = await apiRequest(
            `/saisiehrm/createSaisieHim`,
            "POST",
            himToSaisie,
            user?.token
          );
          console.log(response);
        } catch (error) {
          console.error("Erreur lors de la requête :", error);
        }
      });
    }
  };

  return (
    <div>
      <div>
        {saisiehrm?.id !== undefined ? (
          <div>
            <div className="alert alert-info">
              <i className="bi bi-check-circle me-2"></i>Saisie dèjà faite
            </div>
            <div>
              <button
                onClick={saveAll}
                className="btn btn-sm btn-outline-info mb-1 w-100"
              >
                <i className="bi bi-floppy me-2"></i>Enregistrer les
                modifications
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center ">
            <button
              onClick={saveAll}
              className="btn btn-sm btn-outline-success mb-1 w-100"
            >
              <i className="bi bi-floppy me-2"></i>Enregistrer la saisie
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaveButton;
