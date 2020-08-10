import React, { Component } from "react";
import loadGoogleMapsApi from "load-google-maps-api";
import { googleMapsApiKey } from "../../../config.json";

import styles from "./scss/geolocation-input.module.scss";

class GeolocationInput extends Component {
  state = {};

  // Default map positioning
  pos = { lat: 32.062323, lng: 34.772729 };

  //// GET LOCATION
  getCurrentLocation = (cb) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          cb();
        },
        () => {
          this.props.sendErrToParent(
            "יש לאשר שיתוף מיקום על מנת לקבל את המיקום הנוכחי"
          );
          cb();
        }
      );
    } else {
      // Browser doesn't support Geolocation
      this.props.sendErrToParent("הדפדפן אינו תומך בשירותי מיקום");
      cb();
    }
  };

  //// SHOW MAP
  displayMap = () => {
    // 2. get current location
    //  then
    // 3. create map
    //  then
    // 4. set marker
    if (!this.map) this.getCurrentLocation(this.creatMapElement);
    // 5. reveal map container
    this.revealMapContainer();
  };

  creatMapElement = () => {
    this.mapContainer = document.getElementById("map-container");
    this.map = new this.googleMaps.Map(this.mapContainer, {
      center: this.pos,
      zoom: 14,
      mapTypeControl: false,
      streetViewControl: false,
    });
    this.marker = new this.googleMaps.Marker({
      position: this.pos,
      map: this.map,
    });
    this.map.addListener("click", (e) => this.placeMarker(e.latLng, this.map));
    this.props.sendLocationToParent(this.pos);
  };

  revealMapContainer = () => {
    let container = this.mapContainer
      ? this.mapContainer.style
      : document.getElementById("map-container").style;
    if (container.maxHeight) {
      container.maxHeight = container.marginTop = null;
    } else {
      container.maxHeight = "15rem";
      container.marginTop = "0.5rem";
    }
  };

  placeMarker = (latlng, map) => {
    this.marker.setPosition(latlng);
    this.latlng = latlng.toJSON();
    this.latlng = {
      lat: this.latlng.lat.toFixed(7),
      lng: this.latlng.lng.toFixed(7),
    };
    this.props.sendLocationToParent(this.latlng);
  };

  //// ///////

  componentDidMount() {
    console.log(styles.inputButtons);
    // 1. create googleMaps element
    loadGoogleMapsApi({ key: googleMapsApiKey, region: "IL" })
      .then((googleMaps) => {
        this.googleMaps = googleMaps;
      })
      .catch((err) => this.props.sendErrToParent(err.message));
  }

  render() {
    const { label, error } = this.props;
    return (
      <div className="form-group">
        <p className={styles.label}>{label}</p>
        <div className={styles.input}>
          <div className={styles.inputButtons}>
            <span
              onClick={this.displayMap}
              className={styles.button + " button mustard"}
            >
              בחר מיקום במפה
            </span>
          </div>
          {error && <span className={styles.errorMessage}> {error} </span>}
          <div id="map-container" className={styles.mapContainer}></div>
        </div>
      </div>
    );
  }
}

export default GeolocationInput;
