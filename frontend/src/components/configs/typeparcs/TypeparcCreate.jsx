import FormInput from "../../forms/FormInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { typeparcValidation } from "../../../validations/typeparcValidation";
import Error from "../../forms/Error";
import { closeModal } from "../../../utils/modal";
import SubmitButton from "../../forms/SubmitButton";

import { useCrud } from "../../../hooks/useCrud";

const TypeparcCreate = () => {
  const queryClient = useQueryClient();

  const { create } = useCrud("/typeparcs");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(typeparcValidation),
    defaultValues: {
      name: "",
    },
  });

  // Mutations;
  const mutation = useMutation({
    mutationFn: create,
    onSuccess: () => {
      reset(); // ✅ Reset form after submission
      closeModal("typeparcsModal"); // ✅ Close modal after success

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["typeparcsList"] });
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate({ name: data.name });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="text"
          id="name"
          label="Nom du typeparc"
          placeholder="Nom du typeparc"
          register={register}
          errors={errors}
        />

        <SubmitButton
          disabled={mutation.isPending}
          type="submit"
          isProcessing={mutation.isPending}
          text="Ajouter"
          operation={"add"}
          cls="success"
          icon={null}
          fullWidth={true}
        />
      </form>

      <Error error={mutation.isError ? mutation.error.message : ""} />
    </div>
  );
};

export default TypeparcCreate;
