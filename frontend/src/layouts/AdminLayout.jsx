import Header from "../components/Header";
import Sidebar from "../components/ui/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <>
      <Header />

      <div className="row m-1">
        <div className="col-md-4 col-lg-3 col-xl-2">
          <Sidebar LIST_SIDEBAR={LIST_SIDEBAR} />
        </div>

        <div className="col-md-8 col-lg-9  col-xl-10">
          <div className="card">
            <div className="card-body">{children}</div>
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
