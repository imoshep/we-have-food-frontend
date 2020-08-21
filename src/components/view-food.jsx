import React, { Component } from "react";
import styles from "./scss/view-food.module.scss";
import { searchFoodByFoodId } from "../services/foodService.js";
import { serverUrl } from "../config.json";

class ViewFood extends Component {
  state = {
    foodId: window.location.pathname.slice(6),
    foodData: {},
  };

  popImage({ target }) {
    console.log(target);
    console.log(target.src);

    let img = document.createElement("img");
    let popup = document.getElementById("image-popup");
    img.src = target.src;
    img.width = "250";
    popup.appendChild(img);
    popup.classList.toggle("hide");
    document.addEventListener("click", () => {
      img.remove();
      popup.classList.toggle("hide");
    });
  }

  getfoodData = async () => {
    let { foodData, foodId } = this.state;
    let { data } = await searchFoodByFoodId(foodId);
    foodData = data[0];
    console.log(foodData);
    this.setState({ foodData });
  };

  componentDidMount = () => {
    this.getfoodData();
  };

  render() {
    const { foodData } = this.state;
    return (
      <div className={styles.viewFood}>
        <header className={styles.pageHeader}>
          <h1 className={styles.headerText}>פרטי מזון</h1>
        </header>

        <table className={styles.table}>
          <thead>
            <tr>
              <th colSpan="2">{foodData.foodTitle}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>תיאור</td>
              <td>{foodData.foodDesc}</td>
            </tr>
            <tr>
              <td>תמונה</td>
              <td>
                <img
                  src={serverUrl + foodData?.foodImage?.slice(8)}
                  alt={foodData.foodTitle}
                  height="150"
                  onClick={this.popImage}
                ></img>
              </td>
            </tr>
            <tr>
              <td>עיר</td>
              <td>{foodData.foodCity}</td>
            </tr>
          </tbody>
        </table>
        <div id="image-popup" className={`${styles.popup} hide`}></div>
      </div>
    );
  }
}

export default ViewFood;
