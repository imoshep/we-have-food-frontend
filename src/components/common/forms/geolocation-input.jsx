import React, { Component } from "react";

import GoogleMap from "../google-map";
import styles from "./scss/geolocation-input.module.scss";

class GeolocationInput extends Component {
  state = {
    displayMap: false,
  };

  // Default map positioning
  pos = { lat: 32.062323, lng: 34.772729 };

  //// GET LOCATION

  //// SHOW MAP
  displayMap = () => {
    let { displayMap } = this.state;
    let container = this.mapContainer
      ? this.mapContainer.style
      : document.getElementById("map-container").style;
    if (container.maxHeight) {
      container.maxHeight = container.marginTop = null;
    } else {
      container.maxHeight = "15rem";
      container.marginTop = "0.5rem";
    }
    if (!displayMap) this.setState({ displayMap: true });
  };

  //// ///////

  render() {
    const { displayMap } = this.state;
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
          <div id="map-container" className={styles.mapContainer}>
            {displayMap ? (
              <GoogleMap
                shouldListen={true}
                height="15rem"
                sendErrToParent={this.props.sendErrToParent}
                sendLocationToParent={this.props.sendLocationToParent}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default GeolocationInput;
