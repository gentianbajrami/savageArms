const FormRow = ({
  type,
  name,
  labelText,
  defaultValue,
  onChange,
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
      ></input>
    </div>
  );
};

export default FormRow;
