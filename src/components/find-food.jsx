import React from "react";
import Form from "./common/forms/form";
import styles from "./scss/find-food.module.scss";
// import foodService from "../services/foodService";
// import http from "../services/httpService";
import getCitiesFromApi from "../services/citiesService";
import { getUserInfo } from "../services/userService";
import { searchFoodByCity } from "../services/foodService";
import Joi from "joi-browser";
import FoodListing from "./food-listing";

class FindFood extends Form {
  state = {
    data: { foodCity: "" },
    errors: { foodCity: "" },
    cities: {},
    foodList: [],
  };

  schema = {
    foodCity: Joi.string()
      .min(2)
      .max(255)
      .error(() => {
        return { message: "יש לבחור עיר" };
      }),
  };

  listABGSH = async () => {
    let { foodList } = this.state;
    let response;
    try {
      response = await searchFoodByCity("אבו גוש");
      foodList = response.data;
      console.log(foodList);
    } catch (err) {
      console.log(err);
    }

    foodList.map(async (listing) => {
      try {
        listing.user = await getUserInfo(listing.user_id);
        if (listing.user === "")
          listing.user = {
            _id: listing.user_id,
            name: "לא נמצא משתמש",
            phone: "",
            email: "",
          };
      } catch (err) {
        console.log(err);
      }
    });

    this.setState({ foodList });
  };

  getCities = async () => {
    let { cities } = this.state;
    cities = await getCitiesFromApi();
    this.setState({ cities });
  };

  doSubmit = async () => {
    let { data, foodList } = this.state;
    let response;

    try {
      response = await searchFoodByCity(data.foodCity);
      foodList = response.data.length > 0 ? response.data : "none";
    } catch (err) {
      console.warn(err);
    }

    if (typeof foodList === "object") {
      await Promise.all(
        foodList.map(async (listing) => {
          try {
            listing.user = await getUserInfo(listing.user_id);
            if (listing.user === "")
              listing.user = {
                _id: listing.user_id,
                name: "לא נמצא משתמש",
                phone: "",
                email: "",
              };
          } catch (err) {
            console.log(err);
          }
        })
      );
    }

    this.setState({ foodList });
  };

  componentDidMount = () => {
    this.getCities();
  };

  render() {
    const { cities, foodList, data } = this.state;
    return (
      <div className={styles.viewFood}>
        <header className={styles.pageHeader}>
          <h1 className={styles.headerText}>מצאו אוכל בסביבה</h1>
        </header>
        <div className={styles.form}>
          <form
            name="search-city"
            action=""
            method="GET"
            onSubmit={this.handleSubmit}
          >
            {cities.names
              ? this.renderDatalist(
                  "foodCity",
                  "cities",
                  "חפשו לפי עיר",
                  cities.names
                )
              : "loading"}
            {this.renderSubmitButton("חיפוש", `${styles.submit} button green`)}
          </form>
          {/* <p onClick={() => getUserInfo("12341234")}>run GET request</p>
          <p onClick={() => this.listABGSH()}>list ABU GOSH</p>
          <p onClick={() => console.log(this.state)}>log State</p> */}
        </div>
        <div className={styles.foodList}>
          {foodList !== "none" && foodList.length > 0 && (
            <FoodListing array={foodList} />
          )}
          {foodList === "none" && (
            <p>מצטערים, אין כרגע אוכל למסירה ב{data.foodCity}</p>
          )}
        </div>
      </div>
    );
  }
}

export default FindFood;
