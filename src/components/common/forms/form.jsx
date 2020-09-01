import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";
import { getSignedRequest } from "../../../services/foodService";
import TextArea from "./textArea";
import Datalist from "./datalist";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  /////// VALIDATIONS ///////
  validateForm() {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return false;
    const errorsToState = {};
    for (let item of error.details) errorsToState[item.path[0]] = item.message;
    return true
  }

  validateProperty({ name, value }) {
    if (name === "passwordRepeat") {
      return null
    } else {
      const obj = { [name]: value };
      const schema = { [name]: this.schema[name] };
      const { error } = Joi.validate(obj, schema);
      return error ? error.details[0].message : null;
    }
  }

  validateUpload(file, type) {
    let errors;
    if (type === "image") {
      if (
        !file.type.startsWith("image") ||
        !/\.(jpe?g|png|gif)$/i.test(file.name)
      ) {
        errors = "יש להעלות קובץ תמונה בלבד";
      }
    }
    return errors;
  }

  /////// EVENT HANDELERS ///////
  wrdlimit = (input) => {
    let elm = input.nextSibling.firstElementChild;
    while (elm) {
      if (elm.value.startsWith(input.value)) {
        elm.removeAttribute("disabled");
      } else {
        elm.setAttribute("disabled", true);
      }
      elm = elm.nextElementSibling;
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) { 
      errors[input.name] = errorMessage;
    }
    else delete errors[input.name];
    const data = { ...this.state.data };
    if (input.list) this.wrdlimit(input);
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleUpload = ({ currentTarget: input }) => {
    let file = input.files[0];
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };

    if (file) {
      const errorMessage = this.validateUpload(file, "image");
      if (errorMessage) {
        errors[input.name] = errorMessage;
        data[input.name] = null;
      } else {
        delete errors[input.name];
        data[input.name] = file;
        getSignedRequest(file);
      }
    } else delete errors[input.name];

    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateForm();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleClear = (e) => {
    e.preventDefault();
    let { data, errors, form } = { ...this.state };
    data = { foodTitle: "", foodDesc: "", foodImage: null, foodLocation: "" };
    errors = {};
    form.reset();
    this.setState({ data, errors });
  };

  /////// INPUT RENDERING ///////
  inputStyle = {
    label: {
      marginTop: "1rem",
    },
    input: {
      backgroundColor: "white",
      padding: ".5rem",
      borderRadius: "13px",
      border: "3px inset grey",
      marginBlockStart: ".25rem",
      width: "100%",
      fontFamily: "sans-serif",
    },
    errorMessage: {
      color: "red",
      display: "block",
    },
  };

  renderInput(inputName, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        onChange={this.handleChange}
        type={type}
        name={inputName}
        label={label}
        value={data[inputName]}
        error={errors[inputName]}
        style={this.inputStyle}
      />
    );
  }

  renderTextArea(inputName, label, formID, rowsNum, ...rest) {
    const { data, errors } = this.state;
    return (
      <TextArea
        onChange={this.handleChange}
        name={inputName}
        formID={formID}
        rowsNum={rowsNum}
        label={label}
        value={data[inputName]}
        error={errors[inputName]}
        style={this.inputStyle}
      />
    );
  }

  renderDatalist(inputName, listID, label, arr, ...rest) {
    let { data, errors } = this.state;

    return (
      <Datalist
        onChange={this.handleChange}
        name={inputName}
        listID={listID}
        label={label}
        listArray={arr}
        value={data[inputName]}
        error={errors[inputName]}
        style={this.inputStyle}
      />
    );
  }

  renderUpload(inputName, label, accept) {
    const { errors } = this.state;
    return (
      <Input
        type="file"
        onChange={this.handleUpload}
        name={inputName}
        label={label}
        accept={accept}
        error={errors[inputName]}
        style={this.inputStyle}
      />
    );
  }

  renderSubmitButton(label, className) {
    return (
      <button
        disabled={this.validateForm()}
        type="submit"
        className={className}
      >
        {label}
      </button>
    );
  }
}

export default Form;
