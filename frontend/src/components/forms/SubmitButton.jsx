const SubmitButton = ({
  operation = null,
  isProcessing,
  text = "No title",
  onClick,
}) => {
  let title = text;
  let icon = "";
  let cls = "primary";
  switch (operation) {
    case "add":
      title = "Ajouter";
      icon = "plus-circle";
      cls = "primary";
      break;
    case "delete":
      title = "Supprimer";
      icon = "trash3";
      cls = "danger";
      break;
    case "update":
      title = "Modifier";
      icon = "pencil";
      cls = "success";
      break;
    default:
      break;
  }

  return (
    <button
      hidden={!operation}
      disabled={isProcessing}
      className={`btn btn-sm btn-outline-${cls} mt-2 w-100`}
      onClick={onClick}
    >
      <div className="d-flex justify-content-center gap-2 align-items-center">
        {isProcessing && (
          <div className="spinner-border spinner-border-sm " role="status">
            <span className="visually-hidden">Processing...</span>
          </div>
        )}
        <div>
          <i className={`bi bi-${icon}`}></i> {title}
        </div>
      </div>
    </button>
  );
};

export default SubmitButton;
