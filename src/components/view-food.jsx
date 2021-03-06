import React, { Component } from "react";
import styles from "./scss/view-food.module.scss";
import {
  searchFoodByFoodId,
  deleteFood,
} from "../services/foodService.js";
import Swal from "sweetalert2";
import Button from "./common/button";
import { toast } from "react-toastify";
import LoadingMessage from "./common/loading";

class ViewFood extends Component {
  state = {
    foodId: window.location.pathname.slice(6),
    foodData: {},
    buttonsWidth: "auto"
  };

  logState = () => {
    console.dir(this.state);
  };

  promptDelete = () => {
    const { foodData } = this.state;
    Swal.fire({
      title: "מחיקה",
      text: `לחיצה על "מחק" תמחק את האוכל ${foodData.foodTitle} מ${foodData.foodCity}`,
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
          deleteFood(foodData._id);
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

  getfoodData = async () => {
    let { foodData, foodId } = this.state;
    try {
      let response = await searchFoodByFoodId(foodId);
      foodData = response.data[0];
    } catch (err) {
      toast.error(err.message);
      foodData = err.message;
    }
    this.setState({ foodData });
  };

  renderFoodDataTable = () => {
    const { foodData } = this.state;

    return (
      <React.Fragment>
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
              <td className={styles.imgTd}>
                <img
                  src={
                    foodData.foodImage 
                  }
                  alt={foodData.foodTitle}
                  height="150"
                  onClick={() => {Swal.fire({
                    text: foodData.foodTitle,
                    imageUrl: foodData.foodImage
              
                  })}}
                ></img>
              </td>
            </tr>
            <tr>
              <td>עיר</td>
              <td>{foodData.foodCity}</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.formButtons}>
          <Button
            to={{ pathname: "/food/edit", state: { foodId: foodData._id } }}
            text="עריכה"
            color="mustard"
          />
          <span onClick={this.promptDelete} className="button red">
            מחיקה
          </span>
        </div>
      </React.Fragment>
    );
  };

  renderNoFoodFound = () => {
    return (
      <div className={styles.noFood}>
        <h2>מצטערים, לא מצאנו כאן שום אוכל</h2>
        <Button to="/" text="חזרה למסך הבית" color="green" />
      </div>
    );
  };

  
  
  componentDidMount = () => {
    this.getfoodData();
  };

  componentDidUpdate() {
    let {buttonsWidth} = this.state;
    if (!this.buttonsDiv) this.buttonsDiv = document.getElementsByClassName(styles.formButtons).item(0)
    
    if (buttonsWidth === 'auto' && this.buttonsDiv) {
      buttonsWidth = this.buttonsDiv.offsetWidth;
      this.setState({buttonsWidth});
    }
  }

  render() {
    let show;
    if (this.state.foodData?._id) show = this.renderFoodDataTable();
    else if (Object.keys(this.state.foodData).length === 0) show = <LoadingMessage />;
    else show = this.renderNoFoodFound();

    return (
      <div className={styles.viewFood}>
        <h1 className={styles.headerText}>פרטי מזון</h1>
        {show}
        <Button to="/user/me" text="חזרה לפרופיל שלי" color="green" style={{width: this.state.buttonsWidth}}/>
      </div>
    );
  }
}

export default ViewFood;

