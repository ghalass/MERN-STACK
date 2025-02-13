import { Spinner } from "react-bootstrap";

const LoaderSpinner = ({ message = "Chargement ..." }) => {
  return (
    <div className="text-center mt-5">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Chargement...</span>
      </Spinner>
      <p>{message}</p>
      <p className="text-primary">Veuillez patienter</p>
    </div>
  );
};

export default LoaderSpinner;
