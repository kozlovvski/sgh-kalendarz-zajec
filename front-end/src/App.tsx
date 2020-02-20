import React from "react";

import AppContextProvider from "./components/AppManager";
import UserContextProvider from "./components/AuthManager";
import CurrentView from "./layout/CurrentView";
import Layout from "./layout/Layout";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

const App = () => {
  return <Routes />;
};

const WrappedApp: React.FC = () => (
  <AppContextProvider>
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </AppContextProvider>
);

export default WrappedApp;
