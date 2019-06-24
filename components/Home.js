import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { fb, database, auth, storage } from "../config";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
    this.logIn = this.logIn.bind(this);
    this.logOut = this.signOut.bind(this);
    this.register = this.register.bind(this);

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          loggedIn: true
        });
      } else {
        this.setState({
          loggedIn: false
        });
      }
    });
  }

  logIn = async (email, pass) => {
    if (email !== "" && pass !== "") {
      try {
        let user = await auth.signInWithEmailAndPassword(email, pass);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Email or Password is incorrect/missing");
    }
  };

  register = async (email, pass) => {
    if (email !== "" && pass !== "") {
      try {
        const user = await auth.createUserWithEmailAndPassword(email, pass);

        let username = user.user.email;
        let obj = {};
        let text = username.indexOf("@");
        obj[username.slice(0, text)] = {
          // email: username
        };
        await database.ref("posts").update(obj);
        alert(`Welcome, ${username.slice(0, text)}!`);
      } catch (err) {
        console.log("Whooop!---------", err);
      }
    } else {
      alert("This failed ");
    }
  };

  signOut = async () => {
    try {
      await auth.signOut();
      alert("Successfully Signed Out");
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {/* <Text style={styles.header}>Save A Friend</Text> */}
          {this.state.loggedIn === true ? (
            <View>
              <Text style={{ fontSize: 24 }}>Welcome to Save A Friend!</Text>
              <Text />
              <Text />
              <TouchableOpacity
                style={styles.buttonRed}
                onPress={() => this.signOut()}
              >
                <Text style={{ color: "white", fontSize: 28 }}>Log Out</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              {this.state.emailloginView == true ? (
                <View>
                  <Text style={{ fontSize: 24 }}>Email:</Text>
                  <TextInput
                    onChangeText={text => this.setState({ email: text })}
                    style={styles.input}
                    value={this.state.email}
                  />
                  <Text />
                  <Text style={{ fontSize: 24 }}>Password:</Text>
                  <TextInput
                    onChangeText={text => this.setState({ pass: text })}
                    secureTextEntry={true}
                    style={styles.input}
                    value={this.state.pass}
                  />
                  <Text />
                  <Text />

                  <TouchableOpacity
                    style={styles.buttonBlue}
                    onPress={() =>
                      this.logIn(this.state.email, this.state.pass)
                    }
                  >
                    <Text style={{ color: "white", fontSize: 36 }}>
                      Login In
                    </Text>
                  </TouchableOpacity>

                  <Text />
                  <Text />

                  <TouchableOpacity
                    style={styles.buttonGreen}
                    onPress={() =>
                      this.register(this.state.email, this.state.pass)
                    }
                  >
                    <Text style={{ color: "white", fontSize: 36 }}>
                      Create Account
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <TouchableOpacity
                    style={styles.buttonGreen}
                    onPress={() => this.setState({ emailloginView: true })}
                  >
                    <Text style={{ color: "white", fontSize: 28 }}>Log In</Text>
                  </TouchableOpacity>
                  <Text />
                  <Text />
                  <TouchableOpacity
                    style={styles.buttonBlue}
                    onPress={() => this.setState({ emailloginView: true })}
                  >
                    <Text style={{ color: "white", fontSize: 28 }}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <View />
            </View>
          )}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25
  },
  input: {
    height: 40,
    width: 300,
    padding: 4,
    margin: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10
  },
  buttonGreen: {
    backgroundColor: "limegreen",
    shadowOffset: {
      height: 1,
      width: 1
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5
  },
  buttonBlue: {
    backgroundColor: "dodgerblue",
    shadowOffset: {
      height: 1,
      width: 1
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5
  },
  buttonRed: {
    backgroundColor: "crimson",
    shadowOffset: {
      height: 1,
      width: 1
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5
  }
});
