import { google } from "googleapis";
import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/app";

import { clientId, clientSecret, redirectUri } from "../google.config";
import { AppContext } from "./AppManager";

export const authManager = new google.auth.OAuth2({
  clientId,
  clientSecret,
  redirectUri
});

export type AppUser = firebase.User | null;

export const UserContext = React.createContext<{
  user: AppUser;
  setUser: (data: AppUser) => void;
}>({
  user: null,
  setUser(data: AppUser) {
    console.log("Not loaded yet");
  }
});

export const UserContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<AppUser>(null);
  const { changeData } = useContext(AppContext);

  const setUser = (data: AppUser) => {
    setState(data);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(result => {
      // TODO: check how to update googleapis tokens if they expired.
      // Probably will need to change GoogleAuthProvider to signing in with credentials
      // https://stackoverflow.com/questions/49929134/how-to-get-refresh-token-for-google-api-using-firebase-authentication

      setUser(result);
      changeData({ isLoggingIn: false });
      sessionStorage.setItem("is_logging_in", "false");
    });

    firebase
      .auth()
      .getRedirectResult()
      .then(result => {
        const credentials = result.credential as firebase.auth.OAuthCredential;

        if (credentials) {
          // store id_token for login for session restoring
          credentials.idToken &&
            sessionStorage.setItem("id_token", credentials.idToken);

          credentials &&
            authManager.setCredentials({
              access_token: credentials.accessToken,
              id_token: credentials.idToken
            });

          result.user && setUser(result.user);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const isLoggingIn = sessionStorage.getItem("is_logging_in");
    isLoggingIn && changeData({ isLoggingIn: JSON.parse(isLoggingIn) });
  }, []);

  return (
    <UserContext.Provider value={{ user: state, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
