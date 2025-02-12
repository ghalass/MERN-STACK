const Error = ({ error }) => {
  return (
    <>
      {error && (
        <div className="alert alert-danger mt-2 py-2" role="alert">
          <i className="bi bi-exclamation-circle"></i> {error}
        </div>
      )}
    </>
  );
};

export default Error;
