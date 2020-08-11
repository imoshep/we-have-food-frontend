import React, { Component } from "react";
import GoogleMap from "./common/google-map";

import styles from "./scss/view-food.module.scss";
import foodService from "../services/foodService";

class ViewFood extends Component {
  state = { mapData: {} };

  registerMapError = (errorFromMapComponent) => {};

  registerCenterFromMap = (latlng) => {
    let { mapData } = this.state;
    mapData.mapCenter = latlng;
    this.setState({ mapData });
  };

  showFood = async () => {
    let { mapData } = this.state;
    const { data: allFoodData } = await foodService.getFood();
    mapData.GeoJSON = this.convertArrToGeoJSON(allFoodData);
    this.setState({ mapData });
  };

  convertArrToGeoJSON = (arr) => {
    arr.forEach((obj) => {
      obj.foodLocation = JSON.parse(obj.foodLocation);

      obj.type = "Feature";
      obj.geometry = {
        type: "Point",
        coordinates: [obj.foodLocation.lat, obj.foodLocation.lng],
      };
      obj.properties = {
        foodTitle: obj.foodTitle,
        foodDesc: obj.foodDesc,
        foodImage: obj.foodImage,
        createdAt: obj.createdAt,
        _id: obj._id,
      };
      delete obj.foodTitle;
      delete obj.foodDesc;
      delete obj.foodImage;
      delete obj.foodLocation;
      delete obj.createdAt;
      delete obj._id;
      delete obj.__v;
    });
    let GeoJSON = {
      type: "FeatureCollection",
      features: arr,
    };
    return JSON.stringify(GeoJSON);
  };

  componentDidMount = () => {
    this.showFood();
  };

  render() {
    const { mapData } = this.state;
    return (
      <div className={styles.viewFood}>
        <header className={styles.pageHeader}>
          {/* <p onClick={() => console.log(this.state)}>log State</p> */}
          <h1 className={styles.headerText}>
            מצאו אוכל בסביבה <span onClick={this.showFood}>Show Food</span>
          </h1>
        </header>
        <div className={styles.map}>
          <GoogleMap
            height="80vh"
            GeoJSON={mapData.GeoJSON}
            sendErrToParent={this.registerMapError}
            sendLocationToParent={this.registerCenterFromMap}
          />
        </div>
      </div>
    );
  }
}

export default ViewFood;
