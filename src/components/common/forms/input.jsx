import React from "react";
//
const Input = ({ name, type, label, error, style, ...rest }) => {
  // console.log({ name, type, style });
  // const style = {
  //   label: {
  //     marginBlockStart: "1rem",
  //   },
  //   input: {
  //     padding: ".5rem",
  //     borderRadius: "13px",
  //     marginBlockStart: ".25rem",
  //     width: "100%",
  //     fontFamily: "sans-serif",
  //   },
  //   errorMessage: {
  //     color: "red",
  //     display: "block",
  //   },
  // };
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
