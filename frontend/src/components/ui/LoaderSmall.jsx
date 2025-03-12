import { Spinner } from "react-bootstrap";

const LoaderSmall = () => {
  return (
    <div className="">
      <div className="spinner-border spinner-border-sm " role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoaderSmall;
