import React from "react";

const TextArea = ({ name, label, formID, rowsNum, error, style, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} style={style.label}>
        {label}
      </label>
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
