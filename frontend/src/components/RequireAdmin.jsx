// RequireAdmin.js
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/Auth";

const RequireAdmin = () => {
  const { user } = useAuth();
  const location = useLocation();

  const checkPermission =
    user && (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN");

  return checkPermission ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAdmin;
