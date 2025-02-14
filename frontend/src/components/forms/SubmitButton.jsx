const SubmitButton = ({
  operation = null,
  isProcessing,
  text = "No title",
  onClick,
  type = "submit",
  icon = null,
  cls = "primary",
  fullWidth = true,
}) => {
  switch (operation) {
    case "add":
      text = "Ajouter";
      icon = "plus-circle";
      cls = "primary";
      break;
    case "delete":
      text = "Supprimer";
      icon = "trash3";
      cls = "danger";
      break;
    case "update":
      text = "Modifier";
      icon = "pencil";
      cls = "success";
      break;
    default:
      break;
  }

  return (
    <button
      type={type}
      hidden={!operation}
      disabled={isProcessing}
      className={`btn btn-sm btn-outline-${cls} mt-2 ${
        fullWidth ? "w-100" : ""
      }`}
      onClick={onClick}
    >
      <div className="d-flex justify-content-center gap-2 align-items-center">
        {isProcessing && (
          <div className="spinner-border spinner-border-sm " role="status">
            <span className="visually-hidden">Processing...</span>
          </div>
        )}
        <div>
          <i className={`bi bi-${icon}`}></i> {text}
        </div>
      </div>
    </button>
  );
};

export default SubmitButton;
