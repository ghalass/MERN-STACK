import React, { lazy } from "react";

/*** FUNCTIONS */
import { useQuery } from "@tanstack/react-query";

/*** COMPONENTS */
import { Button, Badge } from "react-bootstrap";
import useSiteStore from "../../../stores/useSiteStore";
import { fecthSitesQuery } from "../../../hooks/useSites";

// COMPONENTS
const CumstomModal = lazy(() => import("../../../components/ui/CumstomModal"));
const LoaderSmall = lazy(() => import("../../../components/ui/LoaderSmall"));
const SiteFormDelete = lazy(() => import("./SiteFormDelete"));
const SiteFormUpdate = lazy(() => import("./SiteFormUpdate"));
const SiteFormCreate = lazy(() => import("./SiteFormCreate"));
const SiteItem = lazy(() => import("./SiteItem"));

const SitesPage = () => {
  const getAllQuery = useQuery(fecthSitesQuery());

  /** START ZUSTAND STORE */
  const {
    // CRETAE
    isShowCreateModal,
    openCreateModal,
    closeCreateModal,
    // EDIT
    isShowEditModal,
    closeEditModal,
    // DELETE
    isShowDeleteModal,
    closeDeleteModal,
  } = useSiteStore();
  /** END ZUSTAND STORE */

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center"></div>
        <div className="my-1 d-flex justify-content-between">
          <div className="d-flex gap-1 text-uppercase">
            Liste des sites
            <div>
              <Badge pill bg="primary">
                {getAllQuery.data?.length}
              </Badge>
            </div>
            {(getAllQuery.isLoading ||
              getAllQuery.isPending ||
              getAllQuery.isRefetching) && (
              <LoaderSmall className="text-primary" />
            )}
          </div>

          <div className="d-flex gap-1 justify-content-end">
            <input
              type="search"
              placeholder="Chercher..."
              className="form-control form-control-sm text-center"
            />

            <Button
              onClick={openCreateModal}
              variant="outline-primary"
              className="rounded-pill"
              size="sm"
            >
              <i className="bi bi-plus-lg"></i>
            </Button>
          </div>
        </div>

        <table className="table table-hover table-sm table-responsive">
          <thead>
            <tr>
              <th>Nom</th>
              <th className="text-end"></th>
            </tr>
          </thead>
          <tbody>
            {getAllQuery.data && getAllQuery.data?.length > 0 ? (
              getAllQuery.data?.map((item, index) => (
                <SiteItem key={index} item={item} />
              ))
            ) : (
              <tr className="text-center">
                <td colSpan={5}>Aucune données n'est trouvées.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CREATE ********************************************************/}
      <CumstomModal
        show={isShowCreateModal}
        handleClose={closeCreateModal}
        title="Ajouter un nouveau Utilisateur"
      >
        <SiteFormCreate />
      </CumstomModal>

      {/* UPDATE ********************************************************/}
      <CumstomModal
        show={isShowEditModal}
        handleClose={closeEditModal}
        title="Modifier un utilisateur"
      >
        <SiteFormUpdate />
      </CumstomModal>

      {/* DELETE ********************************************************/}
      <CumstomModal
        show={isShowDeleteModal}
        handleClose={closeDeleteModal}
        title="Supprimer un utilisateur"
      >
        <SiteFormDelete />
      </CumstomModal>
    </>
  );
};

export default SitesPage;
