import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import UserContextProvider from "./components/AuthManager";

const App = () => {
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
