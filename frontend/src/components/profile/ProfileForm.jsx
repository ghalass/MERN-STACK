import React, { useEffect, useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import { useProfileStore } from "../../store/profileStore";

import Error from "../forms/Error";
import SubmitButton from "../../components/forms/SubmitButton";

const ProfileForm = () => {
  const selectedUser = useProfileStore((state) => state.selectedUser);
  const { userProfile } = useProfile();

  // Custom hook
  const { isLoading, error, saveProfileChange } = useProfile();

  const [formData, setFormData] = useState({
    id: selectedUser?.id || 0,
    name: selectedUser?.name || "",
    password: "", // Réinitialisation du mot de passe
    email: selectedUser?.email || "",
    role: selectedUser?.role || "",
    active: selectedUser?.active || false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveProfileChange(formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFormData({
      id: selectedUser?.id || 0,
      name: selectedUser?.name || "",
      password: "", // Réinitialisation du mot de passe
      email: selectedUser?.email || "",
      role: selectedUser?.role || "",
      active: selectedUser?.active || false,
    });
  }, [selectedUser]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-2">
          <input
            type="email"
            value={formData.email}
            className={`form-control`}
            placeholder="Email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled
          />
          <label htmlFor="email">E-mail</label>
        </div>

        <div className="form-floating mb-2">
          <input
            type="number"
            value={formData.id}
            className={`form-control`}
            placeholder="UserID"
            disabled
            hidden
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          />
          <label htmlFor="id">UserID</label>
        </div>

        <div className="form-floating mb-2">
          <input
            disabled={isLoading}
            type="text"
            value={formData.name}
            className={`form-control`}
            placeholder="Nom d'utilisateur"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <label htmlFor="name">Nom d'utilisateur</label>
        </div>

        <div className="form-check form-switch mb-2">
          <input
            disabled={isLoading}
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="userIsActive"
            checked={formData.active}
            onChange={(e) =>
              setFormData({
                ...formData,
                active: e.target.checked,
              })
            }
          />
          <label className="form-check-label" htmlFor="userIsActive">
            Active
          </label>
        </div>

        <div className="form-floating mb-2">
          <select
            disabled={
              isLoading ||
              !(
                userProfile?.role === "ADMIN" ||
                userProfile?.role === "SUPER_ADMIN"
              )
            }
            className="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option>Choisir un rôle</option>
            <option value="USER">Utilisateur</option>
            <option value="ADMIN">Administrateur</option>
            <option value="SUPER_ADMIN">Super Administrateur</option>
            <option value="UNASSIGNED">Visiteur</option>
          </select>
          <label htmlFor="floatingSelect">Rôle</label>
        </div>

        {/* <button
          type="submit"
          className="mt-2 btn btn-sm btn-outline-primary w-100"
        >
          Submit
        </button> */}
        <SubmitButton isProcessing={isLoading} operation={"update"} />
      </form>

      {/* ERRORS FROM SERVER */}
      <Error error={error} />
    </div>
  );
};

export default ProfileForm;
