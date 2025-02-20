import SubmitButton from "../../forms/SubmitButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCrud } from "../../../hooks/useCrud";
import { closeModal } from "../../../utils/modal";
import { useCrudStore } from "../../../store/crudStore";
import Error from "../../forms/Error";

const EnginDelete = () => {
  const queryClient = useQueryClient();

  const selectedItem = useCrudStore((state) => state.selectedItem);

  const { destroy } = useCrud("/engins");

  // Mutations;
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: destroy,
    onSuccess: () => {
      closeModal("enginsModal"); // ✅ Close modal after success
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["enginsList"] });
    },
  });

  const onSubmit = async () => {
    mutate();
  };

  return (
    <div>
      <div>
        <h5 className="text-danger">
          <i className="bi bi-exclamation-triangle"></i> Voulez-vous vraiment
          <span className="badge rounded-pill text-bg-danger mx-1 ">
            Supprimer
          </span>
          ce Engin ?
        </h5>
        <div className="text-primary text-center mt-4">
          <strong>{selectedItem?.name}</strong>
        </div>
        <SubmitButton
          onClick={onSubmit}
          isProcessing={isPending}
          operation={"delete"}
        />
      </div>
      <Error error={isError ? error.message : ""} />
    </div>
  );
};

export default EnginDelete;
