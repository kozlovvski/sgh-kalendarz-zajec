import React, { useState } from "react";
import {
  useRouteMatch,
  useParams,
  useLocation,
  useHistory
} from "react-router-dom";
import queryString from "query-string";
import authManager from "../components/AuthManager";

interface Props {}

const LoggedIn: React.FC<Props> = () => {
  const location = useLocation();
  const history = useHistory();
  const { code } = queryString.parse(location.search);

  authManager
    .getToken(code as string)
    .then(val => {
      authManager.setCredentials(val.tokens);
      history.push("/");
    })
    .catch(err => {
      history.push("/");
    });

  return <div>ładowanie</div>;
};

export default LoggedIn;
