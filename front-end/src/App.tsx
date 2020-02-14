import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import handleLoginFromLocalStorage from "./util/handleLoginFromLocalStorage";

const App = () => {
  useEffect(handleLoginFromLocalStorage, []);

  return <Routes />;
};

const WrappedApp: React.FC = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default WrappedApp;
