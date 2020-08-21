import React from "react";

const Datalist = ({
  name,
  label,
  listID,
  listArray,
  value,
  error,
  style,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name} style={style.label}>
        {label}
      </label>
      <br />
      <input
        {...rest}
        type="text"
        className="form-control"
        list={listID}
        id={name}
        name={name}
        value={value}
        style={style.input}
      />
      <datalist id={listID}>
        {listArray &&
          listArray.map((item, index) => {
            return (
              <option key={index + "-" + item} value={item}>
                {item}
              </option>
            );
          })}
      </datalist>
      {error && (
        <span style={style.errorMessage} className="text-danger">
          {error}
        </span>
      )}
    </div>
  );
};

export default Datalist;
