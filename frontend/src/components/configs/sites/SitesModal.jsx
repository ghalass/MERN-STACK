import React from "react";
import { closeModal } from "../../../utils/modal";
import FormInput from "../../forms/FormInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSite } from "../../../hooks/useSite";
import Error from "../../forms/Error";

import { siteValidation } from "../../../validations/siteValidation";

const SitesModal = () => {
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
    <div
      className="modal fade"
      id="sitesModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="sitesModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Gestion du site</h1>
            <button
              onClick={() => {
                closeModal("sitesModal");
              }}
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                type="text"
                id="name"
                label="Nom du site"
                placeholder="Nom du site"
                register={register}
                errors={errors}
              />

              <button
                type="submit"
                disabled={mutation.isPending}
                className="btn btn-sm btn-outline-success w-100"
              >
                {mutation.isPending ? "Saving..." : "Save"}
              </button>

              {/* <SubmitButton
                disabled={isLoading}
                type="submit"
                isProcessing={isLoading}
                text="Modifier"
                operation={"non"}
                icon="bi bi-upload"
                cls="danger"
                fullWidth={false}
              /> */}
            </form>

            <Error error={mutation.isError ? mutation.error.message : ""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitesModal;
