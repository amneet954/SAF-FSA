import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBo6Puqescm1vfTUoP1JcHW0mRQXyy_dlk",
  authDomain: "saf-93bd7.firebaseapp.com",
  databaseURL: "https://saf-93bd7.firebaseio.com",
  projectId: "saf-93bd7",
  storageBucket: "",
  messagingSenderId: "817746285234",
  appId: "1:817746285234:web:cfd76f958dbc8fb2"
};

// export const app = Firebase.initializeApp(firebaseConfig);
// export const db = app.database();
// export const storage = app.storage();

firebase.initializeApp(config);
export const fb = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
