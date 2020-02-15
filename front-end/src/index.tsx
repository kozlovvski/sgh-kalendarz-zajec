import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

import { firebaseConfig } from "./firebase.config";

firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(<App />, document.getElementById("root"));
