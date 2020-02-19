import React from "react";
import Index from "./routes/Index";
import { Switch, Route } from "react-router-dom";
import Auth from "./routes/Auth";

interface Props {}

const Routes: React.FC<Props> = () => {
  return (
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/auth" component={Auth} />
    </Switch>
  );
};

export default Routes;
