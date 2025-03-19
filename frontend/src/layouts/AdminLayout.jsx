import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <>
      <Header />

      <div className="row m-1">
        <div className="col-md-4 col-lg-3 col-xl-2">
          <AdminSidebar LIST_SIDEBAR={LIST_SIDEBAR} />
        </div>

        <div className="col-md-8 col-lg-9  col-xl-10">
          <div className="card">
            <div className="card-body">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;

const LIST_SIDEBAR = [
  { link: "/admin", title: "Dashboard", icon: "bi-speedometer" },
  { link: "/admin/users", title: "Utilisateurs", icon: "bi-people" },
  { link: "/admin/sites", title: "Sites", icon: "bi-geo-alt-fill" },
];
