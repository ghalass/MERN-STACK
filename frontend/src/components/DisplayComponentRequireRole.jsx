// DisplayComponentRequireRole.js
import { useAuth } from "../context/Auth";

const DisplayComponentRequireRole = ({ children, roles = [] }) => {
  const { user } = useAuth();

  const checkPermission = user && roles?.includes(user?.role);

  return checkPermission && children;
};

export default DisplayComponentRequireRole;
