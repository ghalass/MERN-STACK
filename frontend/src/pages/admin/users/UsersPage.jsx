import React, { lazy } from "react";

/*** FUNCTIONS */
import { useQuery } from "@tanstack/react-query";

/*** COMPONENTS */
import { Button, Badge } from "react-bootstrap";
import useUserStore from "../../../stores/useUserStore";
import { fecthUsersQuery } from "../../../hooks/useUsers";

// COMPONENTS
const CumstomModal = lazy(() => import("../../../components/ui/CumstomModal"));
const LoaderSmall = lazy(() => import("../../../components/ui/LoaderSmall"));
const UserFormDelete = lazy(() => import("./UserFormDelete"));
const UserFormUpdate = lazy(() => import("./UserFormUpdate"));
const UserFormCreate = lazy(() => import("./UserFormCreate"));
const UserItem = lazy(() => import("./UserItem"));

const UsersPage = () => {
  const userQuery = useQuery(fecthUsersQuery());

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
  } = useUserStore();
  /** END ZUSTAND STORE */

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center"></div>
        <div className="my-1 d-flex justify-content-between">
          <div className="d-flex gap-1 text-uppercase">
            Liste des utilisateurs
            <div>
              <Badge pill bg="primary">
                {userQuery.data?.length}
              </Badge>
            </div>
            {(userQuery.isLoading ||
              userQuery.isPending ||
              userQuery.isRefetching) && (
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
              <th>#</th>
              <th>Nom</th>
              <th>Email</th>
              <th className="d-none d-md-block">Rôle</th>
              <th className="text-center">Active</th>
              <th className="text-end"></th>
            </tr>
          </thead>
          <tbody>
            {userQuery.data && userQuery.data?.length > 0 ? (
              userQuery.data?.map((user, index) => (
                <UserItem key={index} user={user} />
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
        <UserFormCreate />
      </CumstomModal>

      {/* UPDATE ********************************************************/}
      <CumstomModal
        show={isShowEditModal}
        handleClose={closeEditModal}
        title="Modifier un utilisateur"
      >
        <UserFormUpdate />
      </CumstomModal>

      {/* DELETE ********************************************************/}
      <CumstomModal
        show={isShowDeleteModal}
        handleClose={closeDeleteModal}
        title="Supprimer un utilisateur"
      >
        <UserFormDelete />
      </CumstomModal>
    </>
  );
};

export default UsersPage;
