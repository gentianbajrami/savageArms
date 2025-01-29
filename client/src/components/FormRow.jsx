const FormRow = ({
  type,
  name,
  labelText,
  defaultValue,
  onChange,
  placeholder,
}) => {
  return (
    <div className="form-row">
      <label
        htmlFor={name}
        className="form-label"
      >
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        className="form-input"
        defaultValue={defaultValue || ''}
        required
        placeholder={placeholder}
      ></input>
    </div>
  );
};

export default FormRow;
