import { useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "../pages/admin/AdminSidebar";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="row m-1">
      <div className="col-md-4 col-lg-3 col-xl-2">
        <div className="card mb-1">
          <div className="card-body">
            <AdminSidebar />
          </div>
        </div>
      </div>

      <div className="col-md-8 col-lg-9  col-xl-10">
        <div className="card">
          <div className="card-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
