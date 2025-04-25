const FormRow = ({
  type,
  name,
  labelText,
  defaultValue = '',
  onChange,
  placeholder,
  min,
  max,
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
      />
    </div>
  );
};
export default FormRow;
