import React, { useEffect, useContext } from "react";
import firebase from "firebase/app";
import UserContextProvider, { UserContext } from "./components/AuthManager";
import setCredentialsFromLocalStorage from "./util/setCredentialsFromLocalStorage";
import Index from "./views/Index";
import Layout from "./layout/Layout";
import ViewContextProvider from "./components/ViewManager";
import CurrentView from "./layout/CurrentView";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <CurrentView />;
};

const WrappedApp: React.FC = () => (
  <UserContextProvider>
    <ViewContextProvider>
      <Layout>
        <App />
      </Layout>
    </ViewContextProvider>
  </UserContextProvider>
);

export default WrappedApp;
