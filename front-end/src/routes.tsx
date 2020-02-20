import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Index from "./routes/Index";
import PolitykaPrywatnosci from "./routes/PolitykaPrywatnosci";

interface Props {}

const Routes: React.FC<Props> = () => {
  return (
    <Switch>
      <Route exact path="/" component={Index} />
      <Route
        exact
        path="/polityka-prywatnosci"
        component={PolitykaPrywatnosci}
      />
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
