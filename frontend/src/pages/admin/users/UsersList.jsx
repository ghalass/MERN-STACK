import React from "react";
import UserItem from "./UserItem";

const UsersList = () => {
  const users = [
    { id: 1, name: "med", role: "ADMIN" },
    { id: 1, name: "med", role: "ADMIN" },
    { id: 1, name: "med", role: "ADMIN" },
    { id: 1, name: "med", role: "ADMIN" },
  ];

  const handleCreateNew = () => {
    console.log("handleCreateNew");
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <small className="btn btn-sm btn-outline-danger rounded-pill">
          {users.length}
        </small>
        <span className="text-uppercase">Liste des utilisateurs</span>
        <button
          onClick={handleCreateNew}
          className="btn btn-sm btn-outline-primary rounded-pill "
        >
          <i className="bi bi-plus-lg"></i>
        </button>
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
            <th className="text-end"></th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users?.map((user, index) => <UserItem key={index} user={user} />)
          ) : (
            <tr className="text-center">
              <td colSpan={5}>Aucune données n'est trouvées.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
