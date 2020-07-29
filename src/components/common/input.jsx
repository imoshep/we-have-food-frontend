import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  const style = {
    label: {},
    input: {
      padding: ".5rem",
      borderRadius: "13px",
      marginBlockEnd: "1rem",
    },
    errorMessage: {
      color: "red",
      display: "block",
    },
  };

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        {...rest}
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
