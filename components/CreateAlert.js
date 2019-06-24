import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from "react-native";
import { fb, database, auth, storage } from "../config";

export default class Alert extends Component {
  constructor() {
    super();
    this.state = {
      type: "",
      desc: "",
      petName: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    const { type, desc, petName } = this.state;
    try {
      await fb.auth().onAuthStateChanged(user => {
        let username = user.email;
        let text = username.indexOf("@");
        let obj = {
          // email: username,
          lostAnimal: {
            description: desc,
            animalType: type,
            petName: petName
          }
        };

        database.ref(`posts/${username.slice(0, text)}`).set(obj);
        alert(`A search has been made for ${petName}`);
        // database
        //   .ref("User")
        //   .child(username.slice(0, text))
        //   .push(obj);
        this.setState({
          type: "",
          desc: "",
          petName: ""
        });
      });
    } catch (err) {
      alert(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Text style={styles.formText}>Animal Type:</Text>
          <TextInput
            placeholder="Animal Type"
            style={styles.input}
            value={this.state.type}
            onChangeText={text => this.setState({ type: text })}
          />
          <Text />
          <Text style={styles.formText}>Pet Name:</Text>
          <TextInput
            placeholder="Animal Name"
            style={styles.input}
            value={this.state.petName}
            onChangeText={text => this.setState({ petName: text })}
          />
          <Text />
          <Text style={styles.formText}>Description:</Text>
          <TextInput
            placeholder="Description"
            style={styles.input}
            value={this.state.desc}
            onChangeText={text => this.setState({ desc: text })}
          />

          <Text />
          <TouchableOpacity
            style={styles.buttonBlue}
            onPress={() => this.handleSubmit()}
          >
            <Text style={{ color: "black", fontSize: 28 }}>Submit</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 26
  },
  formText: {
    fontSize: 20
  },
  buttonBlue: {
    backgroundColor: "yellow",
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
  input: {
    height: 40,
    width: 300,
    padding: 4,
    margin: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10
  }
});
