import React from "react";
import Form from "./common//forms/form";
import userService from "../services/userService";
import Button from "./common/button";
import Joi from "joi-browser";
import styles from "./scss/login.module.scss";

class Login extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
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
  };

  doSubmit = async () => {
    const { email, password } = this.state.data;
    try {
      await userService.login(email, password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { password: ex.response.data } });
      }
    }
  };

  render() {
    return (
      <div className={styles.login}>
        <div className={styles.form}>
          <h2>התחבר/י</h2>
          <form
            id="login-form"
            onSubmit={this.handleSubmit}
            action=""
            method="post"
          >
            {this.renderInput("email", "כתובת אימייל", "email")}
            {this.renderInput("password", "סיסמא", "password")}
            {this.renderSubmitButton("יש לי אוכל", "button green")}
            <br />
          </form>
        </div>
        <Button to="/user/signup" text="עוד אין לך חשבון?" color="mustard" />
      </div>
    );
  }
}

export default Login;
