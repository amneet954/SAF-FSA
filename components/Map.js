import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView from "react-native-maps";

const { width, height } = Dimensions.get("window");
let SCREEN_HEIGHT = height;
let SCREEN_WIDTH = width;
let ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
let LATTITUDE_DELTA = 0.0922;
let LONGTITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO;

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      }
    };
  }
  // watchID: ?number = null;

  componentDidMount() {
    const geoPass = position => {
      let lat = parseFloat(position.coords.latitude);
      let long = parseFloat(position.coords.longitude);
      let initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA
      };
      this.setState({
        initialPosition: initialRegion,
        markerPosition: initialRegion
      });
    };

    const geoFail = error => {
      // alert(JSON.stringify(error));
      alert("Please turn on Location Services :)");
    };

    navigator.geolocation.getCurrentPosition(geoPass, geoFail, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 60 * 60 * 24
    });

    this.watchID = navigator.geolocation.watchPosition(position => {
      let lat = parseFloat(position.coords.latitude);
      let long = parseFloat(position.coords.longitude);

      let lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA
      };
      this.setState({
        initialPosition: lastRegion,
        markerPosition: lastRegion
      });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider="google"
          style={styles.map}
          region={this.state.initialPosition}
        >
          <MapView.Marker coordinate={this.state.markerPosition}>
            <View style={styles.radius}>
              <View style={styles.marker} />
            </View>
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  text: {
    fontSize: 48
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: "hidden",
    backgroundColor: "rgba(0,112,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(0,112,255,0.3)",
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    height: 10,
    width: 10,
    borderWidth: 3,
    borderRadius: 20 / 2,
    overflow: "hidden",
    borderColor: "rgba(0,112,255,0.3)",
    backgroundColor: "dodgerblue"
  }
});
