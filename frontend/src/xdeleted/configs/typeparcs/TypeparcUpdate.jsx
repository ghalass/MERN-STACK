import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import FormInput from "../../forms/FormInput";
import SubmitButton from "../../forms/SubmitButton";
import Error from "../../forms/Error";
import { yupResolver } from "@hookform/resolvers/yup";
import { typeparcValidation } from "../../../validations/typeparcValidation";
import { closeModal } from "../../../utils/modal";
import { useEffect } from "react";
import { useCrud } from "../../../hooks/useCrud";
import { useCrudStore } from "../../../store/crudStore";

const TypeparcUpdate = () => {
  const selectedItem = useCrudStore((state) => state.selectedItem);

  const queryClient = useQueryClient();

  const { update } = useCrud("/typeparcs");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(typeparcValidation),
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
      });
    }
  }, [selectedItem, reset]); // Déclenche reset() à chaque changement de selectedItem

  // Mutations;
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: update,
    onSuccess: () => {
      reset(); // ✅ Reset form after submission
      closeModal("typeparcsModal"); // ✅ Close modal after success

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["typeparcsList"] });
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

        <FormInput
          type="text"
          id="name"
          label="Nom du typeparc"
          placeholder="Nom du typeparc"
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

export default TypeparcUpdate;
