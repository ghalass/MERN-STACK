import React from "react";
import FormInput from "../../forms/FormInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSite } from "../../../hooks/useSite";
import { siteValidation } from "../../../validations/siteValidation";
import Error from "../../forms/Error";
import { closeModal } from "../../../utils/modal";
import SubmitButton from "../../forms/SubmitButton";

const SiteCreate = () => {
  const queryClient = useQueryClient();

  const { create } = useSite();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(siteValidation),
    defaultValues: {
      name: "",
    },
  });

  // Mutations;
  const mutation = useMutation({
    mutationFn: create,
    onSuccess: () => {
      reset(); // ✅ Reset form after submission
      closeModal("sitesModal"); // ✅ Close modal after success

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["sitesList"] });
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
          label="Nom du site"
          placeholder="Nom du site"
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

export default SiteCreate;
