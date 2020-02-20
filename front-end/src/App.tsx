import React from "react";

import AppContextProvider from "./components/AppManager";
import UserContextProvider from "./components/AuthManager";
import CurrentView from "./layout/CurrentView";
import Layout from "./layout/Layout";

const App = () => {
  return <CurrentView />;
};

const WrappedApp: React.FC = () => (
  <AppContextProvider>
    <UserContextProvider>
      <Layout>
        <App />
      </Layout>
    </UserContextProvider>
  </AppContextProvider>
);

export default WrappedApp;
