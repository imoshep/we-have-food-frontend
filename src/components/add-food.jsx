import React from "react";
import Form from "./common/form";
import Button from "./common/button";
import "../services/color-palette.scss";
import styles from "./scss/add-food.module.scss";

class AddFood extends Form {
  state = {};

  doSubmit() {
    alert("submit");
  }

  render() {
    return (
      <div className="container">
        <h3>איזה אוכל יש לך?</h3>
        {/* <form
          id="add-food-form"
          onSubmit={this.handleSubmit}
          action=""
          method="POST"
          autoComplete="off"
        >
          {this.renderInput("foodName", "איזה אוכל?", "text")}
          <label htmlFor="foodDesc">עוד על האוכל</label>
          <textarea name="foodDesc" form="add-food-form" rows="5" />
          {this.renderInput("businessAddress", "Business address", "text")}
          {this.renderInput("businessPhone", "Business phone")}
          {this.renderInput("businessImage", "Business image")}

          {this.renderSubmitButton("Create Card")}
          <Link to="/my-cards" className="btn btn-outline-secondary ml-2">
            Cancel
          </Link>
        </form> */}
        <div>
          <Button to="/" text="Home" color="green" />
        </div>
      </div>
    );
  }
}

export default AddFood;
