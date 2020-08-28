import React from "react";
import { Redirect } from "react-router-dom";
import Form from "./common/forms/form";
import { signup, login, getCurrentUser } from "../services/userService";

import { toast } from "react-toastify";
import Joi, { errors } from "joi-browser";

import styles from "./scss/signup.module.scss";

class Signup extends Form {
  state = {
    data: { name: "", email: "", password: "", passwordRepeat: "", phone: "" },
    errors: {},
  };

  schema = {
    name: Joi.string()
      .required()
      .min(2)
      .max(255)
      .label("Name")
      .error(() => {
        return {
          message: "שני תוים לפחות",
        };
      }),
    email: Joi.string()
      .required()
      .email()
      .label("Email")
      .error(() => {
        return {
          message: "יש להזין כתובת אימייל תקנית",
        };
      }),
    password: Joi.string()
      .required()
      .min(6)
      .label("Password")
      .error(() => {
        return {
          message: "שישה תוים לפחות",
        };
      }),
    passwordRepeat: Joi.string()
    .required()
    .error(() => {
      return {
        message: "יש להקליד אותה סיסמא",
      };
    }),
    phone: Joi.string()
      .regex(/^0[2-9]\d{7,8}$/)
      .allow('')
      .error(() => {
          return {
            message: "יש להקליד מספר טלפון תקני",
          };
        }),
  };

  doSubmit = async () => {
    const { name, email, password, passwordRepeat, phone } = this.state.data;
    if (password !== passwordRepeat) {
      this.setState({errors: {passwordRepeat: "יש להקליד אותה הסיסמא"}})
      return
    }
    try {
      await signup(name, email, password, phone);
      await login(email, password);
      toast("You were added to the system. Please log in.");
      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({ errors: { password: err.response.data } });
      }
    }
  };

  render() {
    if (getCurrentUser()._id) return <Redirect to="/" />;

    return (
      <div className={styles.signup}>
        <div className={styles.form}>
          <h2>הרשמה</h2>
          <form
            id="signup-form"
            onSubmit={this.handleSubmit}
            action=""
            method="post"
          >
            {this.renderInput("name", "שם:")}
            {this.renderInput("email", "כתובת אימייל:", "email")}
            {this.renderInput("password", "סיסמא:", "password")}
            {this.renderInput("passwordRepeat", "סיסמא בשנית:", "password")}
            {this.renderInput("phone", "מס' טלפון:", "tel")}
            <br />
            {this.renderSubmitButton("בואו נתחיל", "button green")}
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
