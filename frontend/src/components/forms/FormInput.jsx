const FormInput = ({
  type = "text",
  id,
  label,
  placeholder,
  register,
  errors = {},
  value,
  onChange,
  disabled = false,
}) => {
  // Vérifier si on utilise react-hook-form ou un input classique
  const inputProps = register
    ? { ...register(id) } // ✅ Gestion react-hook-form
    : { value: value || "", onChange: onChange }; // ✅ Gestion avec useState

  return (
    <div className="form-floating mb-2">
      <input
        type={type}
        className={`form-control ${errors[id] ? "is-invalid" : ""}`}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        {...inputProps}
      />
      <label htmlFor={id}>{label}</label>
      {errors[id] && (
        <div className="invalid-feedback">{errors[id].message}</div>
      )}
    </div>
  );
};

export default FormInput;
