import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./scss/view-user.module.scss";
import { getUserInfo, getCurrentUser, removeFavorites } from "../services/userService";
import { searchFoodByCreator, searchFoodByFoodId } from "../services/foodService";
import Swal from "sweetalert2";
import Button from "./common/button";
import FoodListing from "./food-listing";
import LoadingMessage from "./common/loading";


class ViewUser extends Component {
  state = {
    user: { 
      data: {},
      food: [],
      favorites: []
    },
    favsToDelete: [],
    showFavs: false,
  };

  toggleShowFavs() {
    let {showFavs} = this.state;
    this.setState({showFavs: !showFavs})
  }
  
  requestFavorites = async () => {
    let { user } = this.state;
    this.toggleShowFavs();

    if (user.favorites[0]?._id) return; 

    let detailedFavorites = []
    for (let foodId of user.favorites) {
      detailedFavorites.push((await searchFoodByFoodId(foodId)).data[0])
    }
    user.favorites = detailedFavorites;

    await Promise.all(
      user.favorites.map(async (listing) => {
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

    this.setState({user});
  }

  registerFavorites = (foodId) => {
    let {favsToDelete} = this.state;
    favsToDelete.includes(foodId) 
      ? favsToDelete.splice(favsToDelete.indexOf(foodId), 1)
      : favsToDelete.push(foodId)
    this.setState({favsToDelete}) 
  }

  deleteFavorites = async () => {
    let {favsToDelete, user} = this.state;
    let response = await removeFavorites(favsToDelete);
    if (response) {
      if (response.status >= 400) toast.error(response.data)
      else if (typeof response.data === 'object')  {
        toast.success("הפריטים הוסרו בהצלחה");
        favsToDelete = [];
        user.favorites = response.data;
      }
    } else {
      toast.error('ארעה תקלה בשליחה')
    }
    this.setState({user, favsToDelete});
  }

  getUserWithFood = async () => {
    let { user } = this.state;
    try {
      let foodData;

      let userInfo = await getCurrentUser();

      if (userInfo._id) {
        try {
          user = await getUserInfo(userInfo._id);
        } catch (err) {
          Swal.fire({ title: "שגיאה", text: err.message, icon: "error" });
        }
      } else if (
        userInfo.message &&
        userInfo.message.startsWith("Invalid token")
      ) {
        Swal.fire({
          title: "שגיאה",
          text: "יש להתחבר למערכת",
          icon: "error",
          footer: `<a href='/user/login' style='text-decoration: none; font-weight: bold; padding: 0.5rem 1rem; border-radius: 10px; border: 1px solid #551A8B'>התחברות למערכת</a>` ,
        }).then((result) => {
          if (result.value) {
            this.props.history.replace('/');
          }
        });
        return;
      } else if (userInfo.message) {
        Swal.fire({
          title: "שגיאה",
          text: userInfo.message,
          icon: "error",
        });
      }

      try {
        let { data } = await searchFoodByCreator(userInfo._id);
        foodData = data;
      } catch (err) {
        Swal.fire({ title: "שגיאה", text: err.message, icon: "error" });
      }

      user.food = foodData;
      user.data = userInfo;
    } catch (err) {
      Swal.fire({ title: "שגיאה", text: err.message, icon: "error" });
    }

    this.setState({ user });
  };

  renderFoodRows = () => {
    const { user } = this.state;
    return (
      <React.Fragment>
        <tr>
          <td colSpan="3"><h2>האוכל שפרסמת:</h2></td>
        </tr>

        {user.food.length &&
          user.food.map((food) => {
            return (
              <tr key={food._id}>
                <td colSpan="3">
                  <Button
                    to={`/food/${food._id}`}
                    text={food.foodTitle}
                    color="mustard"
                  />
                </td>
              </tr>
            );
          })}
      </React.Fragment>
    );
  };

  renderFavorites() {
    let {favorites} = this.state.user;

    return (
      favorites.map((listing) => {
        return (
          <FoodListing 
            key={listing._id}
            listing={listing} 
            registerFavorites={this.registerFavorites} 
          />
        )
      })      
    )
  }

  componentDidMount = () => {
    this.getUserWithFood();
  };

  render() {
    const { user, favsToDelete, showFavs } = this.state;

    let show;
    if (user.favorites[0]?._id) show = this.renderFavorites()
    else if (user.favorites.length > 0) show = <LoadingMessage />
    else show = <tr><td>אין לך אוכל ברשימת המועדפים.&nbsp; 
    <Link to="/food/search">חפש אוכל</Link> </td></tr>

    return (
      <div className={styles.viewUser}>
        <header className={styles.pageHeader}>
          <h1 className={styles.headerText}>פרטי משתמש</h1>
        </header>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>שם משתמש</th>
              <th>אימייל</th>
              <th>טלפון</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
            {user.food.length ? (
              this.renderFoodRows()
            ) : (
              <tr>
                <td colSpan="3">
                  <Button to="/food/add" color="green" text="רוצה לשתף אוכל?" />
                </td>
              </tr>
            )}
            <tr>
              <td id="favorites-td" colSpan='3'>
                <span className="button green" onClick={this.requestFavorites}>לצפייה במועדפים שלך</span>
              </td>
            </tr>
            <tr>
              <td colSpan='3'>
                <table>
                  <tbody>
                    { showFavs && show}
                  </tbody>
                </table>
              </td>
            </tr>
        {favsToDelete.length > 0 && <tr><td colSpan='4'>
        <span onClick={this.deleteFavorites} className="button red">להסרה מרשימת המועדפים</span>
        </td></tr>}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ViewUser;
