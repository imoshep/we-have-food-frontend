import React from "react";
import {Link} from 'react-router-dom'
import Joi from "joi-browser";
import { toast } from "react-toastify";
import styles from "./scss/find-food.module.scss";
import Form from "./common/forms/form";
import getCitiesFromApi from "../services/citiesService";
import { getUserInfo, updateFavorites } from "../services/userService";
import { searchFoodByCity } from "../services/foodService";
import FoodTable from "./find-food-table";
import LoadingMessage from "./common/loading";

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


  registerFavoritesFromList = (foodId) => {
    let {favorites} = this.state;
    favorites.includes(foodId) 
      ? favorites.splice(favorites.indexOf(foodId), 1)
      : favorites.push(foodId)
    this.setState({favorites}) 
  }

  sendFavoritesToServer = async () => {
    let {favorites} = this.state;
    try {
      let response = await updateFavorites(favorites)
      if (response.status >= 400) toast.error(response.data);
      else  toast.success(() => <p>האוכל שבחרת נוסף למועדפים. לצפיה ועריכה של המועדפים יש להיכנס ל<Link to='/user/me'>פרופיל המשתמש</Link></p>)
    } catch(error) {
      toast.error(error.message);
    }
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
      toast.error(err);
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
            toast.error(err);
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
            autoComplete="off"
            name="search-city"
            action=""
            method="GET"
            onSubmit={this.handleSubmit}
          >
          <div style={{opacity: '0'}}>
          </div>  
            {cities.names 
              ? this.renderDatalist(
                "foodCity",
                "cities",
                "חפשו לפי עיר",
                cities.names
              )
              : <LoadingMessage />}
              {this.renderSubmitButton("חיפוש", `${styles.submit} button green`)} 
          </form>
        </div>
        <div className={styles.foodList}>
          {foodList !== "none" && foodList.length > 0 && (
            <React.Fragment>
            <FoodTable array={foodList} registerFavorites={this.registerFavoritesFromList}/>
            {favorites.length > 0 && <span className='button green' onClick={this.sendFavoritesToServer}>הוספה למועדפים</span>}
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
