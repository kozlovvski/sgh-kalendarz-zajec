import firebase from "firebase/app";
import { authManager } from "../components/AuthManager";

const loginUser = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/calendar");

  const result = await firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.NONE)
    .then(() => firebase.auth().signInWithPopup(provider));

  const credentials = result.credential as firebase.auth.OAuthCredential;

  credentials.accessToken &&
    sessionStorage.setItem("access_token", credentials.accessToken);
  credentials.idToken &&
    sessionStorage.setItem("id_token", credentials.idToken);

  credentials &&
    authManager.setCredentials({
      access_token: credentials.accessToken,
      id_token: credentials.idToken
    });

  return result.user;
};

export default loginUser;
