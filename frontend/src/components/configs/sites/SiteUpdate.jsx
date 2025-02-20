import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSite } from "../../../hooks/useSite";
import { useForm } from "react-hook-form";
import FormInput from "../../forms/FormInput";
import SubmitButton from "../../forms/SubmitButton";
import Error from "../../forms/Error";
import { yupResolver } from "@hookform/resolvers/yup";
import { siteValidation } from "../../../validations/siteValidation";
import { closeModal } from "../../../utils/modal";
import { useSitesStore } from "../../../store/siteStore";
import { useEffect } from "react";

const SiteUpdate = () => {
  const selectedSite = useSitesStore((state) => state.selectedSite);

  const queryClient = useQueryClient();

  const { update } = useSite();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(siteValidation),
    defaultValues: {
      id: selectedSite.id,
      name: selectedSite.name,
    },
  });

  useEffect(() => {
    if (selectedSite) {
      reset({
        id: selectedSite.id,
        name: selectedSite.name,
      });
    }
  }, [selectedSite, reset]); // Déclenche reset() à chaque changement de selectedSite

  // Mutations;
  const mutation = useMutation({
    mutationFn: update,
    onSuccess: () => {
      reset(); // ✅ Reset form after submission
      closeModal("sitesModal"); // ✅ Close modal after success

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["sitesList"] });
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    mutation.mutate(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
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
          operation={"update"}
          cls="success"
          icon={null}
          fullWidth={true}
        />
      </form>

      <Error error={mutation.isError ? mutation.error.message : ""} />
    </div>
  );
};

export default SiteUpdate;
