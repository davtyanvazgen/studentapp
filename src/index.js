import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAcqdibLhifDN7rk970_zbpQK-QVTFyadc",
  authDomain: "studentsapp-e7074.firebaseapp.com",
  databaseURL: "https://studentsapp-e7074.firebaseio.com",
  projectId: "studentsapp-e7074",
  storageBucket: "studentsapp-e7074.appspot.com",
  messagingSenderId: "760714515730"
};

firebase.initializeApp(config);
ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
