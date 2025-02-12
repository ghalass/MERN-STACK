const LoaderSpinner = ({ message = "Chargement ..." }) => {
  return (
    <div className="text-center mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Chargement...</span>
      </div>
      <p>{message}</p>
      <p className="text-primary">Veuillez patienter</p>
    </div>
  );
};

export default LoaderSpinner;
