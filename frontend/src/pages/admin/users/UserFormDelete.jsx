import React from "react";

const UserFormDelete = ({ user }) => {
  return (
    <div className="text-center">
      <strong className="text-danger">
        Êtes vous sûres de vouloir supprimer cet utilsateur?
      </strong>
      <hr />
      <p> Nom : {user?.name}</p>
      <p> Email : {user?.email}</p>
      <p> Rôle : {user?.role}</p>
    </div>
  );
};

export default UserFormDelete;
