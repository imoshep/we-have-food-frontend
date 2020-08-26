import React from "react";
import Joi from "joi-browser";
import _ from "lodash";
import Swal from "sweetalert2";

import Form from "./common/forms/form";
import Button from "./common/button";
import styles from "./scss/edit-food.module.scss";
import {
  searchFoodByFoodId,
  updateFood,
  deleteFood,
} from "../services/foodService.js";
import getCitiesFromApi from "../services/citiesService";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";

class EditFood extends Form {
  state = {
    data: { foodTitle: "", foodDesc: "", foodCity: "" },
    errors: {},
    cities: {},
    form: null,
    foodId: null,
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
    console.dir(this.state);
  };

  getCities = async () => {
    try {
      let cities = await getCitiesFromApi();
      return { list: cities, error: null };
    } catch (err) {
      console.log(err);
      return { list: null, error: err.message };
    }
  };

  getfoodData = async () => {
    let { data } = this.state;
    const { foodId } = this.props;
    try {
      let response = await searchFoodByFoodId(foodId);
      data = response.data[0];
    } catch (err) {
      console.log(err.message);
    }
    this.setState({ data });
  };

  handleClear = () => {
    let { data } = this.state;
    data = { foodTitle: " ", foodDesc: "", foodCity: "" };
    this.setState({ data });
  };

  promptDelete = () => {
    const { data } = this.state;
    Swal.fire({
      title: "מחיקה",
      text: `לחיצה על "מחק" תמחק את האוכל ${data.foodTitle} מ${data.foodCity}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#b93e15",
      cancelButtonColor: "#64a417",
      confirmButtonText: "מחק",
      cancelButtonText: "ביטול",
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        try {
          deleteFood(data._id);
          Swal.fire({
            title: "נמחק!",
            text: "הרשומה נמחקה הצלחה",
            icon: "success",
          });
          this.props.history.replace("/user/me");
        } catch (err) {
          console.log(err.message);
        }
      }
    });
  };

  doSubmit = async () => {
    const { foodId } = this.state;
    const formElement = document.forms.namedItem("edit-food-form");
    console.log(formElement);
    try {
      let update = await updateFood(foodId, formElement);
      if (update.status === 200) {
        toast.success("תודה על השיתוף!");
        this.props.history.push("/user/me");
      } else {
        toast.error(update);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  componentDidMount = async () => {
    let { foodId } = this.state;
    foodId = this.props.location.state?.foodId;
    if (!foodId) {
      this.props.history.push("/");
    } else {
      let { cities, form, data } = this.state;
      form = document.getElementById("edit-food-form");
      console.log(form);
      let { list, error } = await this.getCities();
      list ? (cities = list) : toast.error(error);
      let response = await searchFoodByFoodId(foodId);
      data = _.pick(response.data[0], ["foodTitle", "foodDesc", "foodCity"]);
      this.setState({ foodId, cities, form, data });
    }
  };

  render() {
    const { cities, foodId } = this.state;
    return (
      <div className={styles.editFood}>
        {this.state.data.foodTitle ? (
          <div className={styles.form}>
            <h3>עריכת רשומה</h3>
            <form
              id="edit-food-form"
              name="edit-food-form"
              onSubmit={this.handleSubmit}
              action=""
              method="POST"
              autoComplete="off"
              encType="multipart/form-data"
            >
              {this.renderInput("foodTitle", "* שם האוכל:")}
              {this.renderTextArea(
                "foodDesc",
                "* תיאור האוכל:",
                "edit-food-form",
                "5"
              )}
              {this.renderUpload("foodImage", "רוצה לצרף תמונה?", "image/*")}
              {cities.names?.length
                ? this.renderDatalist(
                    "foodCity",
                    "cities",
                    "* באיזו עיר?",
                    cities.names
                  )
                : this.renderInput("foodCity", "* באיזו עיר?")}
              <div className={styles.formButtons}>
                <div>
                  {this.renderSubmitButton("עדכון", "submit button green")}
                  <span onClick={this.handleClear} className="button mustard">
                    ניקוי
                  </span>
                </div>
                <span
                  style={{ width: "6rem" }}
                  onClick={this.promptDelete}
                  className="button red"
                >
                  מחיקה
                </span>
              </div>
            </form>

            <div>
              <Button to={`/food/${foodId}`} text="ביטול" color="mustard" />
            </div>
          </div>
        ) : (
          <h2> עמוד בטעינה...</h2>
        )}
        {/* <p style={{ fontSize: "2rem" }} onClick={this.logState}>
          Log State
        </p> */}
      </div>
    );
  }
}

export default withRouter(EditFood);
