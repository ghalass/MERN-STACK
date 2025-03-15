import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import FormInput from "../../forms/FormInput";
import SubmitButton from "../../forms/SubmitButton";
import Error from "../../forms/Error";
import { yupResolver } from "@hookform/resolvers/yup";
import { parcValidation } from "../../../validations/parcValidation";
import { closeModal } from "../../../utils/modal";
import { useEffect } from "react";
import { useCrudStore } from "../../../store/crudStore";
import { useCrud } from "../../../hooks/useCrud";
import FormSelect from "../../forms/FormSelect";

const ParcUpdate = () => {
  const selectedItem = useCrudStore((state) => state.selectedItem);

  const queryClient = useQueryClient();

  const { update } = useCrud("/parcs");

  const { getAll } = useCrud("/typeparcs");

  const { data: typeparcs } = useQuery({
    queryKey: ["typeparcsList"],
    queryFn: getAll,
    retry: 1, // Reduce retries for faster error detection
    retryDelay: 2000, // Wait before retrying
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(parcValidation),
    defaultValues: {
      id: selectedItem.id,
      name: selectedItem.name,
    },
  });

  useEffect(() => {
    if (selectedItem) {
      reset({
        id: selectedItem.id,
        name: selectedItem.name,
        typeparcId: selectedItem.typeparcId,
      });
    }
  }, [selectedItem, reset]); // Déclenche reset() à chaque changement de selectedItem

  // Mutations;
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: update,
    onSuccess: () => {
      reset(); // ✅ Reset form after submission
      closeModal("parcsModal"); // ✅ Close modal after success

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["parcsList"] });
    },
  });

  const onSubmit = async (data) => {
    mutate(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          hidden
          type="number"
          id="id"
          label="Id"
          placeholder="Id"
          register={register}
          errors={errors}
        />

        <FormSelect
          id="typeparcId"
          label="Type de parc"
          register={register}
          errors={errors}
          options={typeparcs}
          text="Choisir un type de parc"
        />

        <FormInput
          type="text"
          id="name"
          label="Nom du parc"
          placeholder="Nom du parc"
          register={register}
          errors={errors}
        />

        <SubmitButton
          disabled={isPending}
          type="submit"
          isProcessing={isPending}
          text="Ajouter"
          operation={"update"}
          cls="success"
          icon={null}
          fullWidth={true}
        />
      </form>

      <Error error={isError ? error.message : ""} />
    </div>
  );
};

export default ParcUpdate;
