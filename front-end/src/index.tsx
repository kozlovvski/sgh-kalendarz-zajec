import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./scss/index.scss";

import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

import { firebaseConfig } from "./firebase.config";

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const updateViewportHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

window.addEventListener("resize", updateViewportHeight);
window.addEventListener("DOMContentLoaded", updateViewportHeight);

ReactDOM.render(<App />, document.getElementById("root"));
