import React from "react";
import Form from "./common/forms/form";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import http from "../services/httpService.js";
import { apiUrl } from "../config.json";
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
      .valid(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .error(() => {
        return {
          message: "יש להקליד אותה סיסמא",
        };
      }),
    phone: Joi.string()
      .min(9)
      .max(10)
      .regex(/^0[2-9]\d{7,8}$/)
      .error(() => {
        return {
          message: "יש להקליד ספרות בלבד",
        };
      }),
  };

  doSubmit = async () => {
    const { name, email, password } = this.state.data;
    try {
      await http.post(`${apiUrl}/users`, { name, email, password });
      toast("You were added to the system. Please log in.");
      window.location = this.props.location.state.from.pathname;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { password: ex.response.data } });
      }
    }
  };

  render() {
    // console.log(this.props.location);
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
            {this.renderSubmitButton("בואו נתחיל", "button green")}
            <br />
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
