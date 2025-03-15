import { Spinner } from "react-bootstrap";

const LoaderSpinner = ({ message = "Chargement ..." }) => {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
        <p>{message}</p>
        <p className="text-primary">Veuillez patienter</p>
      </div>
    </div>
  );
};

export default LoaderSpinner;
