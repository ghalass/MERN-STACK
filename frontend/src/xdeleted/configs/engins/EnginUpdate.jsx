import FormInput from "../../forms/FormInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCrud } from "../../../hooks/useCrud";
import { enginValidation } from "../../../validations/enginValidation";
import Error from "../../forms/Error";
import { closeModal } from "../../../utils/modal";
import SubmitButton from "../../forms/SubmitButton";
import FormSelect from "../../forms/FormSelect";
import { useCrudStore } from "../../../store/crudStore";
import { useEffect } from "react";

const ParcUpdate = () => {
  const selectedItem = useCrudStore((state) => state.selectedItem);

  // GET ALL PARCS
  const { getAll: getParcs } = useCrud("/parcs");
  const { data: parcs } = useQuery({
    queryKey: ["parcsList"],
    queryFn: getParcs,
    retry: 1, // Reduce retries for faster error detection
    retryDelay: 2000, // Wait before retrying
  });

  // GET ALL SITES
  const { getAll: getSites } = useCrud("/sites");
  const { data: sites } = useQuery({
    queryKey: ["sitesList"],
    queryFn: getSites,
    retry: 1, // Reduce retries for faster error detection
    retryDelay: 2000, // Wait before retrying
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(enginValidation),
    defaultValues: {
      id: selectedItem.id,
      name: selectedItem.name,
      parcId: selectedItem.parcId,
      siteId: selectedItem.siteId,
    },
  });

  useEffect(() => {
    if (selectedItem) {
      reset({
        id: selectedItem.id,
        name: selectedItem.name,
        parcId: selectedItem.parcId,
        siteId: selectedItem.siteId,
      });
    }
  }, [selectedItem, reset]); // Déclenche reset() à chaque changement de selectedItem

  // Mutations;
  const queryClient = useQueryClient();
  const { update } = useCrud("/engins");
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: update,
    onSuccess: () => {
      reset(); // ✅ Reset form after submission
      closeModal("enginsModal"); // ✅ Close modal after success

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["enginsList"] });
    },
  });

  const onSubmit = async (data) => {
    mutate({
      id: data.id,
      name: data.name,
      parcId: data.parcId,
      siteId: data.siteId,
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSelect
          id="parcId"
          label="Parc"
          register={register}
          errors={errors}
          options={parcs}
          text="Choisir un parc"
        />

        <FormSelect
          id="siteId"
          label="Site"
          register={register}
          errors={errors}
          options={sites}
          text="Choisir un site"
        />

        <FormInput
          type="text"
          id="name"
          label="Nom de l'engin"
          placeholder="Nom de l'engin"
          register={register}
          errors={errors}
        />

        <SubmitButton
          disabled={isPending}
          type="submit"
          isProcessing={isPending}
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
