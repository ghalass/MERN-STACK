import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1>
        <i className="bi bi-exclamation-triangle text-warning"></i>
      </h1>
      <h1 className="text-danger fst-italic">404</h1>
      <h1>Page Not Found</h1>
      Allez à la
      <Link className="nav-link border btn rounded-pill px-4 py-1" to={"/"}>
        Page d'acceuil
      </Link>
    </div>
  );
};

export default Page404;
