import React, { useEffect, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import firebase from "firebase/app";
import UserContextProvider, { UserContext } from "./components/AuthManager";
import setCredentialsFromLocalStorage from "./util/setCredentialsFromLocalStorage";

const App = () => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      // TODO: check how to update googleapis tokens if they expired.
      // Probably will need to change GoogleAuthProvider to signing in with credentials
      // https://stackoverflow.com/questions/49929134/how-to-get-refresh-token-for-google-api-using-firebase-authentication
      setUser(user);
    });

    setCredentialsFromLocalStorage();
  }, []);

  return <Routes />;
};

const WrappedApp: React.FC = () => (
  <UserContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserContextProvider>
);

export default WrappedApp;
