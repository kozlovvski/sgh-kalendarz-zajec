import queryString from "query-string";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import authManager from "../components/AuthManager";

interface Props {}

const LoggedIn: React.FC<Props> = () => {
  const location = useLocation();
  const history = useHistory();
  // acquire login code from the query param
  const { code } = queryString.parse(location.search);

  authManager
    .getToken(code as string)
    .then(val => {
      // store acquired tokens
      authManager.setCredentials(val.tokens);

      // store tokens and expiry date in localstorage
      val.tokens.access_token &&
        localStorage.setItem("access_token", val.tokens.access_token);
      val.tokens.expiry_date &&
        localStorage.setItem("expiry_date", String(val.tokens.expiry_date));
      val.tokens.refresh_token &&
        localStorage.setItem("refresh_token", val.tokens.refresh_token);

      // redirect to main page
      history.push("/");
    })
    .catch(err => {
      // redirect to main page if there are no tokens - user will not be logged in
      history.push("/");
    });

  return <div>ładowanie</div>;
};

export default LoggedIn;
