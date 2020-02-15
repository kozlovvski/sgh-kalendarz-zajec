import firebase from "firebase/app";
import { authManager } from "../components/AuthManager";

const logoutUser = async () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("id_token");

  authManager.setCredentials({});

  return firebase.auth().signOut();
};

export default logoutUser;
