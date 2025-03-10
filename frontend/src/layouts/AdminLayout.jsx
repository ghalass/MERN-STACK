import { useLocation, useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="row m-1">
      <div className="col-md-4 col-lg-3 col-xl-2">
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-column gap-1">
              {LIST_SIDEBAR.map((item, index) => (
                <button
                  key={index}
                  onClick={() => navigate(item.link)}
                  className={`btn btn-sm ${
                    location.pathname === item.link
                      ? "btn-primary"
                      : "btn-outline-primary"
                  } w-100 text-start`}
                >
                  <i className={`bi ${item?.icon} me-2`}></i>
                  {item.title}
                </button>
              ))}
            </div>
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

const LIST_SIDEBAR = [
  { link: "/admin", title: "Dashboard", icon: "bi-speedometer" },
  { link: "/admin/users", title: "Utilisateurs", icon: "bi-people" },
  { link: "/admin/sites", title: "Sites", icon: "bi-geo-alt-fill" },
];
