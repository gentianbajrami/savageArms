const FormRowSelect = ({
  name,
  labelText,
  list = [],
  defaultValue = '',
  onChange,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue || list[0] || ''}
        onChange={onChange}
      >
        {list.map((itemValue) => (
          <option key={itemValue} value={itemValue}>
            {itemValue}
          </option>
        ))}
      </select>
    </div>
  );
};
export default FormRowSelect;
