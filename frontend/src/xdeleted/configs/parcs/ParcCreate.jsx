import FormInput from "../../forms/FormInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCrud } from "../../../hooks/useCrud";
import { parcValidation } from "../../../validations/parcValidation";
import Error from "../../forms/Error";
import { closeModal } from "../../../utils/modal";
import SubmitButton from "../../forms/SubmitButton";
import FormSelect from "../../forms/FormSelect";

const ParcCreate = () => {
  const queryClient = useQueryClient();

  const { create } = useCrud("/parcs");

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
      name: "",
      typeparcId: "",
    },
  });

  // Mutations;
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: create,
    onSuccess: () => {
      reset(); // ✅ Reset form after submission
      closeModal("parcsModal"); // ✅ Close modal after success

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["parcsList"] });
    },
  });

  const onSubmit = async (data) => {
    mutate({ name: data.name, typeparcId: data.typeparcId });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <div className="d-flex justify-content-end">
          <SubmitButton
            disabled={isPending}
            type="submit"
            isProcessing={isPending}
            text="Ajouter"
            operation={"add"}
            cls="success"
            icon={null}
            fullWidth={false}
          />
        </div>
      </form>

      <Error error={isError ? error.message : ""} />
    </div>
  );
};

export default ParcCreate;
