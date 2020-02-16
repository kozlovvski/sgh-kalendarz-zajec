import React from "react";
import { Switch, Route } from "react-router-dom";
import Index from "./pages/Index";

interface Props {}

const Routes: React.FC<Props> = () => {
  return (
    <Switch>
      <Route exact path="/" component={Index} />
    </Switch>
  );
};

export default Routes;
