import React, { Component } from "react";
import loadGoogleMapsApi from "load-google-maps-api";
import { googleMapsApiKey } from "../../config.json";

class GoogleMap extends Component {
  state = {};

  markers = {};

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
        },
        {
          timeout: 10000,
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
      mapTypeControl: false,
      streetViewControl: false,
      gestureHandling: "cooperative",
    });
    this.markers.mapCenter = new this.googleMaps.Marker({
      position: this.pos,
      map: this.map,
    });
    if (this.props.shouldListen) {
      this.map.addListener("click", (e) => {
        this.placeMarker(e.latLng, "mapCenter");
      });
    }
    this.props.sendLocationToParent(this.pos);
  };

  placeMarker = (latlng, markerName) => {
    this.markers[markerName].setPosition(latlng);
    this.latlng = latlng.toJSON();
    this.latlng = {
      lat: this.latlng.lat.toFixed(7),
      lng: this.latlng.lng.toFixed(7),
    };
    this.props.sendLocationToParent(this.latlng);
  };

  componentDidUpdate(prevProps) {
    if (this.props.GeoJSON !== prevProps.GeoJSON) this.addDataToMapByFeature();
  }

  addDataToMapByFeature = () => {
    let { features } = this.props.GeoJSON;
    // change coordinates to numbers
    for (let i = 0; i < features.length; i++) {
      features[i].geometry.coordinates[0] = parseFloat(
        features[i].geometry.coordinates[0]
      );
      features[i].geometry.coordinates[1] = parseFloat(
        features[i].geometry.coordinates[1]
      );
    }

    // add features to map's data layer
    let foodLayer = new this.googleMaps.Data({ map: this.map });

    features.forEach((feature) => {
      let latLng = new this.googleMaps.LatLng(
        feature.geometry.coordinates[0],
        feature.geometry.coordinates[1]
      );
      let foodLocation = new this.googleMaps.Data.Point(latLng);
      foodLayer.add({
        geometry: foodLocation,
        properties: features.properties,
      });
      console.log(foodLayer);
    });

    // add info windows on click
    // const infowindow = new this.googleMaps.InfoWindow();
    // const pixelOffset = new this.googleMaps.Size(0, -40);

    this.googleMaps.event.addListener(foodLayer, "click", function (e) {
      console.log(e);
    });

    //   infowindow.setContent(e.feature.getProperty("foodTitle"));
    //   infowindow.setOptions({
    //     pixelOffset: pixelOffset,
    //   });
    //   infowindow.setPosition(e.latLng);
    //   infowindow.open(this.map);
  };

  //   loadGeoJSONToMap = () => {
  //     let { features } = this.props.GeoJSON;
  //     // console.log(this.props.GeoJSON.features[0].geometry.coordinates);
  //     // console.log(this.props.GeoJSON.features);
  //     // console.log(features[0].geometry.coordinates);
  //     for (let i = 0; i < features.length; i++) {
  //       //   console.log(features[i].geometry.coordinates);
  //       features[i].geometry.coordinates[0] = parseFloat(
  //         features[i].geometry.coordinates[0]
  //       );
  //       features[i].geometry.coordinates[1] = parseFloat(
  //         features[i].geometry.coordinates[1]
  //       );
  //     }
  //     let foodLocations = this.map.data.addGeoJson(this.props.GeoJSON, {
  //       idPropertyName: "_id",
  //     });
  //     // this.map.data.toGeoJson((o) => console.log(o));
  //     // console.log(foodStyle);
  //     // console.log(foodLocations);
  //     // this.map.data.setStyle({})
  //     this.addMarkersToMap(foodLocations);
  //   };
  //   addMarkersToMap = (arr) => {
  //     arr.forEach((feature) => {
  //       let geoJson = feature.toGeoJson();
  //       console.log(geoJson);
  //       //   this.markers[feature.getId()] = new this.googleMaps.Marker({
  //       //     position: feature.getGeometry(),
  //       //     map: this.map,
  //       //   });
  //       //   console.log(feature.getId());
  //       //   let geometry = feature.getGeometry();
  //       //   console.log(geometry);
  //       //   let lat = geometry.forEachLatLng((ll) => console.log(ll));
  //       //   console.log(lat);
  //       //   console.log(
  //       //     feature.getGeometry().forEachLatLng((latlng) => latlng.toJSON())
  //       //   );
  //     });
  //     //   .bind(this);
  //   };

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
