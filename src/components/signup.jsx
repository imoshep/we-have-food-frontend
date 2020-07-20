import React from "react";
import Form from "./common/form";
import Button from "./common/button";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import http from "../services/httpService.js";
import { apiUrl } from "../config.json";
import "./scss/signup.scss";

class Signup extends Form {
  state = {
    data: { name: "", email: "", password: "" },
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
          message: "השם צריך להיות בן שני תוים לפחות",
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
          message: "הסיסמא צריכה להיות בת שישה תוים לפחות",
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
    console.log(this.props.location);
    return (
      <div className="signup">
        <h2>התחבר/י</h2>
        <form
          id="signup-form"
          onSubmit={this.handleSubmit}
          action=""
          method="post"
        >
          {this.renderInput("name", "שם:")}
          {this.renderInput("email", "כתובת אימייל:", "email")}
          {this.renderInput("password", "סיסמא:", "password")}
          {this.renderSubmitButton("בואו נתחיל")}
          <br />
        </form>
        <Button to="/" text="Home" color="#64a417" />
      </div>
    );
  }
}

export default Signup;
