import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import { authManager } from "../components/AuthManager";

interface Props {}

const Auth: React.FC<Props> = () => {
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
  // const credentials = result.credential as firebase.auth.OAuthCredential;

  // credentials.accessToken &&
  //   sessionStorage.setItem("access_token", credentials.accessToken);
  // credentials.idToken &&
  //   sessionStorage.setItem("id_token", credentials.idToken);

  // credentials &&
  //   authManager.setCredentials({
  //     access_token: credentials.accessToken,
  //     id_token: credentials.idToken
  //   });

  // return result.user;
  return <div>Ładowanie...</div>;
};

export default Auth;
