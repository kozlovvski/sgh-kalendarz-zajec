import React from "react";
import { Switch, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoggedIn from "./pages/LoggedIn";

interface Props {}

const Routes: React.FC<Props> = () => {
  return (
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/loggedIn" component={LoggedIn} />
    </Switch>
  );
};

export default Routes;
