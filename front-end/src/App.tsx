import firebase from "firebase/app";
import React, { useContext, useEffect } from "react";
import AppContextProvider from "./components/AppManager";
import UserContextProvider, { UserContext } from "./components/AuthManager";
import Layout from "./layout/Layout";
import setCredentialsFromLocalStorage from "./util/setCredentialsFromLocalStorage";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      // TODO: check how to update googleapis tokens if they expired.
      // Probably will need to change GoogleAuthProvider to signing in with credentials
      // https://stackoverflow.com/questions/49929134/how-to-get-refresh-token-for-google-api-using-firebase-authentication
      setUser(user);
    });

    // setCredentialsFromLocalStorage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Routes />;
};

const WrappedApp: React.FC = () => (
  <UserContextProvider>
    <AppContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContextProvider>
  </UserContextProvider>
);

export default WrappedApp;
