import firebase from "firebase/app";
import React, { useContext, useEffect } from "react";
import AppContextProvider from "./components/AppManager";
import UserContextProvider, { UserContext } from "./components/AuthManager";
import Layout from "./layout/Layout";
import setCredentialsFromLocalStorage from "./util/setCredentialsFromLocalStorage";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";

const App = () => {
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
