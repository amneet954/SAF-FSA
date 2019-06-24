import React, { Component } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import Map from "./components/Map";
import Alert from "./components/CreateAlert";
import Home from "./components/Home";
import { Icon } from "react-native-elements";


class HomeScreen extends Component {
  render() {
    return <Home />;
  }
}

class MapScreen extends Component {
  render() {
    return <Map />;
  }
}

class AlertScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Text>Settings!</Text> */}
        <Alert />
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "Home Page",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={30} color="black" />
      )
    }
  },
  Map: {
    screen: MapScreen,
    navigationOptions: {
      tabBarLabel: "Map",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="gps-fixed" size={30} color="black" />
      )
    }
  },
  Alert: {
    screen: AlertScreen,
    navigationOptions: {
      tabBarLabel: "Create a Post",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="border-color" size={30} color="black" />
      )
    }
  }
});

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 32,
    justifyContent: "center",
    alignItems: "center"
  }
});
