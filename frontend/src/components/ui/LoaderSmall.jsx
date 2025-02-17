import { Spinner } from "react-bootstrap";

const LoaderSmall = () => {
  return (
    <div className="text-center">
      <div
        className="spinner-border spinner-border-sm text-primary"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoaderSmall;
