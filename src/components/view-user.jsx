import React, { Component } from "react";
import styles from "./scss/view-user.module.scss";
import { getUserInfo, getCurrentUser } from "../services/userService";
import { searchFoodByCreator } from "../services/foodService";
import { Link } from "react-router-dom";

class ViewUser extends Component {
  state = {
    user: { food: [] },
  };

  getUserWithFood = async () => {
    let { user } = this.state;
    let userInfo = await getCurrentUser();
    user = await getUserInfo(userInfo._id);
    let { data } = await searchFoodByCreator(userInfo._id);
    user.food = data;
    console.log(user);
    this.setState({ user });
  };

  componentDidMount = () => {
    this.getUserWithFood();
  };

  render() {
    const { user } = this.state;
    return (
      <div className={styles.viewUser}>
        <header className={styles.pageHeader}>
          <h1 className={styles.headerText}>User Details</h1>
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
            <tr>
              <td colSpan="3">האוכל שפרסמת:</td>
            </tr>
            {user.food.map((food) => {
              return (
                <tr key={food._id}>
                  <td>
                    <Link to={`/food/${food._id}`}>{food.foodTitle}</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ViewUser;
