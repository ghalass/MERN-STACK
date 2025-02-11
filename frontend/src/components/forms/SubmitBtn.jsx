const SubmitBtn = ({ text, isLoading }) => {
  return (
    <button disabled={isLoading} className="btn btn-outline-primary w-100">
      <div className="d-flex justify-content-center align-items-center gap-2">
        {isLoading && (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        <div>{text}</div>
      </div>
    </button>
  );
};

export default SubmitBtn;
