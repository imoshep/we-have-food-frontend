import React from "react";
import { toast } from "react-toastify";
import Joi from "joi-browser";

import Form from "./common/forms/form";
import Button from "./common/button";
import styles from "./scss/add-food.module.scss";
import { createFood } from "../services/foodService";
import getCitiesFromApi from "../services/citiesService";

class AddFood extends Form {
  state = {
    data: { foodTitle: "", foodDesc: "", foodCity: "", foodImage: ""},
    errors: {},
    cities: {},
    form: null,
    isLoading: false
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
    foodCity: Joi.string()
      .required()
      .min(2)
      .max(255)
      .label("Food City")
      .error(() => {
        return { message: "יש לבחור עיר" };
      }),
    foodImage: Joi.any(),
  };

  logState = () => {
    const formElement = document.forms.namedItem("add-food-form");
    console.log(formElement);
    console.dir(this.state);
  };

  getCities = async () => {
    let cities;
    try {
      cities = await getCitiesFromApi();
      return { list: cities, error: null };
    } catch (err) {
      console.log(err);
      return { list: null, error: err.message };
    }
  };

  handleClear = () => {
    let { data } = this.state;
    data = { foodTitle: "", foodDesc: "", foodCity: "" };
    this.setState({ data });
  };

  doSubmit = async () => {
    const {data} = this.state;
    const formElement = document.forms.namedItem("add-food-form");

    await createFood(formElement, data.foodImage);
    toast.success("תודה על השיתוף!");
    this.props.history.replace("/");
  };

  componentDidMount = async () => {
    let { cities, form } = this.state;
    let { list, error } = await this.getCities();
    list ? (cities = list) : console.log(error);
    form = document.getElementById("add-food-form");
    this.setState({ cities, form });
  };

  render() {
    const { cities } = this.state;
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
            {this.renderInput("foodTitle", "* איזה אוכל?")}
            {this.renderTextArea(
              "foodDesc",
              "* עוד על האוכל:",
              "add-food-form",
              "5"
            )}
            {this.renderUpload("foodImage", "רוצה לצרף תמונה?", "image/*")}
            {cities
              ? this.renderDatalist(
                "foodCity",
                "cities",
                "* באיזו עיר?",
                cities.names
                )
                : this.renderInput("foodCity", "* באיזו עיר?")}
            <div className={styles.formButtons}>
              {this.renderSubmitButton("שיתוף מזון", "submit button green")}
              <span onClick={this.handleClear} className="button red">
                ניקוי
              </span>
            </div>
          </form>
          <div>
            <Button to="/" text="Home" color="green" />
          </div>
        </div>
      </div>
    );
  }
}

export default AddFood;
