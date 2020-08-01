import React from "react";

const TextArea = ({ name, label, formID, rowsNum, error, style, ...rest }) => {
  // const style = {
  //   label: {},
  //   input: {
  //     padding: ".5rem",
  //     borderRadius: "13px",
  //     borderWidth: "3px",
  //     borderStyle: "inset",
  //     marginBlockStart: ".25rem",
  //     marginBlockEnd: "1rem",
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
      <label htmlFor={name}>{label}</label>
      <br />
      <textarea
        {...rest}
        className="form-control"
        form={formID}
        id={name}
        name={name}
        rows={rowsNum}
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

export default TextArea;
