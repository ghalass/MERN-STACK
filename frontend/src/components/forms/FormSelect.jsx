const FormSelect = ({
  id,
  label,
  options = [],
  register,
  errors = {},
  value,
  onChange,
  disabled = false,
  hidden = false,
  text = "Sélectionnez une option",
}) => {
  // Vérifier si on utilise react-hook-form ou un select classique
  const selectProps = register
    ? { ...register(id) } // Gestion react-hook-form
    : { value: value || "", onChange: onChange }; // Gestion avec useState

  // Si le select est caché, retourner un champ input hidden
  if (hidden) {
    return <input type="hidden" id={id} {...selectProps} />;
  }

  return (
    <div className="form-floating mb-2">
      <select
        className={`form-select ${errors[id] ? "is-invalid" : ""}`}
        id={id}
        disabled={disabled}
        {...selectProps}
      >
        <option value="">{text}</option>
        {options.map((option, index) => (
          <option key={index} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <label htmlFor={id}>{label}</label>
      {errors[id] && (
        <div className="invalid-feedback">{errors[id].message}</div>
      )}
    </div>
  );
};

export default FormSelect;
