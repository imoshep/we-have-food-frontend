import React from "react";
import Form from "./common/forms/form";
import Joi from "joi-browser";
import styles from "./scss/find-food.module.scss";
import getCitiesFromApi from "../services/citiesService";
import { getUserInfo } from "../services/userService";
import { searchFoodByCity } from "../services/foodService";
import { serverUrl } from "../config.json";
import FoodTable from "./find-food-table";
import Button from "./common/button";
import { indexOf } from "lodash";

class FindFood extends Form {
  state = {
    data: { foodCity: "" },
    errors: { foodCity: "" },
    cities: {},
    foodList: [],
    favorites: []
  };

  schema = {
    foodCity: Joi.string()
      .min(2)
      .max(255)
      .error(() => {
        return { message: "יש לבחור עיר" };
      }),
  };


  registerFavorites = (foodId) => {
    let {favorites} = this.state;
    favorites.includes(foodId) 
      ? favorites.splice(favorites.indexOf(foodId), 1)
      : favorites.push(foodId)
    this.setState({favorites}) 
  }

  sendFavorites() {
    // try send to server
    // toast "success, to remove goto your profile"
    // stay on this page
    // catch => swal(error)

    // food service function
    // serverside favrites logic
    // user/me favorites page
  }

  getCities = async () => {
    let { cities } = this.state;
    cities = await getCitiesFromApi();
    this.setState({ cities });
  };

  doSubmit = async () => {
    let { data, foodList, favorites } = this.state;
    
    favorites = [];

    try {
      let response = await searchFoodByCity(data.foodCity);
      foodList = response.data?.length > 0 ? response.data : "none";
    } catch (err) {
      console.warn(err);
    }

    if (foodList.length > 0 ) {
      foodList.forEach((listing) => {
        listing.foodImage = serverUrl + listing.foodImage.slice(8);
      })
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

    this.setState({ foodList, favorites });
  };

  componentDidMount = () => {
    this.getCities();
  };

  render() {
    const { cities, foodList, data, favorites } = this.state;
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
              : <h2> עמוד בטעינה...</h2>}
              {this.renderSubmitButton("חיפוש", `${styles.submit} button green`)} 
          </form>
          {/* <p onClick={() => console.log(this.state)}>log State</p> */}
        </div>
        <div className={styles.foodList}>
          {foodList !== "none" && foodList.length > 0 && (
            <React.Fragment>
            <FoodTable array={foodList} registerFavorites={this.registerFavorites}/>
            {favorites.length > 0 && <span className='button green' onClick={this.sendFavorites}>הוספה למועדפים</span>}
            </React.Fragment>
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
