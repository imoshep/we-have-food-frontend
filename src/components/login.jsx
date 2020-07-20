import React from "react";
import { Link } from "react-router-dom";
import Form from "./common/form";
import userService from "../services/userService";
import Button from "./common/button";
import Joi from "joi-browser";
import "./scss/login.scss";

class Login extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  doSubmit = async () => {
    const { email, password } = this.state.data;
    try {
      await userService.login(email, password);
      window.location = this.props.location.state.from.pathname;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { password: ex.response.data } });
      }
    }
  };

  render() {
    console.log(this.props.location);
    return (
      <div className="login">
        <h2>התחבר/י</h2>
        <form
          id="login-form"
          onSubmit={this.handleSubmit}
          action=""
          method="post"
        >
          {this.renderInput("email", "כתובת אימייל", "email")}
          {this.renderInput("password", "סיסמא", "password")}
          {this.renderSubmitButton("יש לי אוכל")}
          <br />
        </form>
        <Link
          to={{
            pathname: "/user/signup",
            state: { from: this.props.location.state.from },
          }}
        >
          עוד אין לך חשבון?
        </Link>
        <Button to="/" text="Home" color="#64a417" />
      </div>
    );
  }
}

export default Login;
