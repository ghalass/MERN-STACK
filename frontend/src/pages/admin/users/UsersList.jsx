import React, { lazy, useState } from "react";

/*** FUNCTIONS */
import fecthUsersQueryOptions from "../../../queryOptions/user/fecthUsersQueryOptions";
import { useQuery } from "@tanstack/react-query";

/*** COMPONENTS */
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import CumstomModal from "../../../components/ui/CumstomModal";
import LoaderSmall from "../../../components/ui/LoaderSmall";
const UserFormCreate = lazy(() => import("./UserFormCreate"));
const UserItem = lazy(() => import("./UserItem"));

const UsersList = () => {
  const {
    isLoading,
    isPending,
    isRefetching,
    error,
    data: users,
    isError,
  } = useQuery(fecthUsersQueryOptions());

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex gap-1 align-items-center">
            <div>
              <Badge pill bg="primary">
                {users?.length}
              </Badge>
            </div>
            {(isLoading || isPending || isRefetching) && <LoaderSmall />}
          </div>

          <span className="text-uppercase">Liste des utilisateurs</span>

          <Button
            onClick={handleShow}
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
              <th>Active</th>
              <th className="text-end"></th>
            </tr>
          </thead>
          <tbody>
            {users && users?.length > 0 ? (
              users?.map((user, index) => <UserItem key={index} user={user} />)
            ) : (
              <tr className="text-center">
                <td colSpan={5}>Aucune données n'est trouvées.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CumstomModal
        show={show}
        handleClose={handleClose}
        title="Ajouter un nouveau Utilisateur"
      >
        <UserFormCreate handleClose={handleClose} />
      </CumstomModal>
    </>
  );
};

export default UsersList;
