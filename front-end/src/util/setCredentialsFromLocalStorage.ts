import { authManager } from "../components/AuthManager";
import firebase from "firebase/app";

const setCredentialsFromLocalStorage = () => {
  const access_token = localStorage.getItem("access_token");
  const id_token = localStorage.getItem("id_token");

  if (access_token && id_token) {
    authManager.setCredentials({
      access_token,
      id_token
    });
  }
};

export default setCredentialsFromLocalStorage;
