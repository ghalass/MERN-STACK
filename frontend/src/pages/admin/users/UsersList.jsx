import React, { lazy, useState } from "react";

/*** FUNCTIONS */
import fecthUsersQueryOptions from "../../../queryOptions/user/fecthUsersQueryOptions";
import { useQuery } from "@tanstack/react-query";

/*** COMPONENTS */
import { Button, Badge } from "react-bootstrap";
import CumstomModal from "../../../components/ui/CumstomModal";
import LoaderSmall from "../../../components/ui/LoaderSmall";
import UserFormDelete from "./UserFormDelete";
import UserFormUpdate from "./UserFormUpdate";
const UserFormCreate = lazy(() => import("./UserFormCreate"));
const UserItem = lazy(() => import("./UserItem"));

const UsersList = () => {
  const userQuery = useQuery(fecthUsersQueryOptions());

  const [showCreateModal, setShowCreateModal] = useState(false);
  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex gap-1 align-items-center">
            <div>
              <Badge pill bg="primary">
                {userQuery.data?.length}
              </Badge>
            </div>
            {(userQuery.isLoading ||
              userQuery.isPending ||
              userQuery.isRefetching) && <LoaderSmall />}
          </div>

          <span className="text-uppercase">Liste des utilisateurs</span>

          <Button
            onClick={handleShowCreateModal}
            variant="outline-primary"
            className="rounded-pill"
            size="sm"
          >
            <i className="bi bi-plus-lg"></i>
          </Button>
        </div>
        <div className="my-1 d-flex justify-content-end">
          <input
            type="search"
            placeholder="Chercher..."
            className="form-control form-control-sm w-50 text-center"
          />
        </div>

        <table className="table table-hover table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th className="text-center">Active</th>
              <th className="text-end"></th>
            </tr>
          </thead>
          <tbody>
            {userQuery.data && userQuery.data?.length > 0 ? (
              userQuery.data?.map((user, index) => (
                <UserItem
                  key={index}
                  user={user}
                  setSelectedUser={setSelectedUser}
                  handleShowEditModal={handleShowEditModal}
                  handleShowDeleteModal={handleShowDeleteModal}
                />
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
        show={showCreateModal}
        handleClose={handleCloseCreateModal}
        title="Ajouter un nouveau Utilisateur"
      >
        <UserFormCreate handleClose={handleCloseCreateModal} />
      </CumstomModal>

      {/* UPDATE ********************************************************/}
      <CumstomModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        title="Modifier un utilisateur"
      >
        <UserFormUpdate
          handleClose={handleCloseEditModal}
          currentUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </CumstomModal>

      {/* DELETE ********************************************************/}
      <CumstomModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        title="Supprimer un utilisateur"
      >
        <UserFormDelete
          handleClose={handleCloseDeleteModal}
          currentUser={selectedUser}
        />
      </CumstomModal>
    </>
  );
};

export default UsersList;
