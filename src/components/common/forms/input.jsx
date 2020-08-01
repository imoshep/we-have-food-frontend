import React from "react";

const Input = ({ name, type, label, error, style, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} style={style.label}>
        {label}
      </label>
      <br />
      <input
        {...rest}
        type={type}
        className="form-control"
        id={name}
        name={name}
        style={style.input}
      />
      {error && (
        <span style={style.errorMessage} className="text-danger">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
