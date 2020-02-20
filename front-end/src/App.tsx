import React from "react";

import AppContextProvider from "./components/AppManager";
import UserContextProvider from "./components/AuthManager";
import CurrentView from "./layout/CurrentView";
import Layout from "./layout/Layout";

const App = () => {
  return <CurrentView />;
};

const WrappedApp: React.FC = () => (
  <UserContextProvider>
    <AppContextProvider>
      <Layout>
        <App />
      </Layout>
    </AppContextProvider>
  </UserContextProvider>
);

export default WrappedApp;
