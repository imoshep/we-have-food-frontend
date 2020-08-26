import React, { Component } from "react";
import styles from "./scss/view-user.module.scss";
import { getUserInfo, getCurrentUser } from "../services/userService";
import { searchFoodByCreator } from "../services/foodService";
import Swal from "sweetalert2";
import Button from "./common/button";

class ViewUser extends Component {
  state = {
    user: { food: [] },
  };

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
          <td colSpan="3">האוכל שפרסמת:</td>
        </tr>

        {user.food.length &&
          user.food.map((food) => {
            return (
              <tr key={food._id}>
                <td colSpan="3">
                  <Button
                    to={`/food/${food._id}`}
                    text={food.foodTitle}
                    color="green"
                  />
                </td>
              </tr>
            );
          })}
      </React.Fragment>
    );
  };

  componentDidMount = () => {
    this.getUserWithFood();
  };

  render() {
    const { user } = this.state;

    // if (!user) return null;  
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
          </tbody>
        </table>
      </div>
    );
  }
}

export default ViewUser;
