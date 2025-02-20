import React from "react";
import SubmitButton from "../../forms/SubmitButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSite } from "../../../hooks/useSite";
import { closeModal } from "../../../utils/modal";
import { useSitesStore } from "../../../store/siteStore";
import Error from "../../forms/Error";

const SiteDelete = () => {
  const queryClient = useQueryClient();

  const selectedSite = useSitesStore((state) => state.selectedSite);

  const { destroy } = useSite();

  // Mutations;
  const { mutate, isPending, data, isError, error } = useMutation({
    mutationFn: destroy,
    onSuccess: () => {
      closeModal("sitesModal"); // ✅ Close modal after success
      console.log(data);

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["sitesList"] });
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
          ce Site ?
        </h5>
        <div className="text-primary text-center mt-4">
          <strong>{selectedSite?.name}</strong>
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

export default SiteDelete;
