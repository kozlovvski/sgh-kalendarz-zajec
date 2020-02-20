import firebase from "firebase/app";
import { authManager } from "../components/AuthManager";

const loginUser = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/calendar");

  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      sessionStorage.setItem("is_logging_in", "true");
      return firebase.auth().signInWithRedirect(provider);
    });
};

export default loginUser;
