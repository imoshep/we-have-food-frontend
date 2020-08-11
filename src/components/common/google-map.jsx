import React, { Component } from "react";
import loadGoogleMapsApi from "load-google-maps-api";
import { googleMapsApiKey } from "../../config.json";

class GoogleMap extends Component {
  state = {};

  displayMap = () => {
    if (!this.map) this.getCurrentLocation(this.creatMapElement);
  };

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

  creatMapElement = () => {
    this.mapContainer = document.getElementById("map-root");
    this.map = new this.googleMaps.Map(this.mapContainer, {
      center: this.pos,
      zoom: 14,
      minZoom: 10,
      //   scaleControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      gestureHandling: "cooperative",
    });
    this.marker = new this.googleMaps.Marker({
      position: this.pos,
      map: this.map,
    });
    this.map.addListener("click", (e) => this.placeMarker(e.latLng));
    this.props.sendLocationToParent(this.pos);
  };

  placeMarker = (latlng) => {
    this.marker.setPosition(latlng);
    this.latlng = latlng.toJSON();
    this.latlng = {
      lat: this.latlng.lat.toFixed(7),
      lng: this.latlng.lng.toFixed(7),
    };
    this.props.sendLocationToParent(this.latlng);
  };

  componentDidUpdate(prevProps) {
    if (this.props.GeoJSON !== prevProps.GeoJSON)
      /*this.loadGeoJSONToMap()*/ console.log(this.props.GeoJSON);
    // ;
  }

  loadGeoJSONToMap = () => {
    this.map.data.loadGeoJson(this.props.GeoJSON);
  };

  componentDidMount() {
    // 1. create googleMaps element
    loadGoogleMapsApi({ key: googleMapsApiKey, region: "IL" })
      .then((googleMaps) => {
        this.googleMaps = googleMaps;
        this.displayMap();
      })
      .catch((err) => this.props.sendErrToParent(err.message));
  }

  render() {
    return (
      <React.Fragment>
        <div id="map-root" style={{ height: this.props.height }}></div>
        <div onClick={() => console.log(this.props)}>log props</div>
      </React.Fragment>
    );
  }
}

export default GoogleMap;
