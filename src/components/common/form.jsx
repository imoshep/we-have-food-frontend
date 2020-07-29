import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate() {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errorstoState = {};
    for (let item of error.details) errorstoState[item.path[0]] = item.message;
    return errorstoState;
  }

  validateProperty({ name, value }) {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  }

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
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
      />
    );
  }

  renderSubmitButton(label, className) {
    return (
      <button isdisabled={this.validate()} type="submit" className={className}>
        {label}
      </button>
    );
  }
}

export default Form;
