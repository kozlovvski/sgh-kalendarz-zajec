import firebase from "firebase/app";
import { authManager } from "../components/AuthManager";

const loginUser = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/calendar");

  const result = await firebase.auth().signInWithPopup(provider);

  const credentials = result.credential as firebase.auth.OAuthCredential;

  credentials.accessToken &&
    localStorage.setItem("access_token", credentials.accessToken);
  credentials.idToken && localStorage.setItem("id_token", credentials.idToken);

  result.credential &&
    authManager.setCredentials({
      access_token: credentials.accessToken,
      id_token: credentials.idToken
    });

  return result.user;
};

export default loginUser;
