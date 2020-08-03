import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Joi from "joi-browser";

import Form from "./common/forms/form";
import Button from "./common/button";
import styles from "./scss/add-food.module.scss";
import foodService from "../services/foodService";

class AddFood extends Form {
  state = {
    data: { foodTitle: "", foodDesc: "", foodLocation: "" },
    errors: {},
    form: null,
  };

  schema = {
    foodTitle: Joi.string()
      .required()
      .min(2)
      .max(255)
      .label("Food Title")
      .error(() => {
        return {
          message: "שני תוים לפחות",
        };
      }),
    foodDesc: Joi.string()
      .required()
      .min(2)
      .max(1024)
      .label("Food Description")
      .error(() => {
        return {
          message: "יש להזין תיאור ",
        };
      }),
    foodImage: Joi.any(),
    foodLocation: Joi.string()
      .min(2)
      .max(255)
      .label("Food Location")
      .error(() => {
        return {
          message: "שני תוים לפחות",
        };
      }),
  };

  logData = () => {
    console.log(this.state);
  };

  doSubmit = async () => {
    const formElement = document.forms.namedItem("add-food-form");
    await foodService.createFood(formElement);
    toast("תודה על השיתוף!");

    this.props.history.replace("/");
  };

  componentDidMount() {
    const form = document.getElementById("add-food-form");
    this.setState({ form });
  }

  render() {
    return (
      <div className={styles.addFood}>
        <div className={styles.form}>
          <h3>איזה אוכל יש לך?</h3>
          <form
            id="add-food-form"
            name="add-food-form"
            onSubmit={this.handleSubmit}
            action=""
            method="POST"
            autoComplete="off"
            encType="multipart/form-data"
          >
            {this.renderInput("foodTitle", "איזה אוכל?")}
            {this.renderTextArea(
              "foodDesc",
              "עוד על האוכל:",
              "add-food-form",
              "5"
            )}
            {this.renderUpload("foodImage", "רוצה לצרף תמונה?", "image/*")}
            {this.renderInput("foodLocation", "איפה האוכל?")}
            <div className={styles.formButtons}>
              {this.renderSubmitButton("שיתוף מזון", "submit button green")}
              <span onClick={this.handleClear} className="button red">
                ניקוי
              </span>
            </div>
          </form>
          <div>
            <Button to="/" text="Home" color="green" />
            <p style={{ fontSize: "2rem" }} onClick={this.logData}>
              Log Data
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default AddFood;
