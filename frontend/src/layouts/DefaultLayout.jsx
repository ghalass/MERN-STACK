import Header from "../components/Header";
import Sidebar from "../components/ui/Sidebar";

const DefaultLayout = ({ children }) => {
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

export default DefaultLayout;

const LIST_SIDEBAR = [
  { link: "/", title: "Acceuil", icon: "bi-speedometer" },
  {
    link: "/saisie_performances",
    title: "Saisie performances",
    icon: "bi-people",
  },
  {
    link: "/saisie_lubrifiants",
    title: "Saisie lubrifiants",
    icon: "bi-people",
  },
  { link: "/performances", title: "Performances", icon: "bi-people" },
];
